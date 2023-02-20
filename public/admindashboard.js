
const iterate = document.querySelector(".iterate")

let li;
const options = { method: 'GET' };
fetch('http://localhost:3001/getvaccineusers', options)
  .then(response => response.json())
  .then(response => {
    console.log(response)
    for (var key in response) {
        let x,y,z;
            if(response[key].firstDoze==true){
                x = "Vaccinated"
            }else{
                x = "Not Vaccinated"
            }
            if(response[key].secondDoze){
                y = "Vaccinated"
            }else{
                y = "Not Vaccinated"
            }
            if(response[key].timeSlotSecond){
                z = response[key].timeSlotSecond
            }else{
                z="Not Booked"
            }
          
            iterate.innerHTML+=`<li class="table-row">
            <div class="col col-1" >${response[key].userId}</div>
            <div class="col col-2">${x}</div>
            <div class="col col-3" >${response[key].timeSlotFirst}</div>
            <div class="col col-4" >${y}</div>
            <div class="col col-5" >${z}</div>
          </li>`
      }
      
  })
  .catch(err => console.error(err));