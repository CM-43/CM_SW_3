function legendClick() {
  // Toggle the display of the legend content
  if (getComputedStyle(legendContent, null).display === 'none') {
    legendContent.style.display = 'block'; // Show the legend
    legendClose.style.display = 'none'; // Show the close button
    legendOpen.style.display = 'block'; // Hide the open button
    // Add the "legend_clicked" class to the button
    legendButton.classList.remove('legend');
    legendButton.classList.add('legend_clicked');
  } else {
    legendContent.style.display = 'none'; // Hide the legend
    // Remove the "legend_clicked" class from the button
    legendButton.classList.remove('legend_clicked');
    legendButton.classList.add('legend');
    legendClose.style.display = 'block'; // Show the close button
    legendOpen.style.display = 'none'; // Hide the open button

  }
}


window.onload = function () {
  if (localStorage.getItem('isLoggedIn') !== 'true') {
    // If not logged in, redirect to login page
    window.location.href = 'log_in.html';
  }
  // add event listener to the submit button
  const submitButton = document.getElementById('submit-button');
  submitButton.addEventListener('click', submitFunction);
  // when the submit function is pressed display the popup window
  function submitFunction() {
    // write each h2 header inside the small-boxes into the local storage answers
    // 1. Retrieve or initialize the answers table
    let answersTable = JSON.parse(localStorage.getItem('answersTable')) || { "answers": [] };

    // 2. Get the card names from the <h2> headers
    const cardNames = [];
    const cardContainers = document.querySelectorAll('.small-box'); // Adjust the selector if needed
    cardContainers.forEach(container => {
      const h2Header = container.querySelector('h2');
      if (h2Header) {
        cardNames.push(h2Header.textContent.trim());
      }
    });

    // 3. Add answers for each card to the table
    for (let i = 0; i < cardNames.length; i++) {
      answersTable.answers.push({
        "Site": "Site 3",
        "Step": `Step 4: Submission - #${i + 1}`,
        "Selected": cardNames[i]
      });
    }

    // 4. Update local storage
    localStorage.setItem('answersTable', JSON.stringify(answersTable));

    document.getElementById('main-box').style.filter = 'blur(5px)';
    document.getElementById('submit-popup').style.display = 'block';
    document.getElementById('submit-popup').style.animation = 'fadeIn 0.5s forwards';
    countDownDate = localStorage.getItem('countDownDate');
    // Get today's date and time
    var now = new Date().getTime();
    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    var progressBar = document.querySelector(".progress");
    var totalDuration = 30 * 60 * 1000;
    var progressWidth = ((totalDuration - distance) / totalDuration) * 100;
    progressBar.style.width = `${progressWidth}%`;
    document.querySelector(".timer-text").innerHTML = "Time paused";
    clearInterval(x)
  }


  // Set the date we're counting down to
  var countDownDate;

  if (localStorage.getItem('countDownDate')) {
    countDownDate = localStorage.getItem('countDownDate');
  } else {
    countDownDate = new Date().getTime() + 30 * 60 * 1000;
  }

  // Update the count down every 1 second
  var x = setInterval(function () {

    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for hours, minutes and seconds
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    if (seconds > 30) {
      minutes = minutes + 1;
    }



    // Display the result in the element with id="count_down"
    document.querySelector(".timer-text").innerHTML = `${minutes}` + " min left";
    var progressBar = document.querySelector(".progress");
    var totalDuration = 30 * 60 * 1000;
    var progressWidth = ((totalDuration - distance) / totalDuration) * 100;
    progressBar.style.width = `${progressWidth}%`;
    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(x);
      document.querySelector(".timer-text").innerHTML = "Time's Up";

    } else {
      // Store countdown date to localStorage
      localStorage.setItem('countDownDate', countDownDate);
    }
  }, 1000);
}
document.getElementById('clearStorage').addEventListener('click', function () {
  // Temporarily store isLoggedIn
  var isLoggedIn = localStorage.getItem('isLoggedIn');

  // Clear all items from local storage
  localStorage.clear();

  // Restore isLoggedIn
  localStorage.setItem('isLoggedIn', isLoggedIn);
  // Refresh the page
  window.location.href = "index.html";
});



const microbesColumn = document.getElementById('top-cards-column');
const topCardLeft = document.getElementById('top-card-left');
const topCardRight = document.getElementById('top-card-right');
const topCardCenter = document.getElementById('top-card-center');
const microbeCard = document.getElementById('microbeCard');
const continueButton = document.getElementById('continueButton');


let currentMicrobeIndex = 0;
let buttomCardNumber = 2
let elementTarget = 'top-card-left';
// Get the legend button and the legend content div
const legendButton = document.getElementById('legend');
const legendContent = document.getElementById('legendDiv');
const legendClose = document.getElementById('legend_close');
const legendOpen = document.getElementById('legend_open');
// Add a click event listener to the legend button
legendButton.addEventListener('click', (legendClick))

fetch('site-3-step-3&4.json')
  .then(response => response.json())
  .then(data => {
    const microbeData = data.Sheet1;

    // Function to display a microbe card



    function displayMicrobeCardInitial(index, targetElementId) { // Add targetElementId parameter
      const filterMicrobeData = microbeData.filter(d => d.Category !== "Existing");// leave only the values where category value is not "exsisting"
      const microbe = filterMicrobeData[index]; // get the microbe data



      const microbeCard = document.getElementById(targetElementId); // Use the provided ID


      // Determine the image based on the trait
      let traitImage = '';
      switch (microbe.Trait.toLowerCase()) { // Convert to lowercase for case-insensitive comparison
        case 'aerobic':
          traitImage = './img/aerobic.png';
          break;
        case 'hydrophilic':
          traitImage = './img/hydrophilic.png';
          break;
        case 'pressure resistant':
          traitImage = './img/pressure_risistant.png'; // If you have an image for this
          break;
        case 'heat resistant':
          traitImage = './img/heat_resistance.png'; // If you have an image for this
          break;
        default:
          traitImage = './img/unknown.png'; // Or provide a default image
          break;
      }

      microbeCard.innerHTML = `
                <h2>${microbe.Name}</h2>
                <img src="./img/${microbe.Name}.png" alt="Microbe_image" align="center" style="width:60px;position: relative; height:60px; margin-left:30% ">  <br>

                <div class="card-fieldset">
  <div class="row">
    <div class="column">
      <img src="./img/rigidity.png" alt="Rigidity_sign">
    </div>
    <div class="column">
      <span>Rigidity</span>
    </div>
    <div class="column">
      <span>${microbe.Rigidity}</span>
    </div>
  </div>

  <div class="row">
    <div class="column">
      <img src="./img/mobility.png" alt="Mobility_sign">
    </div>
    <div class="column">
      <span>Mobility</span>
    </div>
    <div class="column">
      <span>${microbe.Mobility}</span>
    </div>
  </div>

  <div class="row">
    <div class="column">
      <img src="./img/size.png" alt="Size_sign">
    </div>
    <div class="column">
      <span>Size</span>
    </div>
    <div class="column">
      <span>${microbe.Size}</span>
    </div>
  </div>

  <div class="row">
    <div class="column">
      <img src=${traitImage} alt=${microbe.Trait}>
    </div>
    <div class="column">
      <span>${microbe.Trait}</span>
    </div> 
  </div>
</div>
                <button class="round-button"  data-index="${index}">+</button>
            `;
      // Get all the buttons with class "round-button"
      const roundButtons = document.querySelectorAll('.round-button');
      // Attach the event listener to each button
      roundButtons.forEach(button => {
        button.addEventListener('click', handleButtonClick);
      });
    }


    function displayMicrobeCardEmpty(index, targetElementId) { // Add targetElementId parameter
      const microbeCard = document.getElementById(targetElementId); // Use the provided ID


      microbeCard.innerHTML = `
                <h2 style="vertical-align: middle; margin-top:70%">Microbe ${index}</h2>

            `;

    }

    function displayMiniMicrobeCardClick(index, targetElementId) { // Add targetElementId parameter

      const microbe = microbeData[index]; // get the microbe data



      const microbeCard = document.getElementById(targetElementId); // Use the provided ID


      // Determine the image based on the trait
      let traitImage = '';
      switch (microbe.Trait.toLowerCase()) { // Convert to lowercase for case-insensitive comparison
        case 'aerobic':
          traitImage = './img/aerobic.png';
          break;
        case 'hydrophilic':
          traitImage = './img/hydrophilic.png';
          break;
        case 'pressure resistant':
          traitImage = './img/pressure_risistant.png'; // If you have an image for this
          break;
        case 'heat resistant':
          traitImage = './img/heat_resistance.png'; // If you have an image for this
          break;
        default:
          traitImage = './img/unknown.png'; // Or provide a default image
          break;
      }


      microbeCard.innerHTML = `
                
                <img src="./img/${microbe.Name}.png" alt="Microbe_image" align="center" style="width:50px;position: relative; height:50px; margin-left:40%; ">  <br>
                <div class="mini-box">
                <span style="margin-left: 5px;margin-top: 5px;margin-bottom:5px; display:inline-block">${microbe.Name}</span>
              <button class="round-button-small"  data-index="${index}" style="display:none">+</button><br>

                <img src="./img/rigidity.png" alt="Rigidity_sign"
                        style="width: 17px; margin-left: 5px; display: inline-flex;position: relative;vertical-align: bottom; mix-blend-mode: multiply;">

                <span>${microbe.Rigidity}</span> 
                <img src="./img/mobility.png" alt="Mobility_sign"
                        style="width: 17px;margin-left: 5px; display: inline-flex;position: relative;vertical-align: bottom;mix-blend-mode: multiply;">
                        
                <span>${microbe.Mobility}</span>
                <img src="./img/size.png" alt="Size_sign"
                        style="width: 17px; ;margin-left: 5px; display: inline-flex;position: relative;vertical-align: bottom;mix-blend-mode: multiply;">
                    
                <span>${microbe.Size}</span> 
                <img src= ${traitImage} alt=${microbe.Trait}
                        style="width: 17px;margin-right:5px;display: inline-flex;position: relative;vertical-align: bottom;mix-blend-mode: multiply;float:right;">
                
                
                </div>
            `;
      // Get all the buttons with class "round-button"
      const roundButtons = document.querySelectorAll('.round-button-small');
      // Attach the event listener to each button
      roundButtons.forEach(button => {
        button.addEventListener('click', handleMiniButtonClick);
      });

    }

    function displayMiniMicrobeCardClickSubstract(index, targetElementId) { // Add targetElementId parameter
      const microbe = microbeData[index]; // get the microbe data



      const microbeCard = document.getElementById(targetElementId); // Use the provided ID


      // Determine the image based on the trait
      let traitImage = '';
      switch (microbe.Trait.toLowerCase()) { // Convert to lowercase for case-insensitive comparison
        case 'aerobic':
          traitImage = './img/aerobic.png';
          break;
        case 'hydrophilic':
          traitImage = './img/hydrophilic.png';
          break;
        case 'pressure resistant':
          traitImage = './img/pressure_risistant.png'; // If you have an image for this
          break;
        case 'heat resistant':
          traitImage = './img/heat_resistance.png'; // If you have an image for this
          break;
        default:
          traitImage = './img/unknown.png'; // Or provide a default image
          break;
      }
      // newIndex = Number(index) + Number(6);

      microbeCard.innerHTML = `
                
                <img src="./img/${microbe.Name}.png" alt="Microbe_image" align="center" style="width:50px;position: relative; height:50px; margin-left:40%; ">  <br>
                <div class="mini-box">
                <span style="margin-left: 5px;margin-top: 5px;margin-bottom:5px; display:inline-block">${microbe.Name}</span>
              <button class="round-button-small"  data-index="${index}" style="display:block">+</button><br>

                <img src="./img/rigidity.png" alt="Rigidity_sign"
                        style="width: 17px; margin-left: 5px; display: inline-flex;position: relative;vertical-align: bottom; mix-blend-mode: multiply;">

                <span>${microbe.Rigidity}</span> 
                <img src="./img/mobility.png" alt="Mobility_sign"
                        style="width: 17px;margin-left: 5px; display: inline-flex;position: relative;vertical-align: bottom;mix-blend-mode: multiply;">
                        
                <span>${microbe.Mobility}</span>
                <img src="./img/size.png" alt="Size_sign"
                        style="width: 17px; ;margin-left: 5px; display: inline-flex;position: relative;vertical-align: bottom;mix-blend-mode: multiply;">
                    
                <span>${microbe.Size}</span> 
                <img src= ${traitImage} alt=${microbe.Trait}
                        style="width: 17px;margin-right:5px;display: inline-flex;position: relative;vertical-align: bottom;mix-blend-mode: multiply;float:right;">
                
                
                </div>
            `;
      // Get all the buttons with class "round-button"
      const roundButtons = document.querySelectorAll('.round-button-small');
      // Attach the event listener to each button
      roundButtons.forEach(button => {
        button.addEventListener('click', handleMiniButtonClick);
      });

    }

    function displayMiniMicrobeCardInitial(index, targetElementId) { // Add targetElementId parameter
      const filterMicrobeData = microbeData.filter(d => d.Category === "Existing");// leave only the values where category value is not "exsisting"
      const microbe = filterMicrobeData[index]; // get the microbe data



      const microbeCard = document.getElementById(targetElementId); // Use the provided ID



      // Determine the image based on the trait
      let traitImage = '';
      switch (microbe.Trait.toLowerCase()) { // Convert to lowercase for case-insensitive comparison
        case 'aerobic':
          traitImage = './img/aerobic.png';
          break;
        case 'hydrophilic':
          traitImage = './img/hydrophilic.png';
          break;
        case 'pressure resistant':
          traitImage = './img/pressure_risistant.png'; // If you have an image for this
          break;
        case 'heat resistant':
          traitImage = './img/heat_resistance.png'; // If you have an image for this
          break;
        default:
          traitImage = './img/unknown.png'; // Or provide a default image
          break;
      }

      microbeCard.innerHTML = `
                
                <img src="./img/${microbe.Name}.png" alt="Microbe_image" align="center" style="width:50px;position: relative; height:50px; margin-left:40%; ">  <br>
                <div class="mini-box">
                <span style="margin-left: 5px;margin-top: 5px;margin-bottom:5px; display:inline-block">${microbe.Name}</span>
                <button class="round-button-small"  data-index="${index}" style="display:none">+</button><br>
\                
                <img src="./img/rigidity.png" alt="Rigidity_sign"
                        style="width: 17px; margin-left: 5px; display: inline-flex;position: sticky;vertical-align: bottom; mix-blend-mode: multiply;">

                <span>${microbe.Rigidity}</span> 
                <img src="./img/mobility.png" alt="Mobility_sign"
                        style="width: 17px;margin-left: 5px; display: inline-flex;position: relative;vertical-align: bottom;mix-blend-mode: multiply;">
                        
                <span>${microbe.Mobility}</span>
                <img src="./img/size.png" alt="Size_sign"
                        style="width: 17px; ;margin-left: 5px; display: inline-flex;position: relative;vertical-align: bottom;mix-blend-mode: multiply;">
                    
                <span>${microbe.Size}</span> 
                <img src= ${traitImage} alt=${microbe.Trait}
                        style="width: 17px;margin-right:5px;display: inline-flex;position: relative;vertical-align: bottom;mix-blend-mode: multiply;float:right;">
                
                
                </div>
            `;
      // Get all the buttons with class "round-button"
      const roundButtons = document.querySelectorAll('.round-button-small');
      // Attach the event listener to each button
      roundButtons.forEach(button => {
        button.addEventListener('click', handleMiniButtonClick);
      });
    }

    function displayMicrobeCardClick(index, targetElementId, source) { // Add targetElementId parameter
      const microbe = microbeData[index]; // get the microbe data



      const microbeCard = document.getElementById(targetElementId); // Use the provided ID


      // Determine the image based on the trait
      let traitImage = '';
      switch (microbe.Trait.toLowerCase()) { // Convert to lowercase for case-insensitive comparison
        case 'aerobic':
          traitImage = './img/aerobic.png';
          break;
        case 'hydrophilic':
          traitImage = './img/hydrophilic.png';
          break;
        case 'pressure resistant':
          traitImage = './img/pressure_risistant.png'; // If you have an image for this
          break;
        case 'heat resistant':
          traitImage = './img/heat_resistance.png'; // If you have an image for this
          break;
        default:
          traitImage = './img/unknown.png'; // Or provide a default image
          break;
      }

      microbeCard.innerHTML = `
                <h2>${microbe.Name}</h2>
                <img src="./img/${microbe.Name}.png" alt="Microbe_image" align="center" style="width:60px;position: relative; height:60px; margin-left:30% ">  <br>

                <div class="card-fieldset">
  <div class="row">
    <div class="column">
      <img src="./img/rigidity.png" alt="Rigidity_sign">
    </div>
    <div class="column">
      <span>Rigidity</span>
    </div>
    <div class="column">
      <span>${microbe.Rigidity}</span>
    </div>
  </div>

  <div class="row">
    <div class="column">
      <img src="./img/mobility.png" alt="Mobility_sign">
    </div>
    <div class="column">
      <span>Mobility</span>
    </div>
    <div class="column">
      <span>${microbe.Mobility}</span>
    </div>
  </div>

  <div class="row">
    <div class="column">
      <img src="./img/size.png" alt="Size_sign">
    </div>
    <div class="column">
      <span>Size</span>
    </div>
    <div class="column">
      <span>${microbe.Size}</span>
    </div>
  </div>

  <div class="row">
    <div class="column">
      <img src=${traitImage} alt=${microbe.Trait}>
    </div>
    <div class="column">
      <span>${microbe.Trait}</span>
    </div> 
  </div>
</div>
                <button class="round-button-substract" data-target="${source}" data-index="${index}">-</button>
            `;
      // Get all the buttons with class "round-button"
      const roundButtons = document.querySelectorAll('.round-button-substract');
      // Attach the event listener to each button
      roundButtons.forEach(button => {
        button.addEventListener('click', handleSubstractButtonClick);
      });


    }


    // // Initial display (first microbe)
    displayMicrobeCardInitial(currentMicrobeIndex, 'top-card-left'); // Display the first microbe card in the left box
    displayMicrobeCardInitial(currentMicrobeIndex + 1, 'top-card-center'); // Display the first microbe card in the microbe1 box
    displayMicrobeCardInitial(currentMicrobeIndex + 2, 'top-card-right'); // Display the first microbe card in the microbe1 box
    displayMiniMicrobeCardInitial(0, 'buttom-card1'); // Display the first microbe card in the microbe1 box
    displayMiniMicrobeCardInitial(1, 'buttom-card6'); // Display the first microbe card in the microbe1 box
    displayMiniMicrobeCardInitial(2, 'buttom-card7'); // Display the first microbe card in the microbe1 box
    displayMiniMicrobeCardInitial(3, 'buttom-card8'); // Display the first microbe card in the microbe1 box
    displayMiniMicrobeCardInitial(4, 'buttom-card9'); // Display the first microbe card in the microbe1 box
    displayMiniMicrobeCardInitial(5, 'buttom-card10'); // Display the first microbe card in the microbe1 box


    let answerCounter = 1;

    // Function to handle button click
    function handleButtonClick(event) {
      // 'event' object contains information about the clicked element
      const clickedButton = event.target;
      const submitButton = document.getElementById('submit-button');
      // Get the data-index value from the clicked button
      const buttonIndex = clickedButton.dataset.index;
      const newButtonIndex = Number(buttonIndex) + Number(6);
      // 1. Retrieve or initialize the answers table
      let answersTable = JSON.parse(localStorage.getItem('answersTable')) || { "answers": [] };


      // 3. Get the card name (assuming you have a way to access it)
      const cardName = microbeData[newButtonIndex].Name; // Replace with your logic to get the card name

      // 4. Add the answer to the table
      answersTable.answers.push({
        "Site": "Site 2",
        "Step": `Step 3: Selection - Set ${answerCounter}`,
        "Selected": cardName
      });
      answerCounter = answerCounter + 1;

      // 5. Update local storage
      localStorage.setItem('answersTable', JSON.stringify(answersTable));

      // Check if currentMicrobeIndex is within bounds
      if (currentMicrobeIndex + 4 < microbeData.filter(d => d.Category !== "Existing").length) {
        // Call your usual function when within bounds
        displayMiniMicrobeCardClick(newButtonIndex, 'buttom-card' + buttomCardNumber);
        displayMicrobeCardInitial(currentMicrobeIndex + 3, 'top-card-left');
        displayMicrobeCardInitial(currentMicrobeIndex + 4, 'top-card-center');
        displayMicrobeCardInitial(currentMicrobeIndex + 5, 'top-card-right');
        currentMicrobeIndex = currentMicrobeIndex + 3;
        buttomCardNumber = buttomCardNumber + 1;
      } else {
        // Call your usual function when within bounds
        displayMiniMicrobeCardClick(newButtonIndex, 'buttom-card' + buttomCardNumber);
        displayMicrobeCardEmpty(1, 'top-card-left');
        displayMicrobeCardEmpty(2, 'top-card-center');
        displayMicrobeCardEmpty(3, 'top-card-right');
        submitButton.style.display = 'block';
        submitButton.disabled = true;
        submitButton.style.backgroundColor = 'rgb(233, 237, 253,0.5);';
        // submitButton.addEventListener('click', submitFunction);

        const smallRoundButtons = document.querySelectorAll('.round-button-small');

        // Iterate over each button and set its display to 'block'
        smallRoundButtons.forEach(button => {
          button.style.display = 'block';
        });
      }
    }


    function handleMiniButtonClick(event) {
      // 'event' object contains information about the clicked element
      const clickedButton = event.target;

      // Get the data-index value from the clicked button
      const buttonIndex = clickedButton.dataset.index;

      // Get the parent div's ID
      const parentDivId = clickedButton.parentNode.parentNode.id;
      // Check if currentMicrobeIndex is within bounds

      // Call your usual function when within bounds if elementTarget is top-card-left
      // if (elementTarget === 'top-card-left') {
      //   displayMicrobeCardClick(buttonIndex, 'top-card-left', parentDivId);
      //   // Clear the innerHTML of the parentDivId element
      //   document.getElementById(parentDivId).innerHTML = '';

      //   elementTarget = 'top-card-center';

      // } else if (elementTarget === 'top-card-center') {
      //   displayMicrobeCardClick(buttonIndex, 'top-card-center', parentDivId);
      //   // Clear the innerHTML of the parentDivId element
      //   document.getElementById(parentDivId).innerHTML = '';
      //   elementTarget = 'top-card-right';
      // } else if (elementTarget === 'top-card-right') {
      //   displayMicrobeCardClick(buttonIndex, 'top-card-right', parentDivId);
      //   // Clear the innerHTML of the parentDivId element
      //   document.getElementById(parentDivId).innerHTML = '';
      //   elementTarget = 'top-card-left';
      // }

      // Call your usual function when within bounds if elementTarget is top-card-left
      if (document.getElementById('top-card-left').innerHTML === `
                <h2 style="vertical-align: middle; margin-top:70%">Microbe 1</h2>

            `) {
        displayMicrobeCardClick(buttonIndex, 'top-card-left', parentDivId);
        // Clear the innerHTML of the parentDivId element
        document.getElementById(parentDivId).innerHTML = '';

        elementTarget = 'top-card-center';

      } else if (document.getElementById('top-card-center').innerHTML === `
                <h2 style="vertical-align: middle; margin-top:70%">Microbe 2</h2>

            `) {
        displayMicrobeCardClick(buttonIndex, 'top-card-center', parentDivId);
        // Clear the innerHTML of the parentDivId element
        document.getElementById(parentDivId).innerHTML = '';
        elementTarget = 'top-card-right';
      } else if (document.getElementById('top-card-right').innerHTML === `
                <h2 style="vertical-align: middle; margin-top:70%">Microbe 3</h2>

            `) {
        displayMicrobeCardClick(buttonIndex, 'top-card-right', parentDivId);
        // Clear the innerHTML of the parentDivId element
        document.getElementById(parentDivId).innerHTML = '';
        elementTarget = 'top-card-left';
        // disable and grey out all the round button small
        ;
      }
      // if all the top cards are filled, display the submit button
      if (document.getElementById('top-card-left').innerHTML !== `
                <h2 style="vertical-align: middle; margin-top:70%">Microbe 1</h2>

            ` && document.getElementById('top-card-center').innerHTML !== `
                <h2 style="vertical-align: middle; margin-top:70%">Microbe 2</h2>

            ` && document.getElementById('top-card-right').innerHTML !== `
                <h2 style="vertical-align: middle; margin-top:70%">Microbe 3</h2>

            `) {
        const smallRoundButtons = document.querySelectorAll('.round-button-small');
        // for each smallroundbutton, disable it
        smallRoundButtons.forEach(button => {
          button.disabled = true;
          button.style.backgroundColor = 'grey';
        })
        const submitButton = document.getElementById('submit-button');
        submitButton.disabled = false;
        submitButton.style.backgroundColor = 'rgb(233, 237, 253);';
      }






    }


    function handleSubstractButtonClick(event) {
      // 'event' object contains information about the clicked element
      const clickedButton = event.target;

      // Get the data-index value from the clicked button
      const buttonIndex = clickedButton.dataset.index;
      const target = clickedButton.dataset.target;
      // Get the parent div's ID
      const parentDivId = clickedButton.parentNode.id;
      if (parentDivId === 'top-card-left') {
        displayMicrobeCardEmpty(1, parentDivId);
      }
      else if (parentDivId === 'top-card-center') {
        displayMicrobeCardEmpty(2, parentDivId);
      }
      else if (parentDivId === 'top-card-right') {
        displayMicrobeCardEmpty(3, parentDivId);
      }
      displayMiniMicrobeCardClickSubstract(buttonIndex, target);
      // Check if currentMicrobeIndex is within bounds
      elementTarget = parentDivId
      const smallRoundButtons = document.querySelectorAll('.round-button-small');
      // for each smallroundbutton, disable it
      smallRoundButtons.forEach(button => {
        button.disabled = false;
        button.style.backgroundColor = 'black';
      })
      const submitButton = document.getElementById('submit-button');
      submitButton.disabled = true;
      submitButton.style.backgroundColor = 'rgb(233, 237, 253,0.5);';






    }

  });










