const CONVENIENCE_FEES = 99;
let bagItemObj;
onLoad();

function onLoad(){
    loadBagItems();
    dislayBagItems();
    displayBagSummary();
}

function displayBagSummary()
{
        let bgSummry = document.querySelector('.bag-summary');
        let totalItems = bagItemObj.length;
        let totalMRP =  0;
        let totalDscnt = 0;

        bagItemObj.forEach(bagItem => {
                totalMRP+= bagItem.original_p;
                totalDscnt+= bagItem.original_p-bagItem.curr_p;

        })

        let finalPayment = totalMRP-totalDscnt+CONVENIENCE_FEES;
        bgSummry.innerHTML = `
                        <div class="bag-details-container">
                        <div class="price-header">PRICE DETAILS (${totalItems} Items) </div>
                        <div class="price-item">
                        <span class="price-item-tag">Total MRP</span>
                        <span class="price-item-value">Rs${totalMRP}</span>
                        </div>
                        <div class="price-item">
                        <span class="price-item-tag">Discount on MRP</span>
                        <span class="price-item-value priceDetail-base-discount">-Rs${totalDscnt}</span>
                        </div>
                        <div class="price-item">
                        <span class="price-item-tag">Convenience Fee</span>
                        <span class="price-item-value">Rs 99</span>
                        </div>
                        <hr>
                        <div class="price-footer">
                        <span class="price-item-tag">Total Amount</span>
                        <span class="price-item-value">Rs ${finalPayment}</span>
                        </div>
                    </div>
                    <button class="btn-place-order">
                        <div class="css-xjhrni">PLACE ORDER</div>
                    </button>
        `;
}

function loadBagItems()
{
        console.log(bagItems);
        bagItemObj = bagItems.map(itemId => {
            for(let i = 0 ; i<items.length ; i++)
            {
                    if(itemId == items[i].id)
                    {
                            return items[i];
                    }
            }
        });
        console.log(bagItemObj);
}
function dislayBagItems()
{
    let bagElement = document.querySelector('.bag-items-container');
    let innerhtml = ' ';
    bagItemObj.forEach(bagItem => {
            innerhtml+= generateItemHTML(bagItem);
    });
    bagElement.innerHTML =  innerhtml;
}

function removefromBag(itemID)
{
        bagItems = bagItems.filter(bagItemId => bagItemId != itemID);
        localStorage.setItem('bagItems' , JSON.stringify(bagItems));
        loadBagItems();
        displayBagIcon();
        dislayBagItems();
        displayBagSummary();
}

function generateItemHTML(item)
{
        return `<div class="bag-items-container">
                        <div class="item-left-part">
                        <img class="bag-item-img" src="${item.image}">
                        </div>
                        <div class="item-right-part">
                        <div class="company">${item.company}</div>
                        <div class="item-name">${item.item_name}</div>
                        <div class="price-container">
                            <span class="current-p">${item.curr_p}</span>
                            <span class="original-p"> ${item.original_p}</span>
                            <span class="dscnt">(${item.dscnt}% OFF)</span>
                        </div>
                        <div class="return-period">
                            <span class="return-period-days">14 days</span> return available
                        </div>
                        <div class="delivery-details"> 
                            Delivery by
                            <span class="delivery-details-days">10 October 2023</span>
                        </div>
                        </div>

                        <div class="remove-from-cart" onclick = "removefromBag(${item.id})">X</div>
                    </div>`
}

