//--------------------------imports---------------------------------------------------------------
import items from '../json/items.json' assert {type: 'json'}


//--------------------------variables-and-event-listeners------------------------------------------

const itemsJSON = items

document.getElementById("itemslot-select").addEventListener("change", onItemSlotChange, false)

document.querySelector(".collapsible").addEventListener("click", expandItemlistOnClick, false)

//--------------------------item-page-functions----------------------------------------------------

function onItemSlotChange(e){

}

function expandItemlistOnClick(){
    const content = document.querySelector(".collapsible-content")
    const display = content.style.display
    const itemsByType = document.getElementById("itemslot-select").value
    //const itemlist = []

    document.getElementById("listBlock").style.display = "block"
    if(display != "block"){
        content.style.display = "block"
        for(var i in itemsJSON[itemsByType]){
            const para = document.createElement("div")
            para.innerHTML = itemsJSON[itemsByType][i]["itemName"]
            content.appendChild(para);
            para.classList.add('equipment')
        }
        //itemlist.push(itemsJSON[itemsByType][i]["itemName"])
        //content.innerHTML = itemlist
        //const node = document.createTextNode("new paragraph")
        //para.appendChild(node)
    }
    else{
        content.style.display = "none"
        removeAllChildNodes(content)

    }
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}