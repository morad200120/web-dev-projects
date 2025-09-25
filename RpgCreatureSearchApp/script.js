// Creature database with exact specifications
const creatures = {
    'pyrolynx': {
        name: 'PYROLYNX',
        id: 1,
        weight: 42,
        height: 32,
        types: ['FIRE'],
        hp: 65,
        attack: 80,
        defense: 50,
        specialAttack: 90,
        specialDefense: 55,
        speed: 100
    },
    '1': {
        name: 'PYROLYNX',
        id: 1,
        weight: 42,
        height: 32,
        types: ['FIRE'],
        hp: 65,
        attack: 80,
        defense: 50,
        specialAttack: 90,
        specialDefense: 55,
        speed: 100
    },
    'aquoroc': {
        name: 'AQUOROC',
        id: 2,
        weight: 220,
        height: 53,
        types: ['WATER', 'ROCK'],
        hp: 85,
        attack: 90,
        defense: 120,
        specialAttack: 60,
        specialDefense: 70,
        speed: 40
    },
    '2': {
        name: 'AQUOROC',
        id: 2,
        weight: 220,
        height: 53,
        types: ['WATER', 'ROCK'],
        hp: 85,
        attack: 90,
        defense: 120,
        specialAttack: 60,
        specialDefense: 70,
        speed: 40
    },
    'verdantis': {
        name: 'VERDANTIS',
        id: 3,
        weight: 180,
        height: 95,
        types: ['GRASS', 'FAIRY'],
        hp: 78,
        attack: 65,
        defense: 85,
        specialAttack: 105,
        specialDefense: 95,
        speed: 72
    },
    '3': {
        name: 'VERDANTIS',
        id: 3,
        weight: 180,
        height: 95,
        types: ['GRASS', 'FAIRY'],
        hp: 78,
        attack: 65,
        defense: 85,
        specialAttack: 105,
        specialDefense: 95,
        speed: 72
    },
    'stormwing': {
        name: 'STORMWING',
        id: 4,
        weight: 75,
        height: 140,
        types: ['ELECTRIC', 'FLYING'],
        hp: 70,
        attack: 85,
        defense: 60,
        specialAttack: 115,
        specialDefense: 70,
        speed: 130
    },
    '4': {
        name: 'STORMWING',
        id: 4,
        weight: 75,
        height: 140,
        types: ['ELECTRIC', 'FLYING'],
        hp: 70,
        attack: 85,
        defense: 60,
        specialAttack: 115,
        specialDefense: 70,
        speed: 130
    },
    'glacihorn': {
        name: 'GLACIHORN',
        id: 5,
        weight: 320,
        height: 68,
        types: ['ICE', 'GROUND'],
        hp: 95,
        attack: 110,
        defense: 130,
        specialAttack: 45,
        specialDefense: 80,
        speed: 40
    },
    '5': {
        name: 'GLACIHORN',
        id: 5,
        weight: 320,
        height: 68,
        types: ['ICE', 'GROUND'],
        hp: 95,
        attack: 110,
        defense: 130,
        specialAttack: 45,
        specialDefense: 80,
        speed: 40
    },
    'shadowmist': {
        name: 'SHADOWMIST',
        id: 6,
        weight: 12,
        height: 85,
        types: ['GHOST', 'DARK'],
        hp: 60,
        attack: 70,
        defense: 55,
        specialAttack: 125,
        specialDefense: 90,
        speed: 110
    },
    '6': {
        name: 'SHADOWMIST',
        id: 6,
        weight: 12,
        height: 85,
        types: ['GHOST', 'DARK'],
        hp: 60,
        attack: 70,
        defense: 55,
        specialAttack: 125,
        specialDefense: 90,
        speed: 110
    },
    'crystalwyrm': {
        name: 'CRYSTALWYRM',
        id: 7,
        weight: 450,
        height: 200,
        types: ['DRAGON', 'STEEL'],
        hp: 110,
        attack: 130,
        defense: 120,
        specialAttack: 100,
        specialDefense: 100,
        speed: 80
    },
    '7': {
        name: 'CRYSTALWYRM',
        id: 7,
        weight: 450,
        height: 200,
        types: ['DRAGON', 'STEEL'],
        hp: 110,
        attack: 130,
        defense: 120,
        specialAttack: 100,
        specialDefense: 100,
        speed: 80
    },
    'psymorph': {
        name: 'PSYMORPH',
        id: 8,
        weight: 89,
        height: 77,
        types: ['PSYCHIC'],
        hp: 85,
        attack: 55,
        defense: 75,
        specialAttack: 135,
        specialDefense: 105,
        speed: 90
    },
    '8': {
        name: 'PSYMORPH',
        id: 8,
        weight: 89,
        height: 77,
        types: ['PSYCHIC'],
        hp: 85,
        attack: 55,
        defense: 75,
        specialAttack: 135,
        specialDefense: 105,
        speed: 90
    }
};

// DOM elements
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const resultsSection = document.getElementById('results');
const creatureName = document.getElementById('creature-name');
const creatureId = document.getElementById('creature-id');
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const types = document.getElementById('types');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');

// Search functionality
function searchCreature() {
    const query = searchInput.value.toLowerCase().trim();

    if (!query) {
        alert('Creature not found');
        return;
    }

    const creature = creatures[query];

    if (creature) {
        displayCreature(creature);
    } else {
        alert('Creature not found');
    }
}

// Display creature information
function displayCreature(creature) {
    creatureName.textContent = creature.name;
    creatureId.textContent = `#${creature.id}`;
    weight.textContent = `Weight: ${creature.weight}`;
    height.textContent = `Height: ${creature.height}`;
    hp.textContent = creature.hp;
    attack.textContent = creature.attack;
    defense.textContent = creature.defense;
    specialAttack.textContent = creature.specialAttack;
    specialDefense.textContent = creature.specialDefense;
    speed.textContent = creature.speed;

    // Clear types and add new ones
    types.innerHTML = '';
    creature.types.forEach(type => {
        const typeElement = document.createElement('span');
        typeElement.textContent = type;
        typeElement.className = 'px-3 py-1 bg-[#795392] text-[#130d32] rounded-full text-sm font-medium';
        types.appendChild(typeElement);
    });

    resultsSection.classList.remove('hidden');
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

// Event listeners
searchButton.addEventListener('click', searchCreature);

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchCreature();
    }
});

// Button hover effects
searchButton.addEventListener('mouseenter', function () {
    this.style.transform = 'scale(1.05)';
});

searchButton.addEventListener('mouseleave', function () {
    this.style.transform = 'scale(1)';
});

// Initialize with welcome message
window.addEventListener('load', () => {
    resultsSection.classList.add('hidden');
});