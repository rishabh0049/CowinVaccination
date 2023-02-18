const daysTag = document.querySelector(".days")
const slotHeading = document.querySelector(".sloth4")

// getting new date, current year and month
let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();


const renderCalendar = () => {
    
    
    let liTag = "";
    
    for (let i = 1; i <= 30; i++) { // creating li of all days of current month
        // adding active class to li if the current day, month, and year matched
        
        liTag += `<li data-toggle="modal" data-target="#exampleModal" onclick = "funcc(${i})" class="currDate${i}">${i}</li>`;
    }
    daysTag.innerHTML = liTag;
}

renderCalendar();



function funcc( curr)
{
    slotHeading.innerHTML = `<h4> Book Your Slot for ${curr} June</h4>`
}

