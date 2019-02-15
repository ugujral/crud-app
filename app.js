const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.grocery');
const removeAllItems = document.querySelector('.removeItems');
const recipeGenerator = document.querySelector('.recipe');
let items = [];
let recipes = [
  {
    name: 'pasta',
    ingredients: ['pasta', 'sauce', 'shrimp', 'squash'],
    recipe: ['place in boiling water', 'stir until soft', 'drain out', 'add sauce to pasta and mix', 'add in desired meat or vegetables'] 
  },
  {
    name: 'pizza',
    ingredients: ['dough', 'tomato sauce', 'cheese', 'chicken', 'onion', 'pepperoni'],
    recipe: ['take dough and knead dough into circle', 'apply sauce', 'place toppings', 'cook until lightly brown on the bottom', 'EAT!!']
  }
];
localStorage.setItem('recipes', JSON.stringify(recipes))

//Function that adds groceries to items array above
function addItem(e) {
  e.preventDefault(); // VERY IMPORTANT otherwise page will keep refreshing 
  const text = (this.querySelector('[name=item]')).value; //Name of text box where user inputs items
  const item = {
    text,
    done: false // Sets all items by default to unchecked 
  };

  items.push(item);
  pushToGroceryTag(items, itemsList); //Runs the function to take items and push them into items array
  localStorage.setItem('items', JSON.stringify(items)); //JSON.stringify to take the input object into a string since localStorage is a set of keys and values 
  this.reset(); //Empties input box so user can add new items
};

//Takes items passed and places into a html list 
function pushToGroceryTag(grocery = [], groceryList) { // Important to have empty array to loop over nothing if nothing is passed
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

function recipeMaker() {
  let recipeArray = Object.assign([], recipes);
  let itemsArray = Object.assign([], items);
  for (var i = 0; i < itemsArray.length; i++) {
    for (var j = 0; j < recipeArray.length; j++) {
      if (JSON.stringify(itemsArray[i].text) === JSON.stringify(recipeArray[i].ingredients)) {
        console.log('found')
      }
    }
  }
};

addItems.addEventListener('submit', addItem);
removeAllItems.addEventListener('click', removeAll);
recipeGenerator.addEventListener('click', recipeMaker);

pushToGroceryTag(items, itemsList);