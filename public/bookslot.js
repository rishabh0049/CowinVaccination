const daysTag = document.querySelector(".days")
const slotHeading = document.querySelector(".sloth4")
const timeSlot = document.querySelector(".timeSlot")

// getting new date, current year and month
let date = new Date(),
  currYear = date.getFullYear(),
  currMonth = date.getMonth();


const renderCalendar = () => {


  let liTag = "";

  for (let i = 1; i <= 30; i++) { // creating li of all days of current month
    // adding active class to li if the current day, month, and year matched

    liTag += `<li data-toggle="modal" data-target="#exampleModal" onclick = "openSlot(${i})" class="currDate${i}">${i}</li>`;
  }
  daysTag.innerHTML = liTag;
}

renderCalendar();


const options = { method: 'GET' };

fetch('http://localhost:3001/getvaccinedozes', options)
  .then(response => response.json())
  .then(response => {
    let x = response.timeSlotFirst
    if (response.firstDoze) {
      // if(response.timeSlot == "10:00 -10:30"){
        document.getElementById(x).style.color="black" ;
        document.getElementById(x).style.backgroundColor="yellow" ;
      // }
      
      if (response.firstDoze == true) {
        document.getElementById("firstDoze").checked = true;
        // document.getElementById("firstDoze").disabled = true;
      }
      if (response.secondDoze == true) {
        document.getElementById("secondDoze").checked = true;
        // document.getElementById("secondDoze").disabled = true;
      }
    }
    else {
      document.getElementById("secondDoze").disabled = true;
    }

  })
  .catch(err => console.error(err));



var modal = document.getElementById("myModal");
var modal2 = document.getElementById("myModal2");

// Get the button that opens the modal

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
var span2 = document.getElementsByClassName("close2")[0];

// When the user clicks on the button, open the modal

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
}
span2.onclick = function () {
  modal2.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function openSlot(curr) {
  slotHeading.innerHTML = `<h4> Book Your Slot for ${curr} June</h4>`
  modal.style.display = "block";
  
}
function openDoze(curr) {
  
  modal2.style.display = "block";
  if (curr == 1) {
    let val = "10:00 - 10:30"
    timeSlot.innerHTML = `<h6>Book ${val}</h6>`
    document.getElementById("timeSlot").value = val;
  }
  if (curr == 2) {
    let val = "10:30 - 11:00"
    timeSlot.innerHTML = `<h6>Book ${val}</h6>`
    document.getElementById("timeSlot").value = val;
  }
  if (curr == 3) {
    let val = "11:00 - 11:30"
    timeSlot.innerHTML = `<h6>Book ${val}</h6>`
    document.getElementById("timeSlot").value = val;
  }
  if (curr == 4) {
    let val = "11:30 - 12:00"
    timeSlot.innerHTML = `<h6>Book ${val}</h6>`
    document.getElementById("timeSlot").value = val;
  }
  if (curr == 5) {
    let val = "12:00 - 12:30"
    timeSlot.innerHTML = `<h6>Book ${val}</h6>`
    document.getElementById("timeSlot").value = val;
  }
  if (curr == 6) {
    let val = "12:30 - 1:00"
    timeSlot.innerHTML = `<h6>Book ${val}</h6>`
    document.getElementById("timeSlot").value = val;
  }
  if (curr == 7) {
    let val = "1:00 - 1:30"
    timeSlot.innerHTML = `<h6>Book ${val}</h6>`
    document.getElementById("timeSlot").value = val;
  }
  if (curr == 8) {
    let val = "1:30 - 2:00"
    timeSlot.innerHTML = `<h6>Book ${val}</h6>`
    document.getElementById("timeSlot").value = val;
  }
  if (curr == 9) {
    let val = "2:00 - 2:30"
    timeSlot.innerHTML = `<h6>Book ${val}</h6>`
    document.getElementById("timeSlot").value = val;
  }
  if (curr == 10) {
    let val = "2:30 - 3:00"
    timeSlot.innerHTML = `<h6>Book ${val}</h6>`
    document.getElementById("timeSlot").value = val;
  }
  if (curr == 11) {
    let val = "3:00 - 3:30"
    timeSlot.innerHTML = `<h6>Book ${val}</h6>`
    document.getElementById("timeSlot").value = val;
  }
  if (curr == 12) {
    let val = "3:30 - 4:00"
    timeSlot.innerHTML = `<h6>Book ${val}</h6>`
    document.getElementById("timeSlot").value = val;
  }

  if (curr == 13) {
    let val = "4:00 - 4:30"
    timeSlot.innerHTML = `<h6>Book ${val}</h6>`
    document.getElementById("timeSlot").value = val;
  }

  if (curr == 14) {
    let val = "4:30 - 5:30"
    timeSlot.innerHTML = `<h6>Book ${val}</h6>`
    document.getElementById("timeSlot").value = val;
  }
}

