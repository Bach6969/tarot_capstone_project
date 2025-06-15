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

    const tarotContainer = document.querySelector('.tarot-container');

    await html2canvas(tarotContainer, {
        scale: 2,
        backgroundColor: 'black',
    }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        const imgProps = pdf.getImageProperties(imgData);
        const imgWidth = pageWidth * 0.95;
        const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

        const x = (pageWidth - imgWidth) / 2;
        const y = 20;

        pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
        pdf.save('Tarot_Spread.pdf');
    });
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


