const characterNameDiv = document.getElementById('characterName');
const spellDiv = document.getElementById('spell');
const nasaImageDiv = document.getElementById('nasaImage');

document.getElementById('gryffindor').addEventListener('click', () => fetchHouseData('Gryffindor'));
document.getElementById('hufflepuff').addEventListener('click', () => fetchHouseData('Hufflepuff'));
document.getElementById('ravenclaw').addEventListener('click', () => fetchHouseData('Ravenclaw'));
document.getElementById('slytherin').addEventListener('click', () => fetchHouseData('Slytherin'));

function fetchHouseData(house) {
    fetchCharacter(house);
    fetchRandomSpell();
    fetchNASADailyPhoto();
}

function fetchCharacter(house) {
    fetch('https://hp-api.onrender.com/api/characters')
        .then(response => response.json())
        .then(data => {
            const charactersFromHouse = data.filter(character => character.house === house);
            if (charactersFromHouse.length > 0) {
                const randomCharacter = charactersFromHouse[Math.floor(Math.random() * charactersFromHouse.length)];
                characterNameDiv.textContent = `${house}: ${randomCharacter.name}`;
            } else {
                characterNameDiv.textContent = `No character found from ${house}.`;
            }
        })
        .catch(error => {
            console.error('Error fetching character data:', error);
            characterNameDiv.textContent = 'Failed to fetch character data.';
        });
}

function fetchRandomSpell() {
    fetch('https://hp-api.onrender.com/api/spells')
        .then(response => response.json())
        .then(spells => {
            const randomSpell = spells[Math.floor(Math.random() * spells.length)];
            spellDiv.textContent = `${randomSpell.name} - ${randomSpell.description}`;
        })
        .catch(error => {
            console.error('Error fetching spell data:', error);
            spellDiv.textContent = 'Failed to fetch spell data.';
        });
}

function fetchNASADailyPhoto() {
    const nasaAPIkey = "DEMO_KEY"; // Replace with your actual NASA API key
    const nasaAPODurl = `https://api.nasa.gov/planetary/apod?api_key=${nasaAPIkey}`;

    fetch(nasaAPODurl)
        .then(response => response.json())
        .then(data => {
            if (data.url) {
                nasaImageDiv.innerHTML = `<img src="${data.url}" alt="NASA Picture of the Day" style="width: 100%; max-width: 600px;">`;
            }
        })
        .catch(error => {
            console.error('Error fetching NASA photo:', error);
            nasaImageDiv.textContent = 'Failed to fetch NASA photo.';
        });
}
