
import {setTheme,imageDict} from '../js/script.js'


//-----------------------------variables--------------------------------------------------------------------------------

const maxLevel = 50
const attributesPerLevel = 3
const attributeMaxValue = 100

let attributesDict = JSON.parse(window.localStorage.getItem("attributesDict"))
let baseStats = JSON.parse(window.localStorage.getItem("baseStats"))
let statsBonus = JSON.parse(window.localStorage.getItem("statsBonus"))
let currentStats = JSON.parse(window.localStorage.getItem("currentStats"))
let remainingAttribute = parseInt(window.localStorage.getItem("remainingAttribute"))
let level = parseInt(window.localStorage.getItem("level"))
let attributeMinValues = JSON.parse(window.localStorage.getItem("attributeMinValues"))

//---------------------------Event-listeners-----------------------------------------------------------------------------

document.getElementById("origin-select").addEventListener("change", onOriginSelect, false);
document.getElementById("gender-select").addEventListener("change", onGenderSelect, false);
document.getElementById("increase-level-button").addEventListener("click", increaseLevel, false);
document.getElementById("decrease-level-button").addEventListener("click", decreaseLevel, false);

document.getElementById("increase-strength-button").addEventListener("click", (event) => { 
    increaseAttribute(event, "strength") 
})
document.getElementById("decrease-strength-button").addEventListener("click", (event) => { 
    decreaseAttribute(event, "strength")
})
document.getElementById("increase-dexterity-button").addEventListener("click", (event) => { 
    increaseAttribute(event, "dexterity") 
})
document.getElementById("decrease-dexterity-button").addEventListener("click", (event) => { 
    decreaseAttribute(event, "dexterity")
})
document.getElementById("increase-intelligence-button").addEventListener("click", (event) => { 
    increaseAttribute(event, "intelligence") 
})
document.getElementById("decrease-intelligence-button").addEventListener("click", (event) => { 
    decreaseAttribute(event, "intelligence")
})
document.getElementById("increase-constitution-button").addEventListener("click", (event) => { 
    increaseAttribute(event, "constitution") 
})
document.getElementById("decrease-constitution-button").addEventListener("click", (event) => { 
    decreaseAttribute(event, "constitution")
})
document.getElementById("increase-willpower-button").addEventListener("click", (event) => { 
    increaseAttribute(event, "willpower") 
})
document.getElementById("decrease-willpower-button").addEventListener("click", (event) => { 
    decreaseAttribute(event, "willpower")
})
document.getElementById("increase-endurance-button").addEventListener("click", (event) => { 
    increaseAttribute(event, "endurance") 
})
document.getElementById("decrease-endurance-button").addEventListener("click", (event) => { 
    decreaseAttribute(event, "endurance")
})
document.getElementById("increase-agility-button").addEventListener("click", (event) => { 
    increaseAttribute(event, "agility") 
})
document.getElementById("decrease-agility-button").addEventListener("click", (event) => { 
    decreaseAttribute(event, "agility")
})
document.getElementById("increase-charisma-button").addEventListener("click", (event) => { 
    increaseAttribute(event, "charisma") 
})
document.getElementById("decrease-charisma-button").addEventListener("click", (event) => { 
    decreaseAttribute(event, "charisma")
})
document.getElementById("increase-wisdom-button").addEventListener("click", (event) => { 
    increaseAttribute(event, "wisdom") 
})
document.getElementById("decrease-wisdom-button").addEventListener("click", (event) => { 
    decreaseAttribute(event, "wisdom")
})




//-------------------------------on-page-load-----------------------------------------------------------------


if(removeDuplicatesDictToArray(statsBonus).length == 1 && removeDuplicatesDictToArray(statsBonus)[0] == 0){
    document.getElementById("remaining-attributes").innerHTML = remainingAttribute
    document.getElementById("level-attribute").innerHTML = level
    for (const [key, value] of Object.entries(attributeMinValues)) {
        attributeBonusUpdate(key,value)
    }
    updateAllAttributes()
}
else{
    updateAllAttributes()
    document.getElementById("remaining-attributes").innerHTML = remainingAttribute
    document.getElementById("origin-select").value = window.localStorage.getItem("theme")
    document.getElementById("level-attribute").innerHTML = level
}

//------------------------------------attribute-page-functions-------------------------------------------------


function removeDuplicatesDictToArray(dict){
    let arr = []
    for (const [key, value] of Object.entries(dict)) {
        if(arr.includes(dict[key]) == false){
            arr.push(value)
        }
    }
    return arr
}

function attributeBonusUpdate(attributeID, value){
    
    switch(attributeID){
        case "strength":
            statsBonus["weight"] += value * 0.18
            statsBonus["physicalArmor"] += value * 0.13
        case "dexterity":
            statsBonus["precision"] += value * 0.17
            statsBonus["thoughness"] += value * 0.13
            break
        case "intelligence":
            statsBonus["spellArmor"] += value * 0.13
            statsBonus["mind"] += value * 0.12
            break
        case "constitution":
            statsBonus["healthMult"] += value * 0.012
            statsBonus["staminaRecovery"] += value * 0.04
            statsBonus["perserevance"] += value * 0.16
            break
        case "endurance":
            statsBonus["staminaMult"] += value * 0.015
            statsBonus["healthFlat"] += value * 2
            statsBonus["resilence"] += value * 0.16
            break
        case "willpower":
            statsBonus["focusMult"] += value * 0.025
            statsBonus["focusRecovery"] += value * 0.02
            statsBonus["alacricity"] += value * 0.14
            break
        case "agility":
            statsBonus["staminaFlat"] += value
            statsBonus["haste"] += value * 0.16
            statsBonus["tenacity"] += value * 0.12
            break
        case "wisdom":
            statsBonus["focusFlat"] += value * 1.5
            statsBonus["penetration"] += value * 0.15
            break
        case "charisma":
            statsBonus["concentration"] += value * 0.2
            statsBonus["perspicacious"] += value * 0.2
            break
        default:
            break
    }
    window.localStorage.setItem("statsBonus", JSON.stringify(statsBonus))
}

function levelUp(value){
    baseStats["health"] += 8*value
    baseStats["stamina"] += 1*value
    baseStats["focus"] += 1*value
    window.localStorage.setItem("baseStats", JSON.stringify(baseStats))
    updateAllAttributes()
}

function onOriginSelect(e) {
    const element = document.getElementById("origin-select")
    for (const [key, value] of Object.entries(attributesDict)) {
        attributeBonusUpdate(key,-value)
    }
    switch (element.value){
    case "astelian":
        attributeMinValues = {
            "strength": 11,
            "dexterity": 10,
            "intelligence": 15,
            "constitution": 15,
            "willpower": 14,
            "endurance": 10,
            "agility": 6,
            "charisma": 6,
            "wisdom": 11,
        }
        break
    case "eldritch":
        attributeMinValues = {
            "strength": 10,
            "dexterity": 14,
            "intelligence": 10,
            "constitution": 8,
            "willpower": 15,
            "endurance": 12,
            "agility": 15,
            "charisma": 8,
            "wisdom": 6,
        }
        break
    case "imperial":
            attributeMinValues = {
            "strength": 10,
            "dexterity": 10,
            "intelligence": 10,
            "constitution": 11,
            "willpower": 10,
            "endurance": 10,
            "agility": 10,
            "charisma": 12,
            "wisdom": 15,
        }
        break
    case "egnesian":
        attributeMinValues = {
            "strength": 15,
            "dexterity": 10,
            "intelligence": 7,
            "constitution": 15,
            "willpower": 10,
            "endurance": 12,
            "agility": 11,
            "charisma": 6,
            "wisdom": 12,
        }
        break
    case "khazdan":
        attributeMinValues = {
            "strength": 14,
            "dexterity": 9,
            "intelligence": 10,
            "constitution": 14,
            "willpower": 11,
            "endurance": 15,
            "agility": 6,
            "charisma": 7,
            "wisdom": 12,
        }
        break
    case "sanguine":
        attributeMinValues = {
            "strength": 12,
            "dexterity": 12,
            "intelligence": 12,
            "constitution": 13,
            "willpower": 9,
            "endurance": 11,
            "agility": 10,
            "charisma": 13,
            "wisdom": 6,
        }
        break
    case "sylvar":
        attributeMinValues = {
            "strength": 6,
            "dexterity": 15,
            "intelligence": 8,
            "constitution": 6,
            "willpower": 11,
            "endurance": 11,
            "agility": 13,
            "charisma": 15,
            "wisdom": 13,
        }
        break
    case "styria":
        attributeMinValues = {
            "strength": 13,
            "dexterity": 10,
            "intelligence": 13,
            "constitution": 13,
            "willpower": 9,
            "endurance": 11,
            "agility": 8,
            "charisma": 15,
            "wisdom": 6,
        }
        break
    }
    setTheme(element.value)
    window.localStorage.setItem("attributeMinValues", JSON.stringify(attributeMinValues))
    window.localStorage.setItem("attributesDict", JSON.stringify(attributeMinValues))
    attributesDict = JSON.parse(window.localStorage.getItem("attributesDict"))

    remainingAttribute = (parseInt(document.getElementById("level-attribute").innerHTML)-1)*attributesPerLevel
    document.getElementById("remaining-attributes").innerHTML = remainingAttribute
    for (const [key, value] of Object.entries(attributeMinValues)) {
        attributeBonusUpdate(key,value)
    }
    updateAllAttributes()
}

function onGenderSelect(){
    const themeName = document.getElementById("origin-select").value
    const gender = document.getElementById("gender-select").value
    window.localStorage.setItem("gender", gender)
    document.documentElement.style.setProperty('---background-image', imageDict[themeName+gender])
}

function changeRemainingAttribute(value){
    remainingAttribute += value
    document.getElementById("remaining-attributes").innerHTML = remainingAttribute
    window.localStorage.setItem("remainingAttribute", remainingAttribute)
}

function changeLevel(value){
    level += value
    window.localStorage.setItem("level", level)
    document.getElementById("level-attribute").innerHTML = level
}

function changeAttributeValue(attributeID,value){
    attributesDict[attributeID] = parseInt(attributesDict[attributeID]) + value
    window.localStorage.setItem("attributesDict", JSON.stringify(attributesDict));
    document.getElementById(attributeID + "-attribute").innerHTML = attributesDict[attributeID]
}

function increaseLevel(e){
    if(e.shiftKey) {
        if(level + 10 <= maxLevel){
            changeRemainingAttribute(attributesPerLevel * 10)
            changeLevel(10)
            levelUp(10)
        }
        else{
            let levelIncrese = maxLevel - level
            changeRemainingAttribute(attributesPerLevel * levelIncrese)
            changeLevel(levelIncrese)
            levelUp(levelIncrese)
        }
    }
    else if(e.ctrlKey){
        let levelIncrese = maxLevel - level
        changeRemainingAttribute(attributesPerLevel * levelIncrese)
        changeLevel(levelIncrese)
        levelUp(levelIncrese)
    }
    else if (level < maxLevel){
        changeRemainingAttribute(attributesPerLevel)
        changeLevel(1)
        levelUp(1)
    }
    updateAllAttributes()
}

function decreaseLevel(e) {
    let leveldecrease = parseInt(remainingAttribute/attributesPerLevel)
    if (e.shiftKey){
        if (remainingAttribute >= attributesPerLevel * 10 && level >= 11){
            changeRemainingAttribute(-attributesPerLevel * 10)
            changeLevel(-10)
            levelUp(-10)
        }
        else if (remainingAttribute >= attributesPerLevel){
            changeRemainingAttribute(-leveldecrease*attributesPerLevel)
            changeLevel(-leveldecrease)
            levelUp(-leveldecrease)
        }
    }
    else if (e.ctrlKey){
        let leveldecrease = parseInt(remainingAttribute/attributesPerLevel)
            changeRemainingAttribute(-leveldecrease*attributesPerLevel)
            changeLevel(-leveldecrease)
            levelUp(-leveldecrease)
    }
    else if (level > 1 && remainingAttribute >= attributesPerLevel){
        changeRemainingAttribute(-attributesPerLevel)
        changeLevel(-1)
        levelUp(-1)
    }
}

function increaseAttribute(e,attributeID) {
    let attributeChange
    if (e.shiftKey){
        if(remainingAttribute >= 10 && attributesDict[attributeID] + 10 <= attributeMaxValue){
            attributeChange = 10
        }
        else{
            attributeChange = remainingAttribute
        }
    }
    else if (e.ctrlKey){
        if(attributesDict[attributeID] + remainingAttribute > attributeMaxValue){
            attributeChange = remainingAttribute-(remainingAttribute-(attributeMaxValue - attributesDict[attributeID]))
        }else 
            attributeChange = remainingAttribute
        
    }
    else if (attributesDict[attributeID] < attributeMaxValue && remainingAttribute > 0){
        attributeChange = 1
    }
    if (remainingAttribute > 0 && attributesDict[attributeID] < attributeMaxValue){
        attributeBonusUpdate(attributeID, attributeChange)
        changeAttributeValue(attributeID, attributeChange)
        changeRemainingAttribute(-attributeChange)
        updateAllAttributes()
    }
}

function decreaseAttribute(e,attributeID) {
    let attributeChange
    if (e.shiftKey){
        if(attributesDict[attributeID] - 10 >= attributeMinValues[attributeID]){
            attributeChange = 10
        }
        else{
            attributeChange = attributesDict[attributeID] - attributeMinValues[attributeID]
        }
    }
    else if (e.ctrlKey){
        attributeChange = attributesDict[attributeID] - attributeMinValues[attributeID]
    }
    else if (attributesDict[attributeID] > attributeMinValues[attributeID]){
        attributeChange = 1
    }
    if (attributesDict[attributeID] - attributeChange >= attributeMinValues[attributeID] ){
        attributeBonusUpdate(attributeID, -attributeChange)
        changeAttributeValue(attributeID, -attributeChange)
        changeRemainingAttribute(attributeChange)
        updateAllAttributes()
    }

}

function updateAllAttributes() {
    for (let key in attributesDict) {
        document.getElementById(key+"-attribute").innerHTML = attributesDict[key]
    }
    
    currentStats["health"] = parseInt((baseStats["health"] + statsBonus["healthFlat"])*(1 + statsBonus["healthMult"]))
    currentStats["focus"] = parseInt((baseStats["focus"] + statsBonus["focusFlat"])*(1 + statsBonus["focusMult"]))
    currentStats["stamina"] = parseInt((baseStats["stamina"] + statsBonus["staminaFlat"])*(1 + statsBonus["staminaMult"]))
    currentStats["precision"] = parseFloat(((baseStats["precision"] + statsBonus["precision"]))).toFixed(2)
    currentStats["spellArmor"] = parseFloat(baseStats["spellArmor"] + statsBonus["spellArmor"]).toFixed(2)
    currentStats["physicalArmor"] = parseFloat(baseStats["physicalArmor"] + statsBonus["physicalArmor"]).toFixed(2)
    currentStats["focusRecovery"] = parseFloat(((baseStats["focusRecovery"] + statsBonus["focusRecovery"]))).toFixed(2)
    currentStats["staminaRecovery"] = parseFloat(((baseStats["staminaRecovery"] + statsBonus["staminaRecovery"]))).toFixed(2)
    currentStats["haste"] = parseFloat(baseStats["haste"] + statsBonus["haste"]).toFixed(2)
    currentStats["weight"] = parseFloat(baseStats["weight"] + statsBonus["weight"]).toFixed(1)
    currentStats["concentration"] = parseFloat(baseStats["concentration"] + statsBonus["concentration"]).toFixed(2)
    currentStats["penetration"] = parseFloat(baseStats["penetration"] + statsBonus["penetration"]).toFixed(2)
    currentStats["thoughness"] = parseFloat(baseStats["thoughness"] + statsBonus["thoughness"]).toFixed(2)
    currentStats["tenacity"] = parseFloat(baseStats["tenacity"] + statsBonus["tenacity"]).toFixed(2)
    currentStats["resilence"] = parseFloat(baseStats["resilence"] + statsBonus["resilence"]).toFixed(2)
    currentStats["mind"] = parseFloat(baseStats["mind"] + statsBonus["mind"]).toFixed(2)
    currentStats["alacricity"] = parseFloat(baseStats["alacricity"] + statsBonus["alacricity"]).toFixed(2)
    currentStats["perspicacious"] = parseFloat(baseStats["perspicacious"] + statsBonus["perspicacious"]).toFixed(2)
    currentStats["perserevance"] = parseFloat(baseStats["perserevance"] + statsBonus["perserevance"]).toFixed(2)

    window.localStorage.setItem("currentStats", JSON.stringify(currentStats))

    for (const [key, value] of Object.entries(currentStats)) {
        document.getElementById(key).innerHTML = value
    }
}