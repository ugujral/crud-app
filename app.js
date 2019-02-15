const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.grocery');
const removeAllItems = document.querySelector('.removeItems');
const recipeGenerator = document.querySelector('.recipe');
let items = [];

//Function that adds groceries to items array above
function addItem(e) {
  e.preventDefault(); // VERY IMPORTANT otherwise page will keep refreshing 
  const text = (this.querySelector('[name=item]')).value; //Name of text box where user inputs items
  const item = {
    text,
    done: false // Sets all items by default to unchecked 
  };

  items.push(item);
  pushtoGroceryTag(items, itemsList); //Runs the function to take items and push them into items array
  localStorage.setItem('items', JSON.stringify(items)); //JSON.stringify to take the input object into a string since localStorage is a set of keys and values 
  this.reset(); //Empties input box so user can add new items
};

//Takes items passed and places into a html list 
function pushtoGroceryTag(grocery = [], groceryList) { // Important to have empty array to loop over nothing if nothing is passed
  groceryList.innerHTML = grocery.map((grocery, i) => {
    return `
      <li>
        <input type="checkbox" data-index=${i} id="item${i}" ${grocery.done ? 'checked' : ''} />
        <label for="item${i}">${grocery.text}</label>
      </li>
    `;
  }).join('');
};

//Removes all items from list container
function removeAll() {
  localStorage.clear();
  items = [];
  document.location.reload()
};

addItems.addEventListener('submit', addItem);
removeAllItems.addEventListener('click', removeAll);

pushtoGroceryTag(items, itemsList);