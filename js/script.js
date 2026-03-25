const input = document.getElementById('command-input');
const output = document.getElementById('output');
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

// --- 1. MATRIX EFFECT ---
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

// --- 2. COMMANDS ---
const commands = {
    "help": "Available commands: bio, projects, skills, contact, clear, resume",
    "bio": "Momin | Student at GIKI | Cybersecurity Focus. Specialized in Penetration Testing and Network Security.",
    "skills": "Python, C++, Nmap, Metasploit, Wireshark, Flipper Zero, Azure Pentest Labs.",
    "projects": "1. MMMSN Mess Management\n2. Azure Pentest Lab (24/7 VM)\n3. RF/HID Research.",
    "contact": "Email: momin@momin.me | GitHub: github.com/weebernom",
    "resume": "Secure link: [Access Granted]"
};

// --- 3. TYPEWRITER FUNCTION ---
async function typeWriter(text) {
    const p = document.createElement('p');
    output.appendChild(p);
    for (let i = 0; i < text.length; i++) {
        p.textContent += text[i];
        await new Promise(r => setTimeout(r, 20));
        output.scrollTop = output.scrollHeight;
    }
}

// --- 4. EVENT LISTENERS ---
input.addEventListener('keydown', async (e) => {
    if (e.key === 'Enter') {
        const cmd = input.value.toLowerCase().trim();
        input.value = '';

        const userLine = document.createElement('p');
        userLine.innerHTML = `<span class="prompt">u2025581@giki:~$</span> ${cmd}`;
        output.appendChild(userLine);

        if (cmd === 'clear') {
            output.innerHTML = '';
        } else if (commands[cmd]) {
            await typeWriter(commands[cmd]);
        } else if (cmd !== "") {
            await typeWriter(`'${cmd}' is not recognized. Type 'help' for assistance.`);
        }
        output.scrollTop = output.scrollHeight;
    }
});

// Initial Load
document.addEventListener('DOMContentLoaded', () => {
    typeWriter("Welcome to Momin's Cyber Portfolio. Connection Secure. Type 'help' to begin.");
    input.focus();
});

// Keep input focused
document.body.addEventListener('click', () => input.focus());