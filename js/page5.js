window.onload = function () {
  if (localStorage.getItem('isLoggedIn') !== 'true') {
    // If not logged in, redirect to login page
    window.location.href = 'log_in.html';
    document.getElementById('welcome-popup').style.display = 'none';
  }

  // Display the welcome popup
  // and blur the background

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

  if (!localStorage.getItem('site2Microbes')) {
    document.getElementById('main-box').style.filter = 'blur(5px)';
    document.getElementById('welcome-popup').style.display = 'block';

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
  else {
    document.getElementById('continueButton').style.filter  = 'none';
    var countDownDate;
    document.getElementById('welcome-popup').style.display === 'block'
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
  }

  // Set the date we're counting down to
  var countDownDate;

  if (localStorage.getItem('countDownDate')) {
    countDownDate = localStorage.getItem('countDownDate');
  } else {
    countDownDate = new Date().getTime() + 30 * 60 * 1000;
  }

  document.getElementById('begin-button').addEventListener('click', function () {
    document.getElementById('welcome-popup').style.display = 'none';
    document.getElementById('continueButton').style.filter  = 'none';
    document.getElementById('main-box').style.filter = 'none';

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
};
// Set the date we're counting down to


const minSlider = document.getElementById('fromSliderRigidity');
const maxSlider = document.getElementById('toSliderRigidity');
const sliderValueMin = document.getElementById('sliderValueMin1');
const sliderValueMax = document.getElementById('sliderValueMax1');

const fixedRange = 2; // Fixed range value
const minSlider1 = document.getElementById('fromSliderMobility');
const maxSlider1 = document.getElementById('toSliderMobility');
const sliderValueMin1 = document.getElementById('sliderValueMin2');
const sliderValueMax1 = document.getElementById('sliderValueMax2');

const fixedRange1 = 2; // Fixed range value
const minSlider2 = document.getElementById('fromSliderSize');
const maxSlider2 = document.getElementById('toSliderSize');
const sliderValueMin2 = document.getElementById('sliderValueMin3');
const sliderValueMax2 = document.getElementById('sliderValueMax3');

const fixedRange2 = 2; // Fixed range values

function updateSliderValues() {
  const minValue = parseInt(minSlider.value);
  const maxValue = parseInt(maxSlider.value);
  // Enforce the maximum value for minSlider2
  if (minValue > 8) {
    minSlider.value = 8;
  }

  // Enforce the minimum value for maxSlider2
  if (maxValue < 3) {
    maxSlider.value = 3;
  }
  // Ensure the fixed range is maintained
  if (this === minSlider) {
    maxSlider.value = minValue + fixedRange;
  } else {
    minSlider.value = maxValue - fixedRange;
  }

  sliderValueMin.textContent = minSlider.value;
  sliderValueMax.textContent = maxSlider.value;

  // Position the value indicators near the thumbs
  const minPercent = ((minSlider.value - minSlider.min) / (minSlider.max - minSlider.min)) * 17.8;
  const maxPercent = ((maxSlider.value - maxSlider.min) / (maxSlider.max - maxSlider.min)) * 17.8;
  // Position the value indicators near the thumbs
  const minPercent4slider = ((minSlider.value - minSlider.min) / (minSlider.max - minSlider.min)) * 100;
  const maxPercent4slider = ((maxSlider.value - maxSlider.min) / (maxSlider.max - maxSlider.min)) * 100;

  sliderValueMin.style.left = `calc(${minPercent}% + 104px)`;
  sliderValueMax.style.left = `calc(${maxPercent}% + 104px)`;

  // Set the background color for the range
  const minTrack = minSlider;
  const maxTrack = maxSlider;
  const sliderRange = minTrack.nextElementSibling;
  sliderRange.style.background = `linear-gradient(to right, #d3d3d3 ${minPercent4slider}%, #000000 ${minPercent4slider}%, #000000 ${maxPercent4slider}%, #d3d3d3 ${maxPercent4slider}%)`;
}
minSlider.addEventListener('input', updateSliderValues);
maxSlider.addEventListener('input', updateSliderValues);

// only if the rigidity-slider checkbox is checked 
document.getElementById('rigidity-slider').addEventListener('change', function () {
  if (this.checked) {

    updateSliderValues();
  }
});
// Initialize the slider values

updateSliderValues();


function updateSliderValues1() {
  const minValue = parseInt(minSlider1.value);
  const maxValue = parseInt(maxSlider1.value);
  // Enforce the maximum value for minSlider2
  if (minValue > 8) {
    minSlider1.value = 8;
  }

  // Enforce the minimum value for maxSlider2
  if (maxValue < 3) {
    maxSlider1.value = 3;
  }
  // Ensure the fixed range is maintained
  if (this === minSlider1) {
    maxSlider1.value = minValue + fixedRange1;
  } else {
    minSlider1.value = maxValue - fixedRange1;
  }

  sliderValueMin1.textContent = minSlider1.value;
  sliderValueMax1.textContent = maxSlider1.value;

  // Position the value indicators near the thumbs
  const minPercent1 = ((minSlider1.value - minSlider1.min) / (minSlider1.max - minSlider1.min)) * 17.8;
  const maxPercent1 = ((maxSlider1.value - maxSlider1.min) / (maxSlider1.max - maxSlider1.min)) * 17.8;
  // Position the value indicators near the thumbs
  const minPercent4slider1 = ((minSlider1.value - minSlider1.min) / (minSlider1.max - minSlider1.min)) * 100;
  const maxPercent4slider1 = ((maxSlider1.value - maxSlider1.min) / (maxSlider1.max - maxSlider1.min)) * 100;

  sliderValueMin1.style.left = `calc(${minPercent1}% + 104px)`;
  sliderValueMax1.style.left = `calc(${maxPercent1}% + 104px)`;

  // Set the background color for the range
  const minTrack = minSlider1;
  const maxTrack = maxSlider1;
  const sliderRange = minTrack.nextElementSibling;
  sliderRange.style.background = `linear-gradient(to right, #d3d3d3 ${minPercent4slider1}%, #000000 ${minPercent4slider1}%, #000000 ${maxPercent4slider1}%, #d3d3d3 ${maxPercent4slider1}%)`;
}

minSlider1.addEventListener('input', updateSliderValues1);
maxSlider1.addEventListener('input', updateSliderValues1);

// Initialize the slider values
updateSliderValues1();



function updateSliderValues2() {
  const minValue = parseInt(minSlider2.value);
  const maxValue = parseInt(maxSlider2.value);


  // Enforce the maximum value for minSlider2
  if (minValue > 8) {
    minSlider2.value = 8;
  }

  // Enforce the minimum value for maxSlider2
  if (maxValue < 3) {
    maxSlider2.value = 3;
  }
  // Ensure the fixed range is maintained
  if (this === minSlider2) {
    maxSlider2.value = minValue + fixedRange2;
  } else {
    minSlider2.value = maxValue - fixedRange2;
  }


  sliderValueMin2.textContent = minSlider2.value;
  sliderValueMax2.textContent = maxSlider2.value;

  // Position the value indicators near the thumbs
  const minPercent2 = ((minSlider2.value - minSlider2.min) / (minSlider2.max - minSlider2.min)) * 17.8;
  const maxPercent2 = ((maxSlider2.value - maxSlider2.min) / (maxSlider2.max - maxSlider2.min)) * 17.8;
  // Position the value indicators near the thumbs
  const minPercent4slider2 = ((minSlider2.value - minSlider2.min) / (minSlider2.max - minSlider2.min)) * 100;
  const maxPercent4slider2 = ((maxSlider2.value - maxSlider2.min) / (maxSlider2.max - maxSlider2.min)) * 100;

  sliderValueMin2.style.left = `calc(${minPercent2}% + 104px)`;
  sliderValueMax2.style.left = `calc(${maxPercent2}% + 104px)`;

  // Set the background color for the range
  const minTrack = minSlider2;
  const maxTrack = maxSlider2;
  const sliderRange = minTrack.nextElementSibling;
  sliderRange.style.background = `linear-gradient(to right, #d3d3d3 ${minPercent4slider2}%, #000000 ${minPercent4slider2}%, #000000 ${maxPercent4slider2}%, #d3d3d3 ${maxPercent4slider2}%)`;
  minSlider2.addEventListener('input', updateSliderValues2);
  maxSlider2.addEventListener('input', updateSliderValues2);
}



// Initialize the slider values
updateSliderValues2();




document.querySelectorAll('.switch input[type="checkbox"]').forEach((checkbox) => {
  checkbox.addEventListener('change', function () {


    // Check if this checkbox is being checked AND if there are already two or more checked
    if (this.checked && document.querySelectorAll('.switch input[type="checkbox"]:checked').length > 2) {
      // Prevent checking this checkbox
      this.checked = false;

    } else {// Get the target sliders from the data-target attribute, split by comma
      const targets = checkbox.getAttribute('data-target');

      // Proceed with the usual slider handling logic if the limit is not exceeded and the attribute is not null
      if (targets !== null) {
        targets.split(',').forEach(targetId => {
          const targetSlider = document.getElementById(targetId.trim());
          if (targetSlider) {
            if (this.checked) {
              targetSlider.classList.remove('show-thumb');
            } else {
              targetSlider.classList.add('show-thumb');
            }
          }
        });
      }
    }
    if (this.checked && document.querySelectorAll('.switch input[type="checkbox"]:checked').length == 2) {
      // Prevent checking this checkbox
      document.getElementById('continueButton').style.backgroundColor = 'rgb(224, 231, 255)';
      document.getElementById('continueButton').style.cursor = 'pointer';
      document.getElementById('continueRef').href = 'page6.html';
      // Disable all other checkboxes
      document.querySelectorAll('.switch input[type="checkbox"]').forEach(otherCheckbox => {
        if (!otherCheckbox.checked) {
          otherCheckbox.disabled = true;
          const slider = otherCheckbox.parentElement.querySelector('.slider');
          if (slider) {
            slider.classList.add('disabled');
          }
        }
      })
    } else {
      document.getElementById('continueButton').style.backgroundColor = 'rgb(224, 231, 255,0.5)';
      document.getElementById('continueButton').style.cursor = 'not-allowed';
      document.getElementById('continueRef').href = '#';
      document.querySelectorAll('.switch input[type="checkbox"]').forEach(otherCheckbox => {
        otherCheckbox.disabled = false;
        const slider = otherCheckbox.parentElement.querySelector('.slider');
        if (slider) {
          slider.classList.remove('disabled');
        }
      });
    }
  });
});

// Initially hide all thumbs
document.querySelectorAll('input[type="range"]').forEach(slider => {
  // slider.style.opacity = '100';
  slider.style.background = '#C6C6C6';
  slider.classList.add('show-thumb');
});

document.querySelectorAll('.slider-value-size').forEach(slider => {
  slider.style.opacity = '0';
}
);

document.querySelectorAll('.slider-value-mobility').forEach(slider => {
  slider.style.opacity = '0';
});

document.querySelectorAll('.slider-value-rigidity').forEach(slider => {
  slider.style.opacity = '0';
});

// for each of the check boxes rigidity, mobility, size if checked than all of the slider-value-checkbox class opacity is 100
// if rigidity check box is checked than all of the slider-value-rigidity class opacity is 100
document.getElementById('size').addEventListener('change', function () {
  if (this.checked) {
    document.querySelectorAll('.slider-value-size').forEach(slider => {
      slider.style.opacity = '100';
      updateSliderValues2();


    });
  } else {
    document.querySelectorAll('.slider-value-size').forEach(slider => {
      slider.style.opacity = '0';
      const minTrack = minSlider2;
      const maxTrack = maxSlider2;
      const sliderRange = minTrack.nextElementSibling;
      sliderRange.style.background = `linear-gradient(to right, #d3d3d3 0%, #000000 0%, #000000 0%, #d3d3d3 0%)`;

    }
    );
  }
});
document.getElementById('Mobility').addEventListener('change', function () {
  if (this.checked) {
    document.querySelectorAll('.slider-value-mobility').forEach(slider => {
      slider.style.opacity = '100';
      updateSliderValues1();
    });
  } else {
    document.querySelectorAll('.slider-value-mobility').forEach(slider => {
      slider.style.opacity = '0';
      const minTrack = minSlider1;
      const maxTrack = maxSlider1;
      const sliderRange = minTrack.nextElementSibling;
      sliderRange.style.background = `linear-gradient(to right, #d3d3d3 0%, #000000 0%, #000000 0%, #d3d3d3 0%)`;
    });
  }
});

document.getElementById('rigidity').addEventListener('change', function () {
  if (this.checked) {
    document.querySelectorAll('.slider-value-rigidity').forEach(slider => {
      slider.style.opacity = '100';
      updateSliderValues();


    });
  } else {
    document.querySelectorAll('.slider-value-rigidity').forEach(slider => {
      slider.style.opacity = '0';
      const minTrack = minSlider;
      const maxTrack = maxSlider;
      const sliderRange = minTrack.nextElementSibling;
      sliderRange.style.background = `linear-gradient(to right, #d3d3d3 0%, #000000 0%, #000000 0%, #d3d3d3 0%)`;
    });
  }
});

document.getElementById('continueButton').addEventListener('click', function () {
  let answersTable = JSON.parse(localStorage.getItem('answersTable')) || { "answers": [] };
  let stepCounter = 1; // Initialize a counter for step numbers

  const checkedCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');

  checkedCheckboxes.forEach(checkbox => {
    let stepName = `Step 1: Characteristics - #${stepCounter++}`;
    let selectedValue = checkbox.id;
    selectedValue = selectedValue[0].toUpperCase() +
      selectedValue.slice(1)

    // Check if the checkbox has data-target attribute
    if (checkbox.dataset.target) {
      const targetIds = checkbox.dataset.target.split(',');
      const fromSliderId = targetIds.find(id => id.startsWith('fromSlider'));
      const toSliderId = targetIds.find(id => id.startsWith('toSlider'));

      if (fromSliderId && toSliderId) {
        const fromSliderValue = document.getElementById(fromSliderId).value;
        const toSliderValue = document.getElementById(toSliderId).value;
        selectedValue += ` ${fromSliderValue}-${toSliderValue}`;
      }
    }

    answersTable.answers.push({
      "Site": "Site 2",
      "Step": stepName,
      "Selected": selectedValue
    });
  });

  localStorage.setItem('answersTable', JSON.stringify(answersTable));

  // ... your code to navigate to the next page
});
