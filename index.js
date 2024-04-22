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
const searchBarInput = document.querySelector(".search-bar__input");

let page = 1;
let maxPage = 1;
let searchQuery = ""; // State variable for search query

async function fetchCharacters() {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/?page=${page}&name=${searchQuery}`
    );
    const data = await response.json();
    const characters = data.results;

    cardContainer.innerHTML = "";

    characters.forEach((character) => {
      const card = CharacterCard(character);
      cardContainer.appendChild(card);
    });

    maxPage = data.info.pages;

    updatePagination();
  } catch (error) {
    console.error("Error fetching characters:", error);
  }
}

function updatePagination() {
  pagination.textContent = `${page} / ${maxPage}`;
}

fetchCharacters();

prevButton.addEventListener("click", () => {
  if (page > 1) {
    page--;
    fetchCharacters();
  }
});

nextButton.addEventListener("click", () => {
  if (page < maxPage) {
    page++;
    fetchCharacters();
  }
});

searchBar.addEventListener("submit", (event) => {
  event.preventDefault();
  searchQuery = searchBarInput.value; // Update searchQuery with current text in search bar
  page = 1; // Reset page to 1 when performing a new search
  fetchCharacters(); // Fetch characters with updated search query
});
