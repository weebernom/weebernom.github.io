const input = document.getElementById('command-input');
const output = document.getElementById('output');
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

// --- 1. MATRIX RAIN ---
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const chars = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#0F0";
    ctx.font = fontSize + "px monospace";
    for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
    }
}
setInterval(drawMatrix, 35);

// --- 2. COMMAND LOGIC ---
const commands = {
    "help": "Available commands: bio, projects, skills, clear, contact, resume",
    "resume": "Redirecting to secure document vault...",
    "bio": "Momin | 2025581 | GIKI. Specializing in Cybersecurity and Penetration Testing. Current focus: Network Defense & Red Teaming.",
    "skills": "• Languages: Python, C++\n• Tools: Nmap, Wireshark, Metasploit, Flipper Zero\n• Infrastructure: Azure Pentest Labs",
    "projects": "1. MMMSN Mess App (GIKI Specific)\n2. 24/7 Azure Pentesting Lab\n3. RF/HID Hardware Research",
    "contact": "Email: momin@momin.me | GitHub: github.com/weebernom",
};

async function typeWriter(text, element) {
    const lines = text.split('\n');
    for (let line of lines) {
        const p = document.createElement('p');
        p.className = "response";
        element.appendChild(p);
        for (let char of line) {
            p.textContent += char;
            await new Promise(r => setTimeout(r, 20));
        }
    }
    output.scrollTop = output.scrollHeight;
}

// Initial Greeting
window.onload = () => {
    typeWriter("Welcome to Momin's Cyber Portfolio. Connection Secure. Type 'help' to begin.", output);
};

input.addEventListener('keydown', async (e) => {
    if (e.key === 'Enter') {
        const cmd = input.value.toLowerCase().trim();
        const userLine = document.createElement('p');
        userLine.innerHTML = `<span class="prompt">u2025581@giki:~$</span> ${cmd}`;
        output.appendChild(userLine);

        if (cmd === 'clear') {
            output.innerHTML = '';
        } else if (commands[cmd]) {
            await typeWriter(commands[cmd], output);
        } else {
            await typeWriter(`'${cmd}' is not recognized as an internal or external command. Type 'help' for options.`, output);
        }

        input.value = '';
        output.scrollTop = output.scrollHeight;
    }
});