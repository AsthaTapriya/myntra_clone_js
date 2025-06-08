// we generate one item by css and html and others are done using javascript...........
let bagItems;
onLoad();

function onLoad()
{
    let bagItemsStr = localStorage.getItem('bagItems');
    bagItems = bagItemsStr ? JSON.parse(bagItemsStr) : [ ];
    homePageItems();
    displayBagIcon();
}

function addtobag(itemId) {
    bagItems.push(itemId);
    localStorage.setItem('bagItems' , JSON.stringify(bagItems));
    displayBagIcon();
}

function displayBagIcon()
{
        let bagItemCount = document.querySelector('.count_item');
        if (bagItems.length > 0){
            bagItemCount.style.visibility = 'visible';
            bagItemCount.innerText = bagItems.length; 
        }
        else
            bagItemCount.style.visibility = 'hidden';
}
function homePageItems()
{
        let itemsContainerElement = document.querySelector('.items_container');
        console.log(itemsContainerElement);
        if(! itemsContainerElement) {
            return;
        }
        let innerhtml = ' ';
        //we try to bring data in generic form or we can say try using js
        // items.forEach here items is the name of your array not ypur file name id your names are same of both remember array name should be used there
        items.forEach(item =>
            {
                    innerhtml+=
                    `     <div class="item_container">
                                                    <img  src=${item.image} class="item_image">
                                                        <div class="ratings">  ${item.ratings.stars} ⭐/ ${item.ratings.reviews}</div>                                        
                                                        <div class="company_name">${item.company}</div>
                                                        <div class="item_name">${item.item_name}</div>
                                                        <div class="price">
                                                                <span class="curr_p">Rs ${item.curr_p}</span>
                                                                <span class="original_p">Rs ${item.original_p}</span>
                                                                <span class="dscnt">(${item.dscnt}% OFF)</span>
                                                        </div>
                                                        <button class="addto" onclick="addtobag(${item.id})">Add To Bag</button>
                                            </div>
        `;
            }
        ) //call the function otheerwise youur UI removes all data 
        itemsContainerElement.innerHTML = innerhtml ;
}


