
//Firebasee Credentials
  var firebase = require("firebase");
  var config = {
    apiKey: "AIzaSyBRGq_6V3btTkK-qm7A8AvpfUS3oWfUdQk",
    authDomain: "form-7ae29.firebaseapp.com",
    databaseURL: "https://form-7ae29.firebaseio.com",
    projectId: "form-7ae29",
    storageBucket: "form-7ae29.appspot.com",
    messagingSenderId: "689302187709"
  };
  firebase.initializeApp(config);
  var database=firebase.database();

//Array city1 used for itterating with location on reqeust1 function
var city1 = ["Mumbai","Indore","Delhi"];

//Different months initial used to return the month number for e.g Month name (String) to Mon Number(int)
var ms=["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];


//Start/Enddate date operation and manipulation, first we use date() constructor and get the raw date with time stamp and with Month Name ,then for putting the date in this YYYY-MM-DD 
// format we manipulated the data
var d2=new Date();
d2.setDate(d2.getDate()-3);
var x2=d2.toString().split(" ");
for(var i=1;i<ms.length;i++){
	if(ms[i]==x2[1])
		var mn2=i;
}
console.log(mn2);
//converted the date in required format by api

var sd=x2[3]+'-'+mn2+'-'+x2[2];


var d1=new Date();
d1.setDate(d1.getDate()-1);
var x1=d1.toString().split(" ");
for(var i=1;i<ms.length;i++){
	if(ms[i]==x1[1])
		var mn1=i;
}
//converted the date in required format by api
var ed=x1[3]+'-'+mn1+'-'+x1[2];

const  PORT=3000;

//reqeust module 
let request1 = require('request');

let Key = "a83384062a0241acaa4103149182508";

//for loop that iterates  for city1.length times 
for(let i=0;i<city1.length;i++){

//url is with dynamic with key ,location  and dates
let url1=`http://api.worldweatheronline.com/premium/v1/past-weather.ashx?key=${Key}&q=${city1[i]}&format=json&date=${sd}&enddate=${ed}&tp=24`;


request1(url1, function (err, response, body) {


  if(err){
    console.log('error:', error);
  } else {
  	console.log(" ");
  	//converted response data with parse Json and stored in variable
    let weather1 = JSON.parse(body);
    console.log(weather1.data.request[0].query);	

//indivually took the max temperature in different variables 
   var max1=weather1.data.weather[0].maxtempC;
   var max2=weather1.data.weather[1].maxtempC;
   var max3=weather1.data.weather[2].maxtempC;
//converted the max temperature in int like it was string when capturing from api so converted the string to int by parseInt();
   var max_M=(parseInt(max1)+parseInt(max2)+parseInt(max3))/3;
//indivually took the min temperature in different variables 
   var min1=weather1.data.weather[0].mintempC;
   var min2=weather1.data.weather[1].mintempC;
   var min3=weather1.data.weather[2].mintempC;
//converted the min temperature in int like it was string when capturing from api so converted the string to int by parseInt();
   var min_M=(parseInt(min1)+parseInt(min2)+parseInt(min3))/3;
//for putting data into firebase databse we use this below code
   var send=database.ref(city1[i]);
   		send.set({
   				maxtemp:max_M,
   				mintemp:min_M,
   		});



  }
})
}
