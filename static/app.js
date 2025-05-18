// Language Greetings
const greetings = {
    english: "Hello! I'm MediQuanta. Ask me about health conditions in Nigeria.",
    pidgin: "How far! Na MediQuanta dey here. Abeg ask me about health wahala for Naija.",
    hausa: "Sannu! Ni ce MediQuanta. Tambaye ni game da cututtukan lafiya a Najeriya.",
    yoruba: "Bawo! Emi ni MediQuanta. Beere lọwọ mi nipa awọn arun ni Naijiria.",
    igbo: "Ndewo! Aha m bụ MediQuanta. Jụọ m ajụjụ gbasara ọrịa dị na Naịjịrịa."
};

// Language switching logic
let currentLang = "english";
function selectLanguage(lang) {
    currentLang = lang;
    // Remove active from all
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    // Add active to selected
    const btns = document.querySelectorAll('.lang-btn');
    btns.forEach(btn => {
        if(btn.textContent.trim().toLowerCase() === lang) btn.classList.add('active');
    });
    // Show greeting only for selected language
    document.getElementById('greeting').textContent = greetings[lang];
    // Clear chat box when language changes
    document.getElementById('chat-box').innerHTML = '';
}

// Category logic (placeholder)
function selectCategory(cat) {
    document.querySelectorAll('.cat-btn').forEach(btn => btn.classList.remove('active'));
    const btns = document.querySelectorAll('.cat-btn');
    btns.forEach(btn => {
        if(btn.textContent.replace(/\s/g,'').toLowerCase().includes(cat)) btn.classList.add('active');
    });
}

// Health conditions list (sample, to expand to 200+)
const conditions = [
    {
        name: "Malaria",
        meaning: "A mosquito-borne infectious disease caused by Plasmodium parasites.",
        symptoms: "Fever, chills, headache, nausea, muscle pain.",
        prevention: "Use mosquito nets, insect repellents, and eliminate standing water.",
        treatment: "Antimalarial drugs as prescribed by a healthcare provider.",
        advice: "Seek medical help if you have symptoms after mosquito exposure.",
        complications: "Severe anemia, cerebral malaria, organ failure. Immediate treatment needed.",
        extra: "Pregnant women and children are at higher risk."
    },
    {
        name: "Typhoid Fever",
        meaning: "A bacterial infection due to Salmonella typhi, often spread through contaminated food and water.",
        symptoms: "High fever, weakness, stomach pain, headache, loss of appetite.",
        prevention: "Drink safe water, practice good hygiene, get vaccinated.",
        treatment: "Antibiotics, hydration, and rest.",
        advice: "See a doctor immediately for medication.",
        complications: "Intestinal perforation, sepsis.",
        extra: "Maintain good sanitation to avoid spread."
    }
    // ... Add 200+ items in this structure
];

function renderConditions() {
    const list = document.getElementById('conditions-list');
    list.innerHTML = '';
    // Initial demo: show first 3, but use pagination/scroll for real 200+
    conditions.slice(0, 3).forEach(cond => {
        const card = document.createElement('div');
        card.className = 'condition-card';
        card.innerHTML = `
            <div class="condition-title">${cond.name}</div>
            <div>${cond.meaning}</div>
        `;
        card.onclick = () => showConditionDetails(cond);
        list.appendChild(card);
    });
}

function showConditionDetails(cond) {
    // Show all details in a popup or expand card (implement as needed)
    alert(
        `${cond.name}\n\nMeaning: ${cond.meaning}\n\nSymptoms: ${cond.symptoms}\n\nPrevention: ${cond.prevention}\n\nTreatment: ${cond.treatment}\n\nAdvice: ${cond.advice}\n\nComplications: ${cond.complications}\n\nOther Info: ${cond.extra}`
    );
}

// Chat Message Handling (AI placeholder)
async function sendMessage(event) {
    event.preventDefault();
    const input = document.getElementById('user-input');
    const msg = input.value.trim();
    if(!msg) return;
    appendMessage("You", msg, "right");
    input.value = "";
    // Placeholder: Simulate AI reply in selected language
    setTimeout(() => {
        // Simulated response, replace with AI backend integration
        let reply = aiHealthResponse(msg, currentLang);
        appendMessage("MediQuanta", reply, "left");
    }, 700);
}

function appendMessage(sender, text, side) {
    const chatBox = document.getElementById('chat-box');
    const div = document.createElement('div');
    div.style.marginBottom = "8px";
    div.style.textAlign = side === "right" ? "right" : "left";
    div.innerHTML = `<b>${sender}:</b> ${text}`;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Simulated AI health responses in selected language
function aiHealthResponse(msg, lang) {
    const responses = {
        english: "Thank you for your question. Here is some health advice...",
        pidgin: "Thanks as you ask. See beta health gist for you...",
        hausa: "Nagode da tambayarka. Ga bayanin lafiya...",
        yoruba: "O ṣeun fun ibeere rẹ. Eyi ni alaye to wulo...",
        igbo: "Daalụ maka ajụjụ gị. Nke a bụ ndụmọdụ gbasara ahụike..."
    };
    return responses[lang] + " (Demo: Integrate with real AI for full answers!)";
}

// Initial load
window.onload = function() {
    selectLanguage('english');
    renderConditions();
};
