/*Buttons and API's*/
const searchBtn = document.getElementById("search-button")
const searchInput = document.getElementById("search-input")
const apiUrl = "https://rpg-creature-api.freecodecamp.rocks/api/creature"

const types = document.getElementById("types")
const results = document.getElementById("results")

/*Creature Stats*/
const creatureName = document.getElementById("creature-name")
const creatureId = document.getElementById("creature-id")
const creatureWeight = document.getElementById("weight")
const creatureHeight = document.getElementById("height")
const creatureHp = document.getElementById("hp")
const creatureAttack = document.getElementById("attack")
const creatureDefense = document.getElementById("defense")
const creatureSpecialAttack = document.getElementById("special-attack")
const creatureSpecialDefense = document.getElementById("special-defense")
const creatureSpeed = document.getElementById("speed")

const getFilledTypes = (creature) => {
    let filledTypes = []
    creature.types.forEach((typeObj) => {
        const p = document.createElement("p")
        p.classList.add("bg-[#352856]", "text-gray-400", "rounded-2xl", "px-3", "py-1")
        // I types sono oggetti, quindi accedi al nome del tipo
        p.textContent = typeObj.name.toUpperCase()
        filledTypes.push(p)
    })
    return filledTypes
}

const displayStats = (creature) => {
    // Pulisci i tipi precedenti
    types.innerHTML = ""

    const filledTypes = getFilledTypes(creature)
    filledTypes.forEach(filledType => {
        types.appendChild(filledType)
    })

    // Mostra le statistiche della creatura
    creatureName.textContent = creature.name.toUpperCase()
    creatureId.textContent = `#${creature.id}`
    creatureWeight.textContent = `Weight: ${creature.weight}`
    creatureHeight.textContent = `Height: ${creature.height}`

    // Gli stats sono oggetti con base_stat
    creatureHp.textContent = creature.stats[0].base_stat
    creatureAttack.textContent = creature.stats[1].base_stat
    creatureDefense.textContent = creature.stats[2].base_stat
    creatureSpecialAttack.textContent = creature.stats[3].base_stat
    creatureSpecialDefense.textContent = creature.stats[4].base_stat
    creatureSpeed.textContent = creature.stats[5].base_stat

    results.classList.remove("hidden")
}

const getCreature = async () => {
    try {
        const searchValue = searchInput.value.trim()
        if (!searchValue) {
            alert("Please enter a creature name or ID")
            return
        }

        const response = await fetch(`${apiUrl}/${searchValue}`)

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        console.log(data)
        displayStats(data)
    } catch (error) {
        console.error('Error fetching creature:', error)
        alert("Creature not found")
        results.classList.add("hidden")
    }
}

searchBtn.addEventListener("click", () => {
    getCreature()
})

// Listener per il tasto Enter
searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        getCreature()
    }
})