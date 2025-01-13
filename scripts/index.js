
const API_ENDPOINT = "https://pokeapi.co/api/v2/"

const getData = async (pokemonName) => {
    let pokeImg = document.querySelector(".pokemon-img");
    let pokeName = document.querySelector(".pokemon-name");
    let pokeDesc = document.querySelector(".pokemon-desc")

    try {
        let response = await fetch(`${API_ENDPOINT}pokemon/${pokemonName}`);
        if (!response.ok) {
            pokeDesc.textContent = "Pokémon not found. Please check your spelling.";
            throw new Error("Pokémon not found");
        }
        let data = await response.json();
        pokeImg.src = data.sprites.front_default;
        pokeName.textContent = data.name;
        
        let descResponse = await fetch(`${API_ENDPOINT}pokemon-species/${pokemonName}`);
        if (!descResponse.ok) {
            throw new Error("Pokémon species data not found");
        }
        let descData = await descResponse.json();
        englishEntry = descData.flavor_text_entries.find(
            (entry) => entry.language.name === "en"
        );

        pokeDesc.textContent = englishEntry ? englishEntry.flavor_text : "Description not available";


    } catch (error) {
        console.error("Error fetching Pokémon data:", error);
        pokeImg.src = "";
    }
};

const button = document.getElementById("submit-button");
button.addEventListener("click", () => {
    const input = document.getElementById("user-input").value.trim().toLowerCase();
    if (input) {
        getData(input);
    } else {
        alert("Please enter a Pokémon name!");
    }
});

document.getElementById("user-input").addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        button.click();
    }
});

