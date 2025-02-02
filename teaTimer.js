class Tea {
    constructor(name, image, timer) {
        this.name = name;
        this.image = image;
        this.timer = timer;
    }
}

class TeaTimer {
    constructor() {
        // Tea objects
        this.teas = [
            new Tea("Black Tea", "black_tea.png", 5), // 5 minutes
            new Tea("Green Tea", "green_tea.png", 3), // 3 minutes
            new Tea("Herbal Tea", "herbal_tea.png", 7), // 7 minutes
        ];
    }

    // Display teas
    displayTeas() {
        const teaContainer = document.getElementById("tea-container");
        teaContainer.innerHTML = ""; // Clear any previous content
        
        // Loop through each tea and display it in a row
        this.teas.forEach(tea => {
            // Create a div for each tea item
            const teaItem = document.createElement("div");
            teaItem.classList.add("tea-item-row");

            // Create the image element
            const teaImage = document.createElement("img");
            teaImage.src = tea.image;
            teaImage.alt = tea.name;
            teaImage.classList.add("tea-image");

            // Add click event to image
            teaImage.addEventListener("click", () => this.teaTimerDisplay(tea));

            // Create a text element
            const teaText = document.createElement("p");
            teaText.textContent = tea.name;

            // Append the image and text to the tea item div
            teaItem.appendChild(teaImage);
            teaItem.appendChild(teaText);

            // Append the tea item to the tea container
            teaContainer.appendChild(teaItem);
        });
    }

    // Display tea name, image, and timer in a column
    teaTimerDisplay(tea) {
        const teaContainer = document.getElementById("tea-container");
        teaContainer.innerHTML = ""; // Clear any previous content
        
        // Create a div for the selected tea
        const teaItem = document.createElement("div");
        teaItem.classList.add("tea-item-column");

        // Create the back arrow 
        const backArrow = document.createElement("img");
        backArrow.src = "arrow.png"; 
        backArrow.alt = "Back";
        backArrow.classList.add("back-arrow");
        backArrow.addEventListener("click", () => location.reload()); // Reload the page when clicked

        // Create the text element for the tea name
        const teaName = document.createElement("h2");
        teaName.textContent = tea.name;

        // Create the image element
        const teaImage = document.createElement("img");
        teaImage.src = tea.image;
        teaImage.alt = tea.name;
        teaImage.classList.add("tea-image");

        // Create the text element for the timer
        const teaTimer = document.createElement("p");
        teaTimer.textContent = `${tea.timer}:00`;

        // Create the start button
        const startButton = document.createElement("button");
        startButton.textContent = "Start";
        startButton.addEventListener("click", () => this.startTeaTimer(tea, startButton, teaItem, teaTimer)); // Start the timer when clicked

        // Append the back arrow, tea name, image, timer, and start button to the tea item div
        teaContainer.appendChild(backArrow);
        teaItem.appendChild(teaName);
        teaItem.appendChild(teaImage);
        teaItem.appendChild(teaTimer);
        teaItem.appendChild(startButton);

        // Append the tea item to the tea container
        teaContainer.appendChild(teaItem);
    }

    // Start the timer for the selected tea
    startTeaTimer(tea, startButton, teaItem, teaTimer) {
            let remainingTime = tea.timer * 60; // Convert minutes to seconds
            const timerInterval = setInterval(() => {
                remainingTime--; // Decrease time by 1 second
                const minutes = Math.floor(remainingTime / 60); 
                const seconds = remainingTime % 60; 

                // Display the remaining time
                const teaTimer = document.querySelector(".tea-item-column p");
                teaTimer.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

                // When the time is up
                if (remainingTime <= 0) {
                    clearInterval(timerInterval); // Stop the timer
                    teaTimer.classList.add("blinking"); // Start blinking effect
                }
            }, 1000); // Update every second

            // Create the cancel button
            const cancelButton = document.createElement("button");
            cancelButton.textContent = "Cancel";
            cancelButton.addEventListener("click", () => {
                clearInterval(timerInterval); // Stop the timer when clicked
                // Reset the time display to the original tea timer value
                teaTimer.textContent = `${tea.timer}:00`;
                teaTimer.classList.remove("blinking"); // Remove the blinking effect
                cancelButton.remove(); // Remove the cancel button
                teaItem.appendChild(startButton); // Add back the start button
            });

            // Remove the start button and append the cancel button
            startButton.remove();
            teaItem.appendChild(cancelButton);
    }
}

// Initialize the TeaTimer class and display the teas when the page loads
const teaTimer = new TeaTimer();
teaTimer.displayTeas();
