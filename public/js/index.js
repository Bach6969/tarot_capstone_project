"use strict";

async function drawCard(cardNumber) {
    try {
        let response = await fetch('https://tarotapi.dev/api/v1/cards/random');
        let data = await response.json();
        let card = data.cards[0];

        document.getElementById(`title${cardNumber}`).innerText = card.name;
        document.getElementById(`desc${cardNumber}`).innerText = card.desc;
        document.getElementById(`info-icon${cardNumber}`).setAttribute('data-tooltip', card.meaning_up);
    } catch (error) {
        console.error("Error fetching tarot card;", error);
    }
}

function shuffleCard(cardNumber) {
    document.getElementById(`title${cardNumber}`).innerText = "card title";
    document.getElementById(`desc${cardNumber}`).innerText = "description";
}