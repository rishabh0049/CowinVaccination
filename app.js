var express = require("express");
var bodyParser = require("body-parser");

const mongoose = require("mongoose");

const { defaultMaxListeners } = require("events");
const { ftruncateSync } = require("fs");
mongoose.connect("mongodb://localhost:27017/cowinvaccination");
var db = mongoose.connection;
db.on("error", console.log.bind(console, "connection error"));
db.once("open", function (callback) {
  console.log("connection succeeded");
});

if(typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}



var app = express();

let userId;

app.use(bodyParser.json());
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.post("/sign_up", function (req, res) {
  var name = req.body.name;
  var age = req.body.age;
  var pincode = req.body.pincode;
  var pass = req.body.password;
  var aadhar = req.body.aadhar;
  var phone = req.body.phone;

  var data = {
    name: name,
    age: age,
    pincode: pincode,
    aadhar: aadhar,
    password: pass,
    phone: phone,
  };
  db.collection("users").insertOne(data, function (err, collection) {
    if (err) throw err;
    console.log("Record inserted Successfully");
  });

  return res.redirect("login.html");
});

app.post("/bookslot", function (req, res) {
  console.log(req.body);
  var firstDoze = req.body.firstDoze;
  var secondDoze = req.body.secondDoze;
  var timeSlot = req.body.timeSlot;
  timeSlot = timeSlot.split(" ").join("")
  let first, second;
  if (firstDoze == "on") {
    first = true;
  } else {
    first = false;
  }
  if (secondDoze == "on") {
    second = true;
  } else {
    second = false;
  }

  // if(first==true){
  userId = localStorage.getItem('user')
  db.collection("vaccinedozes").findOne(
    { userId: userId },
    function (err, result) {
      if (err) throw err;
      if (result) {
        if (first == true && second == false) {
          userId= localStorage.getItem('user')
          db.collection("vaccinedozes").updateOne(
            { userId: userId },
            { $set: { firstDoze: first, secondDoze: second,timeSlotFirst:timeSlot } },
            function (err, collection) {
              if (err) throw err;
              console.log("Updated Successfully");

              db.collection("vaccine").updateOne(
                { timeSlot: timeSlot },
                { $inc: { count: -1 } },
                function (err, collection) {
                  if (err) throw err;
                  console.log("Record inserted Successfully");
                }
              );
            }
          );
        }
        
        if(first == true && second == true){
          
          userId= localStorage.getItem('user')
          db.collection("vaccinedozes").updateOne(
            { userId: userId },
            { $set: { firstDoze: first, secondDoze: second,timeSlotSecond:timeSlot } },
            function (err, collection) {
              if (err) throw err;
              console.log("Updated Successfully");

              db.collection("vaccine").updateOne(
                { timeSlot: timeSlot },
                { $inc: { count: -1 } },
                function (err, collection) {
                  if (err) throw err;
                  console.log("Record inserted Successfully");
                }
              );
            }
          );
        }
      } 
      
      else {
        userId= localStorage.getItem('user')
        var data = {
          userId: userId,
          firstDoze: first,
          secondDoze: false,
          timeSlotFirst:timeSlot
          // name:userName
        };
        db.collection("vaccinedozes").insertOne(
          data,
          function (err, collection) {
            if (err) throw err;
            console.log("Record inserted Successfully");

            db.collection("vaccine").updateOne(
              { timeSlot: timeSlot },
              { $inc: { count: -1 } },
              function (err, collection) {
                if (err) throw err;
                console.log("Record inserted Successfully");
              }
            );
          }
        );
      }
    }
  );
  // }
  return res.redirect("bookslot.html");
});

app.get("/login", (req, res) => {
  res.redirect("login.html");
});

// app.get("/nitin", (req, res) => {
// 	let arr = ["10:00 - 10:30", "10:30 - 11:00", "11:00 - 11:30", "11:30 - 12:00", "12:00 - 12:30", "12:30 - 1:00", "01:00 - 01:30", "01:30 - 02:00", "02:00 - 02:30", "02:30 - 03:00", "03:00 - 03:30", "03:30 - 04:00", "04:00 - 04:30","04:30 - 05:00"]

// 	for (i = 1; i <= 30; i++) {
// 		for (j = 0; j < 14; j++) {
// 			data = {
// 				"date": i.toString(),
// 				"count": 10,
// 				"timeSlot": arr[j],
// 			}
// 			db.collection('vaccine').insertOne(data, function (err, collection) {
// 				if (err) throw err;

// 			});
// 		}
// 	}

// 	res.send("loginhtml");
// })

app.get("/adminlogin", (req, res) => {
  res.redirect("adminlogin.html");
});


app.post("/adminlogin",async (req,res)=>
{
  console.log(req.body);
  try
  {
    const phoneAdmin = req.body.phoneAdmin;
    const passwordAdmin = req.body.passwordAdmin;
    console.log(phoneAdmin,passwordAdmin)
    const userPhoneNumberAdmin = await db.collection("admin")
      .findOne({ phoneAdmin:phoneAdmin });


      console.log(userPhoneNumberAdmin)
    if (userPhoneNumberAdmin.passwordAdmin === passwordAdmin) {
      res.redirect("admindashboard.html");
    }

      else {
        res.send("Inavlid Login Details");
      }
  
 }

 catch (err) {
  console.log(err);
}
 
 }
);


app.get("/getvaccineusers",async (req,res) => {
  await db.collection("vaccinedozes").find({}).toArray(function(err, result) {
    if (err) throw err;
    res.send(result)
  });
});

app.post("/login", async (req, res) => {

  try {
    const phone = req.body.phone;
    const password = req.body.password;
    const userPhoneNumber = await db
      .collection("users")
      .findOne({ phone: phone });


    if (userPhoneNumber.password === password) {
      userId = phone;
      
      
      localStorage.setItem('user', phone);

      res.redirect("bookslot.html");
    } else {
      res.send("Inavlid Login Details");
    }
  } catch (err) {
    console.log(err);
  }
});

app.get("/getvaccinedozes", function (req, res) {
  let userDocument;
  userId = localStorage.getItem('user')
  db.collection("vaccinedozes").findOne(
    { userId: userId },
    function (err, result) {
      if (err) throw err;
      userDocument = result;
      console.log(userDocument);
      if (userDocument) {
        res.send(userDocument);
      } else {
        res.send({ firstDoze: false });
      }
    }
  );
});

app
  .get("/", function (req, res) {
    res.set({
      "Access-control-Allow-Origin": "*",
    });
    return res.redirect("login.html");
  })
  .listen(3001);

console.log("server listening at port 3001");
