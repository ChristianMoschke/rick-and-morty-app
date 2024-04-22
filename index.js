//imports
import CharacterCard from "./components/CharacterCard/CharacterCard.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
const maxPage = 1;
const page = 1;
const searchQuery = "";

// Fetch characters from the API
async function fetchCharacters() {
  try {
    // Fetch the first 20 characters from the API
    const response = await fetch("https://rickandmortyapi.com/api/character/");
    const data = await response.json();
    const characters = data.results;

    // Clear previous cards
    cardContainer.innerHTML = "";

    // Create and append a card for each character
    characters.forEach((character) => {
      const card = CharacterCard(character);
      cardContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Error fetching characters:", error);
  }
}

// Call fetchCharacters function to display the cards
fetchCharacters();
