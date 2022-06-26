// JavaScript Document
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

var pricePerDay=0, carName, extrasList;
var totalCost=0;
var numberOfDays;
var cover=0;
var bookingFee;

// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDfmilBIZRdM-n6YuVEZqsiA8dOJpzeT2g",
    authDomain: "kiwi-kars-40048.firebaseapp.com",
    databaseURL: "https://kiwi-kars-40048-default-rtdb.firebaseio.com",
    projectId: "kiwi-kars-40048",
    storageBucket: "kiwi-kars-40048.appspot.com",
    messagingSenderId: "403264067072",
    appId: "1:403264067072:web:c1ace0a52f196b97d96ae5"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  import { getDatabase, ref , set , push } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-database.js";
  const db = getDatabase(app);

//This function will store all of the booking details 
function selectCar(){
	carName=this.dataset.name;
	pricePerDay=this.dataset.price;
	document.getElementById("outputPrice").innerHTML=pricePerDay;
	document.getElementById("outputCar").innerHTML=carName;
	window.scrollTo(0, document.getElementById("extra").offsetTop - 100);
	alert(pricePerDay + carName);
}

function newBooking(){ 
	var addCost=0;
	extrasList=[]; //this list will contain the selected extras
	var addItems = document.getElementsByClassName("checkbox");
	//this will add the cost of the checkbox extras
	for (var i=0; i<addItems.length; i++){
		//this will for loop through any item with the class name checkbox
			if (addItems[i].checked){ //if the item has been checked
				extrasList.push(" " + addItems[i].value); //find the list and add the value
				addCost += parseInt(addItems[i].dataset.price); //adds the cost of the selected extras
				alert(addCost);
			}
	}
	var checkInDate = document.getElementById("dateInput").value;
	var numberOfDays = document.getElementById("daysInput").value;
	bookingFee = 50;
	cover = numberOfDays*20;
	totalCost = pricePerDay*numberOfDays + addCost + cover + 50;
	//this is the end of the for loop, now it will print out the extras list
	document.getElementById("outputDate").innerHTML=checkInDate;
	document.getElementById("outputDays").innerHTML=numberOfDays;
	document.getElementById("outputCar").innerHTML=carName;
	document.getElementById("outputPrice").innerHTML="$"+pricePerDay;
	document.getElementById("outputExtras").innerHTML=extrasList;
	document.getElementById("outputCover").innerHTML="$"+cover;
	document.getElementById("outputBookingFee").innerHTML="$"+bookingFee;
	document.getElementById("outputTotal").innerHTML="$"+totalCost;
} //this closes off the newBooking function

	
function checkCustomerDetails(){
	alert("customer details function");
	var date = document.getElementById("dateInput").value;
	var days = document.getElementById("daysInput").value;
	var firstName = document.getElementById("firstNameInput").value;
	var lastName = document.getElementById("lastNameInput").value;
	var license = document.getElementById("licenseInput").value;
	var age = document.getElementById("ageInput").value;
	var cellphone = document.getElementById("cellphoneInput").value;
	var emailAddress = document.getElementById("emailInput").value;
	var customerComments = document.getElementById("textBox").value;
	alert(date+days+firstName+lastName+license+age+cellphone+cellphone+emailAddress+customerComments)
	alert(carName + totalCost + extrasList)
	//you need to write quite a few if/else statements here to check for null values
	//need to push this to firebase
	pushData(date, days, firstName, lastName, license, age, cellphone, emailAddress, customerComments, totalCost, extrasList);
}

function pushData(date, days, firstName, lastName, license, age, cellphone, emailAddress, customerComments, totalCost, extrasList){
	alert("push data function");
	alert(firstName + lastName + totalCost + extrasList);
	push(ref(db, 'booking/'), {
		Name:firstName + " " + lastName,
		License: license,
		Age: age,
		Email: emailAddress,
		Comments: customerComments,
		Car: carName,
		CheckInDate: date,
		Extras: extrasList,
		Days: days,
		TotalCost:totalCost
	});
	alert("Data has been pushed");
	setTimeout(function() {
		location.reload();
	}, 3000);
}

//This for loop is adding an event listener to the extras checkbox
var cardInputs = document.getElementsByClassName('card');
for(var i = 0; i < cardInputs.length; i++) {
	cardInputs[i].addEventListener('click', selectCar);
}

var Inputs = document.getElementsByClassName('checkbox');
for(var i = 0; i < Inputs.length; i++) {
	Inputs[i].addEventListener('click', newBooking);
}

document.getElementById("daysInput").addEventListener('change', newBooking);
document.getElementById("submit").addEventListener('click', checkCustomerDetails);

//creating variables to check the date select is only a present date
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();
if (dd < 10) {
	dd = '0' + dd
}
if (mm < 10){
	mm = '0' + mm
}
today = yyyy + '-' + mm + '-' + dd;
document.getElementById("dateInput").setAttribute("min", today);



