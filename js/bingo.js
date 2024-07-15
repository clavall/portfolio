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