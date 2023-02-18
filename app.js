var express=require("express");
var bodyParser=require("body-parser");

const mongoose = require('mongoose');

const { defaultMaxListeners } = require("events");
mongoose.connect('mongodb://localhost:27017/cowinvaccination');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
	console.log("connection succeeded");
})

var app=express()

let userId;

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
	extended: true
}));

app.post('/sign_up', function(req,res){
	var name = req.body.name;
    var age = req.body.age;
    var pincode = req.body.pincode;
	var pass = req.body.password;
    var aadhar = req.body.aadhar;
	var phone =req.body.phone;

	var data = {
		"name": name,
		"age":age,
        "pincode":pincode,
        "aadhar":aadhar,
		"password":pass,
		"phone":phone
	}
db.collection('users').insertOne(data,function(err, collection){
		if (err) throw err;
		console.log("Record inserted Successfully");
			
	});
		
	return res.redirect('login.html');
})


app.post('/bookslot', function(req,res){
	console.log(req.body);
	var firstDoze = req.body.firstDoze;
    var secondDoze = req.body.secondDoze;
    var timeSlot = req.body.timeSlot;
	let first,second;
    if(firstDoze == "on"){
		first = true
	}else{
		first=false
	}
    if(secondDoze == "on"){
		second = true
	}else{
		second=false
	}

	var data = {
		"userId": userId,
		"firstDoze":first,
        "secondDose":second,  
	}
db.collection('vaccinedozes').insertOne(data,function(err, collection){
		if (err) throw err;
		console.log("Record inserted Successfully");
		// alert("Succesfully Booked Slot")


		db.collection('vaccine').updateOne({timeSlot:timeSlot},{$inc:{count:-1}},function(err, collection){
			if (err) throw err;
			console.log("Record inserted Successfully");
			// alert("Succesfully Booked Slot")
				
		});

			
	});



		
	return res.redirect('bookslot.html');



})



app.get("/login",(req,res)=>
{
	res.redirect("login.html");
})

app.post("/login", async(req,res)=>
{
	console.log("Entry 1");
	
    
		try{
			const phone = req.body.phone;
			const password = req.body.password;
			const userPhoneNumber = await db.collection("users").findOne({phone:phone});
	
			console.log(phone,password,userPhoneNumber);
	
			if(userPhoneNumber.password === password)
			{
				userId = phone;
				res.send("login succesfully");
			}
			else{
				res.send("Inavlid Login Details");
			}

		}
     catch(err)
	 {
		console.log(err);
	 }

 
})




app.get('/',function(req,res){
res.set({
	'Access-control-Allow-Origin': '*'
	});
return res.redirect('index.html');
}).listen(3001)


console.log("server listening at port 3001");
