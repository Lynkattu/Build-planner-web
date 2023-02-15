//-----------------------------import------------------------------------------------------------------------------



//-----------------------------on-pageload-------------------------------------------------------------------------

if(window.localStorage.getItem("remainingAttribute") == null)
    window.localStorage.setItem("remainingAttribute", 0)

if(window.localStorage.getItem("level") == null)
    window.localStorage.setItem("level", 1)

if(window.localStorage.getItem("gender") == null)
    window.localStorage.setItem("gender", "Female")

if(window.localStorage.getItem("music-player-state") == null){
    window.localStorage.setItem("music-player-state", "play")
}

if(window.localStorage.getItem("attributesDict") == null){
    let attrib =     {
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
    window.localStorage.setItem("attributesDict", JSON.stringify(attrib))
    window.localStorage.setItem("attributeMinValues", JSON.stringify(attrib))
}

if(window.localStorage.getItem("baseStats") == null){
    let baseStats = {
        "health": 200,
        "focus": 150,
        "stamina": 100,
        "weight": 20,
        "precision": 5,
        "spellArmor": 0,
        "physicalArmor": 0,
        "staminaRecovery": 4,
        "focusRecovery": 2,
        "haste": 0,
        "concentration": 0,
        "penetration": 0,
        "mind": 0,
        "tenacity": 0,
        "thoughness": 0,
        "resilence": 0,
        "alacricity": 0,
        "perspicacious": 0,
        "perserevance": 0

    }
    window.localStorage.setItem("baseStats", JSON.stringify(baseStats))
}

if(window.localStorage.getItem("statsBonus") == null){
    let statsBonusDict = {
        "healthFlat": 0,
        "healthMult": 0,
        "staminaFlat": 0,
        "staminaMult": 0,
        "focusFlat": 0,
        "focusMult": 0,
        "precision": 0,
        "spellArmor": 0,
        "physicalArmor": 0,
        "staminaRecovery": 0,
        "focusRecovery": 0,
        "haste": 0,
        "weight": 0,
        "concentration": 0,
        "penetration": 0,
        "mind": 0,
        "tenacity": 0,
        "thoughness": 0,
        "resilence": 0,
        "alacricity": 0,
        "perspicacious": 0,
        "perserevance": 0


    }
    window.localStorage.setItem("statsBonus", JSON.stringify(statsBonusDict))
}

if(window.localStorage.getItem("currentStats") == null){
    let currentStatsDict = {
        "health": 0,
        "focus": 0,
        "stamina": 0,
        "precision": 0,
        "spellArmor": 0,
        "physicalArmor": 0,
        "staminaRecovery": 0,
        "focusRecovery": 0,
        "haste": 0,
        "weight": 0,
        "concentration": 0,
        "penetration": 0,
        "mind": 0,
        "tenacity": 0,
        "thoughness": 0,
        "resilence": 0,
        "alacricity": 0,
        "perspicacious": 0,
        "perserevance": 0

    }
    window.localStorage.setItem("currentStats", JSON.stringify(currentStatsDict))
}

//---------------variables----------------------------------------------------------------
document.getElementById("audio-player-container").addEventListener("click", onPlayAudio, false);

export const imageDict = {
    "astelianFemale": "url('../images/Astelian.png') no-repeat",
    "astelianMale": "url('../images/astelianMale.png') no-repeat",
    "egnesianFemale": "url('../images/Egnesian.png') no-repeat",
    "egnesianMale": "url('../images/egnesianMale.png') no-repeat",
    "imperialFemale": "url('../images/Imperial.png') no-repeat",
    "imperialMale": "url('../images/ImperialMale.png') no-repeat",
    "eldritchFemale": "url('../images/Eldritch2.png') no-repeat",
    "eldritchMale": "url('../images/eldritchMale.png') no-repeat",
    "styriaMale": "url('../images/Styria.png') no-repeat",
    "styriaFemale": "url('../images/styriaFemale.png') no-repeat",
    "sylvarFemale": "url('../images/Fae1.png') no-repeat",
    "sylvarMale": "url('../images/faeMale.png') no-repeat",
    "sanguineMale": "url('../images/Sanguine.png') no-repeat",
    "sanguineFemale": "url('../images/sanguineFemale.png') no-repeat",
    "khazdanMale": "url('../images/Dwarf.png') no-repeat",
    "khazdanFemale": "url('../images/dwarfFemale.png') no-repeat"
}
const musicDict = {
    "astelian": "/music/March of titans.mp3",
    "egnesian": "/music/Soaring Dragon.mp3",
    "imperial": "/music/Church Choir.mp3",
    "eldritch": "/music/Edge of Madness.mp3",
    "styria": "/music/The Devil.mp3",
    "sylvar": "/music/Moonsong.mp3",
    "sanguine": "/music/The Vampire Masquerade.mp3",
    "khazdan": "/music/Call of the Gods.mp3"
}

//-------------must-be-after-musicDict-------------------------------------------------------------
if(window.localStorage.getItem("theme") == null){
    document.body.classList.add("astelian-theme")
    window.localStorage.setItem("theme", "astelian")
    document.documentElement.style.setProperty('---background-image', imageDict["astelianFemale"])
    document.getElementById("music-player").src = musicDict["astelian"]
    onPlayAudio()
}
else{
    setTheme(window.localStorage.getItem("theme"))
}

//---------------general-functions-------------------------------------------------------------------
export function setTheme(themeName){
    let gender = window.localStorage.getItem("gender")
    if (!(document.body.classList.contains(themeName + "-theme")))
        document.body.removeAttribute('class')
    document.body.classList.add(themeName + "-theme")
    localStorage.setItem("theme", themeName)
    document.getElementById("music-player").src = musicDict[themeName]
    window.localStorage.setItem("music-player-state", "play")
    onPlayAudio()
    document.documentElement.style.setProperty('---background-image', imageDict[themeName+gender])
}

function onPlayAudio(){
    let audio = document.getElementById("music-player")
    if(window.localStorage.getItem("music-player-state") == "pause"){
        audio.play()
        window.localStorage.setItem("music-player-state", "play")
        document.getElementById("music-play-button").innerHTML = "Pause"
        document.getElementById("audio-button-icon").src = "/images/pauseIcon.png"
    }
    else{
        audio.pause()
        window.localStorage.setItem("music-player-state", "pause")
        document.getElementById("music-play-button").innerHTML = "Play"
        document.getElementById("audio-button-icon").src = "/images/playIcon.png"
    }

}


