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

function exportCardInfo(){
    let cardData = "Tarot Spread\n\n";
    for (let i = 1; i <= 3; i++){
        let title = document.getElementById(`title${i}`).innerText;
        let desc = document.getElementById(`desc${i}`).innerText;
        let meaning = document.getElementById(`info-icon${i}`).getAttribute('data-tooltip') || "No meaning available";

        cardData += `Card ${i}: ${title}\nDescription: ${desc}\nMeaning: ${meaning}\n\n`;
    }

    let blob = new Blob([cardData], { type: 'text/plain' });
    let a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'tarot_spread.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

window.onload = function() {
    let exportButton = document.getElementById('export-btn');
    exportButton.innerText = "Export Spread";
    exportButton.onclick = exportCardInfo;
    exportButton.style.marginTop = "100px";
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


