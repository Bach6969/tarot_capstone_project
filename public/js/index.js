"use strict";

const cardPile = document.getElementById('cardPile');

async function drawCard(cardNumber) {
    let desc = document.getElementById(`desc${cardNumber}`);
    desc.innerText = "Shuffling...";
    
    try {
        let response = await fetch('https://tarotapi.dev/api/v1/cards/random');
        let data = await response.json();
        let card = data.cards[0];

        document.getElementById(`title${cardNumber}`).innerText = card.name;
        document.getElementById(`desc${cardNumber}`).innerText = card.desc;
        document.getElementById(`info-icon${cardNumber}`).setAttribute('data-tooltip', card.meaning_up);
    } catch (error) {
        console.error("Error fetching tarot card;", error);
        desc.innerText = "Error fetching card. Please try again";
    }
}

function shuffleCard(cardNumber) {
    shuffleCards();
    document.getElementById(`title${cardNumber}`).innerText = "card title";
    document.getElementById(`desc${cardNumber}`).innerText = "description";
    document.getElementById(`info-icon${cardNumber}`).removeAttribute('data-tooltip');
}

async function exportCardInfo() {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: 'a4'
    });

    let yPosition = 30;
    pdf.setFont("times", "bold");
    pdf.setFontSize(18);
    pdf.text("Three Card Tarot Spread", 30, yPosition);
    yPosition += 30;

    // Export cards info
    for (let i = 1; i <= 3; i++) {
        const title = document.getElementById(`title${i}`).innerText;
        const desc = document.getElementById(`desc${i}`).innerText;
        const tooltip = document.getElementById(`info-icon${i}`).getAttribute('data-tooltip') || "None";

        pdf.setFont("times", "bold");
        pdf.setFontSize(16);
        pdf.text(`Card ${i}: ${title}`, 30, yPosition);
        yPosition += 20;

        pdf.setFont("times", "normal");
        pdf.setFontSize(12);
        pdf.text(`Description: ${desc}`, 30, yPosition, { maxWidth: 500 });
        yPosition += 60;

        pdf.text(`Tooltip Meaning: ${tooltip}`, 30, yPosition, { maxWidth: 500 });
        yPosition += 40;
    }

    // Export info-area text
    const infoAreaText = document.querySelector('.info-area').innerText;
    pdf.setFont("times", "bold");
    pdf.setFontSize(16);
    pdf.text("About the Spread", 30, yPosition);
    yPosition += 20;

    pdf.setFont("times", "normal");
    pdf.setFontSize(12);
    const lines = pdf.splitTextToSize(infoAreaText, 500);
    pdf.text(lines, 30, yPosition);
    yPosition += lines.length * 15;

    // Export footer links
    pdf.addPage();
    pdf.setFont("times", "bold");
    pdf.setFontSize(16);
    pdf.text("Navigation Links", 30, 30);

    document.querySelectorAll('.footer-section div a').forEach((link, idx) => {
        const text = `${idx + 1}. ${link.innerText}: ${link.getAttribute('href')}`;
        pdf.setFont("times", "normal");
        pdf.setFontSize(12);
        pdf.text(text, 30, 60 + idx * 20);
    });

    pdf.save('Tarot_Spread_Full.pdf');
}

function shuffleCard(cardNumber) {
    const card = document.getElementById(`card${cardNumber}`);

    // Run shuffle animation only on this specific card
    const randomX = Math.random() * 40 - 20; // move -20px to 20px
    const randomY = Math.random() * 40 - 20;
    const randomRotate = Math.random() * 20 - 10;
    card.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`;

    // Reset to stack after a short delay
    setTimeout(() => {
        card.style.transform = 'translate(0, 0) rotate(0)';
    }, 500);

    // Reset card info
    document.getElementById(`title${cardNumber}`).innerText = "card title";
    document.getElementById(`desc${cardNumber}`).innerText = "description";
    document.getElementById(`info-icon${cardNumber}`).removeAttribute('data-tooltip');
}


