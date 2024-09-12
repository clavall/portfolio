// Function to open the popup
function openPopup() {
    document.getElementById("overlay").style.display = "block";
    document.getElementById("inputsPopup").style.display = "flex";
    document.getElementById("popupInput").value = '';
   
}

// Function to close the popup
function closePopup() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("inputsPopup").style.display = "none";
}

// Function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Function to handle the submit action
function submitText() {
    var inputText = document.getElementById("popupInput").value;
    var parsedText = inputText.split(',').map(item => item.trim());
    shuffleArray(parsedText);

    // Get all existing grid items
    var gridItems = document.querySelectorAll("#bingoBoard .bingo-square");

    // Update the text content of each grid item
    gridItems.forEach(function(gridItem, index) {
        if (index < parsedText.length) {
            gridItem.textContent = parsedText[index];
        } else {
            gridItem.textContent = ''; // Clear extra grid items
        }
    });

    closePopup(); // Close the popup after submitting
}

// Function to load tile states from localStorage
function loadSquareStates() {
    const squares = document.querySelectorAll('.bingo-square');
    squares.forEach(square => {
        const squareId = square.id;
        const storedColor = localStorage.getItem(squareId);
        if (storedColor) {
            square.style.backgroundColor = storedColor;
        }
    });
}

// Function to save tile state to localStorage
function saveSquareState(square) {
    const squareId = square.id;
    const squareColor = square.style.backgroundColor;
    localStorage.setItem(squareId, squareColor);
}

// Initialize tiles and add click event listeners
document.addEventListener('DOMContentLoaded', () => {
    loadSquareStates();
    
    const squares = document.querySelectorAll('.bingo-square');
    squares.forEach(square => {
        square.addEventListener('click', function() {
            this.style.backgroundColor = '#B3B0AA';
            saveSquareState(this);
        });
    });
});


// const squares = document.querySelectorAll('.bingo-square');

// // Add click event listener to each square
// squares.forEach(square => {
//     square.addEventListener('click', function() {
//         // Change the background color of the clicked tile to blue
//         this.style.backgroundColor = '#B3B0AA';
//     });
// });