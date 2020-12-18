'use strict';

//main
loadItems()
.then(items=>{
    displayItems(items);
    setEventListeners(items);
})
.catch(console.log);

//Fetch the items from the JSON file
function loadItems(){
    return fetch('../data/data.json')
        .then(response=>response.json())
        .then(json=>json.items);
}

const container=document.querySelector('.items');
//Update the list with the given items
function displayItems(items){ 
    container.innerHTML=items.map(item=>createHTMLString(item)).join('');
}
//Create HTML list item from the given data item
function createHTMLString(item){
    return `
    <li class="item" data-color="${item.color}" data-type="${item.type}">
        <img src="${item.image}" alt="${item.type}" class="item__thumbnail"/>
        <span class="item__description">${item.gender}, ${item.size}</span>
    </li>
    `;
}

function setEventListeners(items){
    const logo=document.querySelector('.logo');
    const buttons=document.querySelector('.buttons');
    logo.addEventListener('click',()=>displayItems(items));
    buttons.addEventListener('click',event=>onButtonClick(event,items));
}


//Handle button click
function onButtonClick(event, items){
     const key=event.target.dataset.key;
     const value=event.target.dataset.value;

     if(key==null||value==null){
         return;
     }
     updateItems(items,key,value);
}  

//Make the items matching {key: value} invisible.
function updateItems(jsonItems,btnKey,btnValue){
    const items=document.querySelectorAll('.item');
    items.forEach(item =>{
        if(item.dataset[btnKey]===btnValue){
            item.classList.remove('invisible');
        }else{
            item.classList.add('invisible');
        }
    });
}  