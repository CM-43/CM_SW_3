window.onload = function () {
  if (localStorage.getItem('isLoggedIn') !== 'true') {
    // If not logged in, redirect to login page
    window.location.href = 'log_in.html';
    // if local storage does not contain  site2Microbes move to page 5

  }
  document.getElementById('main-box').style.filter = 'blur(5px)';
  if (!localStorage.getItem('site3Microbes')) {
    window.location.href = 'page9.html';
  }
  if (document.getElementById('welcome-popup').style.display === 'block') {
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
  }





}

document.getElementById('begin-button').addEventListener('click', function () {
  document.getElementById('welcome-popup').style.display = 'none';
  document.getElementById('main-box').style.filter = 'none';
  document.getElementById('continueButton').style.filter = 'none';

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

    // round the minutes up if seconds is greater than 30
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
})



  ;
// if welcome-pop display is block than timer text is paused and the timer pauses






const microbesColumn = document.getElementById('microbe-column');
const microbe1 = document.getElementById('microbe1');
const microbeCard = document.getElementById('microbeCard');
const continueButton = document.getElementById('continueButton');


let currentMicrobeIndex = 0;

fetch('site-3-step-2.json')
  .then(response => response.json())
  .then(data => {
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
    // const microbeData = data.Sheet1;
    const microbeData = JSON.parse(localStorage.getItem('site3Microbes')) || [];
    // microbes-counter is equal to microbeData length
    document.getElementById('microbes-counter').textContent = microbeData.length;
    // Function to display a microbe card

    function displayMicrobeCard(index, targetElementId) { // Add targetElementId parameter
      const microbe = microbeData[index];
      const microbeCard = document.getElementById('microbe1'); // Use the provided ID
      // create a new div element
      const minimizedCard = document.createElement("div");

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

      // Add the minimized card to the target box
      minimizedCard.innerHTML = `
      <img src="./img/${microbe.Name}.png" alt="Microbe_image" align="center" style="width:40px;position: relative; height:30 px; ">  
      <span>${microbe.Name}</span>
      <i class="arrow down"></i>
      <div class="hidden-content">
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
          <div class="column"></div>
        </div>
      </div>
    `;
      // Add a class to the minimized card
      minimizedCard.classList.add('minimized_card');
      //check if the last card i the tragetbox hidden content is displayed
      const lastCard = document.getElementById(targetElementId).lastElementChild;
      const lastCardHiddenContent = lastCard.querySelector('.hidden-content');
      // if lastCard is not null
      if (lastCardHiddenContent === null) { }
      else {
        if (getComputedStyle(lastCardHiddenContent, null).display === 'block') {
          minimizedCard.style.marginTop = (lastCardHiddenContent.offsetHeight + 10) + 'px';
        }
      }
      // append the minimized card to the targetElementId 
      document.getElementById(targetElementId).appendChild(minimizedCard);
      // Attach event listener AFTER the card is created and content is set
      minimizedCard.addEventListener('click', () => {
        const hiddenContent = minimizedCard.querySelector('.hidden-content');
        const targetBox = document.getElementById(targetElementId); // Get the target box
        const arrow = minimizedCard.querySelector('.down');
        // Check if hidden content is being revealed
        if (getComputedStyle(hiddenContent, null).display === 'none') {
          hiddenContent.style.display = 'block';
          arrow.style.transform = 'rotate(225deg)';


          // Adjust position of the NEXT card in the same box
          const nextCard = minimizedCard.nextElementSibling; // Get the next card directly
          if (nextCard) {
            nextCard.style.marginTop = (hiddenContent.offsetHeight + 10) + 'px';
          }
        } else {
          arrow.style.transform = 'rotate(45deg)';
          hiddenContent.style.display = 'none';

          // Reset margin of the NEXT card
          const nextCard = minimizedCard.nextElementSibling;
          if (nextCard) {
            nextCard.style.marginTop = '0px';
          }
        }
      });


    }


    function displayMicrobeCardInitial(index) { // Add targetElementId parameter
      const microbe = microbeData[index];
      const microbeCard = document.getElementById('microbe1'); // Use the provided ID
      // create a new div element
      const minimizedCard = document.createElement("div");

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
                <img src="./img/${microbe.Name}.png" alt="Microbe_image" align="center" style="width:100px;position: relative; height:100px; margin-left:30px ">  
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
    <div class="column"></div> 
  </div>
</div>
            `;

    }

    // add an event listener to the choose site input
    const chooseSite = document.querySelectorAll('input[name="choose_site"]');
    chooseSite.forEach((radio) => {
      radio.addEventListener('change', () => {
        // if the radio button is checked then the continue button should be enabled
        if (radio.checked) {
          document.getElementById('continueButton').style.backgroundColor = 'rgb(224, 231, 255)';
          document.getElementById('continueButton').style.cursor = 'pointer';
        }
      })
    });

    // // Initial display (first microbe)
    displayMicrobeCardInitial(currentMicrobeIndex);
    let counter = 0;
    // Continue button event listener
    continueButton.addEventListener('click', () => {
      const selectedSite = document.querySelector('input[name="choose_site"]:checked');
      // if selectedsite checked is false then the contiue button should be greyed out


      if (selectedSite) {
        counter = counter + 1
        // 1. Retrieve or initialize the answers table
        let answersTable = JSON.parse(localStorage.getItem('answersTable')) || { "answers": [] };

        // 2. Get the selected radio button label text

        const selectedSiteLabel = selectedSite.parentNode.textContent.trim(); // Assuming the label is the parent element's text content


        // 3. Get the card name (assuming you have a way to access it)
        const cardName = microbeData[currentMicrobeIndex].Name; // Replace with your logic to get the card name

        // 4. Add the answer to the table
        answersTable.answers.push({
          "Site": "Site 3",
          "Step": `Confirmation - ${cardName}`,
          "Selected": selectedSiteLabel
        });

        // 5. Update local storage
        localStorage.setItem('answersTable', JSON.stringify(answersTable));

        document.getElementById('continueButton').style.backgroundColor = 'rgb(224, 231, 255, 0.5)';
        document.getElementById('continueButton').style.cursor = '';
        const targetColumn = document.getElementById(`${selectedSite.value}-column`);
        const targetBox = targetColumn.querySelector('.small-box'); // Get the inner box

        // Display the next card directly in the target box
        displayMicrobeCard(currentMicrobeIndex, targetBox.id); // Pass targetBox.id as the second argument

        currentMicrobeIndex = (currentMicrobeIndex + 1) % microbeData.length;
        displayMicrobeCardInitial(currentMicrobeIndex); // Display the next card in the original microbe1 box


        // Counter Updates:
        const microbesCounter = document.getElementById('microbes-counter');
        const siteCounter = document.getElementById(`${selectedSite.value}-counter`);

        // Ensure counters exist and have numeric values
        if (microbesCounter && siteCounter) {
          let microbesCount = parseInt(microbesCounter.textContent);
          let siteCount = parseInt(siteCounter.textContent);

          if (!isNaN(microbesCount) && !isNaN(siteCount)) {
            microbesCounter.textContent = microbesCount - 1;
            siteCounter.textContent = siteCount + 1;
          }
        }

        // Reset radio button selection
        selectedSite.checked = false;
      } else {

      }
      const microbesCounter = parseInt(document.getElementById('microbes-counter').textContent);

      if (microbesCounter === 0) {
        /// continue button should switch to complete button
        document.getElementById('continueButton').style.display = 'none';
        document.getElementById('completeButton').style.display = 'block';
        document.getElementById('microbe1').style.display = 'none';
        document.getElementById('radio_check').style.display = 'none';

      }
      // Function to save microbes to local storage
      // Function to save the innerHTML of the columns to local storage
      function saveColumnContentToLocalStorage() {
        const rejectColumnContent = document.getElementById('reject-column').innerHTML;
        const site3ColumnContent = document.getElementById('site3-column').innerHTML;

        localStorage.setItem('reject3-column-content', rejectColumnContent);
        localStorage.setItem('site3-column-content', site3ColumnContent);

      }
      const completeButton = document.getElementById('completeButton');
      completeButton.addEventListener('click', saveColumnContentToLocalStorage)
    }
    );



  });

// const expandableCard = document.querySelector('.small-box');
// const hiddenContent = expandableCard.querySelector('.hidden-content');

