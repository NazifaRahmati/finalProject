let list = [];


let storageList = localStorage.getItem("list"); 
if (storageList) {
    list = JSON.parse(storageList);
    for (let i = 0;  i < list.length; i++) {
        let currentItem = list[i];

        let color = "";
        if( currentItem.category === 'fruit') {
            color = 'bg-purple-300';
        }
        else if(currentItem.category === 'dairy') {
            color = 'bg-blue-200'
        }
        else if(currentItem.category === 'grain') {
            color = 'bg-green-100'
        }

        //stringTemplate
        let htmlString = `
        <li class="border-b border-gray-200 border-solid py-2.5">
        <span>➡</span>
                ${currentItem.name}
                <span class="rounded-full text-md  px-3 text-grey-600 py-1 ${color}">${currentItem.category}</span>
            </li>
        `;

        //addHTMLStringTparent
        document.querySelector("#list-items").innerHTML += htmlString;

    }
}

document.querySelector("#list-form").addEventListener("submit", function(event) {
    event.preventDefault();
    add();
});

document.querySelector("#list-items").addEventListener("click", function(e) {
    if (e.target.tagName === "SPAN") {
        console.log("clicked on Item");
        let listItem = e.target.parentNode;

        //deleteItem
        let children = listItem.parentNode.children;
        let childrenArray = Array.from(children);
        let index = childrenArray.indexOf(listItem);
        list.splice(index, 1);
        let jsonString = JSON.stringify(list);
        localStorage.setItem("list", jsonString);
        listItem.remove();
    
    }
});
function isValidated() {
    let isValid = false;
    let item = document.querySelector("#item-input").value.trim();
    let category = document.querySelector("#category-dropdown").value.trim();

    if (item.length <= 0 && category.length <= 0) {
        document.querySelector("#item-input").classList.add("border-pink-600");
        document.querySelector("#category-dropdown").classList.add("border-pink-600");
    } else if (item.length <= 0) {
        document.querySelector("#item-input").classList.add("border-pink-600");
        document.querySelector("#category-dropdown").classList.remove("border-pink-600");
    } else if (category.length <= 0) {
        document.querySelector("#category-dropdown").classList.add("border-pink-600");
        document.querySelector("#item-input").classList.remove("border-pink-600");
    } else {
        document.querySelector("#item-input").classList.remove("border-pink-600");
        document.querySelector("#category-dropdown").classList.remove("border-pink-600");
        isValid = true;
    }
    return isValid;
}

function add() {
    if (isValidated()) {
        let item = document.querySelector("#item-input").value.trim();
        let category = document.querySelector("#category-dropdown").value.trim();
        let color = "";

        if (category === 'fruit') {
            color = 'bg-purple-300';
        } else if (category === 'dairy') {
            color = 'bg-blue-200';
        } else if (category === 'grain') {
            color = 'bg-green-100';
        }

        let newItem = {
            name: item,
            category: category,
        };

        list.push(newItem);

        let jsonString = JSON.stringify(list);

        localStorage.setItem("list", jsonString);

        let htmlString = `
        <li class="border-b border-gray-200 border-solid py-2.5">
        <span>➡</span>
            ${item}
            <span class="rounded-full text-md  px-3 text-grey-600 py-1 ${color}">${category}</span>
        </li>
        `;

        document.querySelector("#list-items").innerHTML += htmlString;

        document.querySelector("#item-input").value = "";
        document.querySelector("#category-dropdown").value = "";
    } else {
        console.log("Your Input is invalid");
    }
}