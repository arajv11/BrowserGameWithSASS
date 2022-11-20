// create variables for the current round, maximum round number, total points, and high score
let currentRound = 1
let totalRounds = 5
let totalPoints = 0
let currentHighScore = 0

// store the player's answers to questions(how many red, blue, circles, triangles)
let userEnteredRed = 0
let userEnteredBlue = 0
let userEnteredCircle = 0
let userEnteredTriangle = 0

// store the game area as a variable
let gameArea = document.getElementById("game-area")

// event listener for the function that runs the game
let start = document.getElementById("start")
start.addEventListener("click", showImage);

// function that runs until the game is finished
function showImage() {
    
    gameArea.classList.remove("question-and-answer")
    // Display current round and score
    let round = document.getElementById("round")
    let score = document.getElementById("score")
    round.innerHTML = `Round<br>${currentRound}/${totalRounds}`
    score.innerHTML = `Score<br>${totalPoints}`
    // Remove start button after starting the game
    if (currentRound == 1) {
        let start = document.getElementById("start")
        start.remove()
    }

    // arrays of possible colors and shapes
    let colors = ["red", "blue"]
    let shapes = ["circle", "triangle"]
    // store the correct answers to questions(how many red, blue, circles, triangles)
    // will be increased as shapes are displayed
    let actualRed = 0
    let actualBlue = 0
    let actualCircle = 0
    let actualTriangle = 0
    gameArea.innerHTML = ""
    
    // Select a random number of images to display
    let numberofImages = Math.ceil( Math.random() * 5 ) + (currentRound*5)
    // Iterate through each image
    for (let i = 1; i <= numberofImages; i++) {
        // Select a random color for the image
        let color = colors[Math.floor( Math.random() * colors.length )]
        // Create a new image(randomly select circle or triangle)
        let image = document.createElement("div")
        image.classList.add(shapes[Math.floor( Math.random() * shapes.length )])
        // increase actualRed, actualBlue, actualCircle, actualTriangle (from lines 39-42)
        switch (color) {
            case "red":
                actualRed++;
                break;
            case "blue":
                actualBlue++;
                break;
        }
        // Add color from earlier to shape
        if (image.classList.contains("circle")) {
            image.style.background = color
            actualCircle++
        } else {
            image.style.borderBottomColor = color
            actualTriangle++
        }
        // Add image to the game
        gameArea.append(image)
    }

    // Code above displays shapes in game area
    // Code below removes shapes after waiting some time and asks the player questions
    // Run the showQuestions function after waiting(time affected by round number)
    if (currentRound <= 2) {
        setTimeout(function () {
            showQuestions()
        }, 6000)
    } else if (currentRound <= 4) {
        setTimeout(function () {
            showQuestions()
        }, 9000)
    } else {
        setTimeout(function () {
            showQuestions()
        }, 12000)
    }

    function showQuestions() {
        // Select all circles and triangles so they can be removed
        let circleList = document.getElementsByClassName("circle")
        let triangleList = document.getElementsByClassName("triangle")
        while (circleList.length > 0) {
            circleList[circleList[0].remove()]
        }
        while (triangleList.length > 0) {
            triangleList[triangleList[0].remove()]
        }

        // Add this class so questions can be displayed in game area
        gameArea.classList.add("question-and-answer")

        // Add questions and input boxes to answer
        // Assign id to input boxes
        let titleRed = document.createElement("span");
        titleRed.innerHTML = `<br>How many red?`;
        let inputRed = document.createElement("input");
        inputRed.setAttribute("id", "red");
        gameArea.append(titleRed, inputRed);

        let titleBlue = document.createElement("span");
        titleBlue.innerHTML = `<br>How many blue?`;
        let inputBlue = document.createElement("input");        
        inputBlue.setAttribute("id", "blue");
        gameArea.append(titleBlue, inputBlue);

        let titleCircle = document.createElement("span");
        titleCircle.innerHTML = `<br>How many circles?`;
        let inputCircle = document.createElement("input");
        inputCircle.setAttribute("id", "circle");
        gameArea.append(titleCircle, inputCircle);

        let titleTriangle = document.createElement("span");
        titleTriangle.innerHTML = `<br>How many triangles?`;
        let inputTriangle = document.createElement("input");        
        inputTriangle.setAttribute("id", "triangle");
        gameArea.append(titleTriangle, inputTriangle);

        // Add a submit button
        let submit = document.createElement("button");
        submit.classList.add("game-button");
        submit.textContent = "Submit";
        gameArea.innerHTML += "<br><br>"      
        gameArea.append(submit);
    
        // Add an event listener to the submit button
        // Will call checkAnswers function
        submit.addEventListener("click", checkAnswers);
    }

    // Check how many questions answered correctly
    // Add points to the player's score
    // Check if there are any rounds left
    function checkAnswers() {

        // Get the input id from each input box above
        const inputs = [...document.querySelectorAll('input')]
        // Check each input id
        inputs.forEach(input => {
            // The userEntered variables are defined at the top of the code
            // Set userEntered variables to the player's inputs
            if (input.getAttribute("id") == "red") {
                userEnteredRed = input.value
            } else if (input.getAttribute("id") == "blue") {
                userEnteredBlue = input.value
            } else if (input.getAttribute("id") == "circle") {
                userEnteredCircle = input.value
            } else {
                userEnteredTriangle = input.value
            }
        })

        let currentRoundPoints = 0;

        // number of points earned = number of correct answers times the round number.
        if (userEnteredRed == String(actualRed)) {
            currentRoundPoints += currentRound
        }
        if (userEnteredBlue == String(actualBlue)) {
            currentRoundPoints += currentRound
        }
        if (userEnteredCircle == String(actualCircle)) {
            currentRoundPoints += currentRound
        }
        if (userEnteredTriangle == String(actualTriangle)) {
            currentRoundPoints += currentRound
        }

        // totalPoints is defined on line 3
        totalPoints += currentRoundPoints
        // increase the score
        score.innerHTML = `Score<br>${totalPoints}`
        gameArea.classList.remove("question-and-answer")
        
        // If not on the final round, tell the player their score for the current round
        // Show the button to start the next round
        if (currentRound < totalRounds) {
            gameArea.innerHTML = `<br>You scored ${currentRoundPoints} out of ${currentRound*4} points <br> in this round<br>`;
            // increase the current round by 1
            currentRound++
            // add a button for the next round
            let nextRoundButton = document.createElement("button");
            nextRoundButton.classList.add("game-button");
            nextRoundButton.textContent = "Next Round";
            gameArea.append(nextRoundButton);
            gameArea.classList.add("question-and-answer")
            // add an event listener for the next round button
            // this runs the showImage function again for the next round
            nextRoundButton.addEventListener("click", showImage);
        } 
        // If on the final round, tell the player their score for the current round
        // Tell the final score and (if higher than the high score) set the high score to the final score
        // Create a "Start" button at the top of the page to play again
        else {
            gameArea.innerHTML = `<br>You scored ${currentRoundPoints} out of ${currentRound*4} points <br> in this round<br>
            <br><br>Congrats! Your final score is ${totalPoints}<br> To play again, click the "Start" button above`
            // If the final score is higher than the current high score, change the high score
            let highScoreArea = document.getElementById("high-score");
            if (totalPoints > currentHighScore) {
                currentHighScore = totalPoints
                highScoreArea.innerHTML = `High score<br>${currentHighScore}/60`
            }
            // set the current round, maximum round number, and total points to 0 for the next game
            currentRound = 1
            totalRounds = 5
            totalPoints = 0

            // add a start button at the top of the page
            let start = document.createElement("button");
            start.setAttribute("id", "start");
            start.classList.add("game-button")
            start.textContent = "Start";
            let topButtons = document.getElementById("top-buttons")
            topButtons.append(start)
            gameArea.classList.add("question-and-answer")
            // call the function showImage to restart the game
            start.addEventListener("click", showImage);
        }
    }
}