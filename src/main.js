'use strict';
//Fetch the items from the JSON file
function loadItems(){
    return fetch('../data/data.json')
        .then(response=>response.json())
        .then(json=>json.items);
}
//Update the list with the given items
function displayItems(items){
    const container=document.querySelector('.items');
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
//main
loadItems()
.then(items=>{
    displayItems(items);
    //setEventListeners(items);
})
.catch(console.log);

// const items=document.querySelector('.items');
// function displayItems(jsonItems){
//     for (let i=0; i < jsonItems.length; i++) {
//         const item=document.createElement('li');
//         const json=jsonItems[i];
//         item.setAttribute('class','item');
//         item.setAttribute('data-color',json['color']);
//         item.setAttribute('data-type',json['type']);
//         item.innerHTML=`<img src="${json['image']}" class="item__thumbnail" alt="${json['type']}">${json['gender']}, ${json['size']}`;
//         items.append(item);
//     }
// }

function setEventListeners(){

}
const btns=document.querySelector('.buttons');
btns.addEventListener('click',(e)=>{
    const target=e.target;
    if(target.nodeName!=='IMG'&&target.nodeName!=='BUTTON'){
        return;
    }else{
        filtering(target);
    }
})
function filtering(target){
    if(target.nodeName==='IMG'){
        filterItem(target.parentNode.getAttribute('data-type'));
    }else{
        filterItem(target.getAttribute('data-color'));
    }
}
function filterItem(info){
    const itemArray=document.querySelectorAll('.item');    
    for (let item of itemArray) {
        if((item.getAttribute('data-type')===info)||(item.getAttribute('data-color')===info)){
            item.classList.remove('hidden');
        }else{
            item.classList.add('hidden');
        }
    }
};