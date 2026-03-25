const input = document.getElementById('command-input');
const output = document.getElementById('output');

const commands = {
    "help": "Available commands: bio, projects, skills, clear, contact, resume",
    "resume": "Link",
    "bio": "I'm Momin, a Cybersecurity student at GIKI. I specialize in Cybersecurity Tools and Pentesting.",
    "skills": "Languages: Python, C++. Tools: nmap, wireshark, metasploit",
    "projects": "1. Giki Mess App",
    "contact": "Email: momin@momibat.me | GitHub: github.com/weebernom",
    "clear": ""
};

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const cmd = input.value.toLowerCase().trim();
        
        if (cmd === 'clear') {
            output.innerHTML = '';
        } else if (commands[cmd]) {
            output.innerHTML += `<p><span class="prompt">momin@giki:~$</span> ${cmd}</p>`;
            output.innerHTML += `<p>${commands[cmd]}</p>`;
        } else {
            output.innerHTML += `<p>'${cmd}' is not recognized. Type 'help'.</p>`;
        }

        input.value = '';
        output.scrollTop = output.scrollHeight;
    }
});