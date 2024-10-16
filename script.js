// Selecting elements: 
// const - declaring constant variable ie usernameInput
// document - representing the web page. Provides access to the Document Object Model
// getElementById - looks at the html and fetches the specified ID
// ('save-btn') - this is one of the button IDs we've named in the HTML

const usernameInput = document.getElementById('username');
const saveButton = document.getElementById('save-btn');
const clearButton = document.getElementById('clear-btn');
const displayName = document.getElementById('display-name');

let wave = '\u{1F44B}';
let melt = '\u{1FAE0}';


// Event listeners: JS can listen for user click interactions
// .addEventListener is listening for an event, in this case a user 'click'
// upon the click, there's an arrow function. The function:
// Declares the constant 'username' to be the usernameInput value (what the user typed)
// Sets the username item into the local storage of the browser
// Displays the savedName function defined further below

saveButton.addEventListener('click', () => {
    const username = usernameInput.value;
    localStorage.setItem('username', username);
    displaySavedName();
    getGreet();
});


// We SET the item 'username' to local storage
// We need to GET the item 'username' from local storage to display it
// .getItem goes to the browser's local storage and retrieves what was entered for 'username'
// This value becomes the constant for 'savedName' according to the conditional statements:
// if : if the 'savedName' constant can be retrieved, it gets printed in the innerText of the paragraph
// Recall displayName corresponds to 'id=display-name' from the HTML paragraph
// else : when the page first load it shows the emoji placeholder since there's no savedName yet
// 
function displaySavedName() {
    const savedName = localStorage.getItem('username');
    if (savedName) {
        displayName.innerText = `${getGreet()} ${savedName}`;
    } else {
        displayName.innerText = melt;
    }
}


// This click function removes the item 'username' from local storage
// It also makes the usernameInput value null, so we see the placeholder text of the input box again
// The displayName paragraph inner text is changed to inform the user with a prompt
clearButton.addEventListener('click', () => {
    localStorage.removeItem('username');
    usernameInput.value = '';
    displayName.innerText = 'Name cleared, try another!';
});

// This event listener checks the document when the page is refreshed
// It uses displaySavedName function to check localStorage for the saved username
// Unlike the deferred scripts elsewhere, the DOMContentLoaded event happens right away
document.addEventListener('DOMContentLoaded', displaySavedName);


// greeting by time of day
// We need a function for our greeting, so we first declare a constant for the hour
// 'new Date()' gets us the the current date and time
// '.getHours()' gets us the current hour of the 24/hr day, so 0-23 (midnight to 11pm)
// Other get methods could be getDay, getMinutes etc
// We use let to declare a variable for greet, and define its block's scope
// if it's true the hour constant is less than 12 (noon), greet = morning
// else if - our first condition is false (it's not less than 12), the next condition is if its less than 18 (6pm), green = afternoon
// else - both if and else if are false, hour must be more than 18, evening becomes 18-23
 function getGreet() {
    const hour = new Date().getHours();
    let greet;

    if (hour <12) {
        greet = "\u{2615} Good morning,";
    } else if (hour <18) {
        greet = "\u{1F506} Good afternoon,";
    } else {
        greet = "\u{1F316} Good Evening,";
    }

    return greet;
 }

// learned about ${} template literals being enclosed in backticks rather than single or double quotes
// They display the stored string, but to display a function you need the ()

