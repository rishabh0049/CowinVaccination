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



function funcc( curr)
{
   
}

var modal = document.getElementById("myModal");
var modal2 = document.getElementById("myModal2");

// Get the button that opens the modal

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
var span2 = document.getElementsByClassName("close2")[0];

// When the user clicks on the button, open the modal

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}
span2.onclick = function() {
  modal2.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function openSlot(curr)
{
  slotHeading.innerHTML = `<h4> Book Your Slot for ${curr} June</h4>`
    modal.style.display = "block";
}
function openDoze(curr)
{
  modal2.style.display = "block";
  if(curr==1){
    let val = "10:00 - 10:30"
    timeSlot.innerHTML = `<h6>Book ${val}</h6>`
    document.getElementById("timeSlot").value =val;
  }
}

