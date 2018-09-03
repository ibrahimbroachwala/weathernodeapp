
//firebase credentials
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
var ref = firebase.database().ref();
//globally defined locations variables for accessing the data from firebase in accurate variable
 var mumbai,delhi,indore,op;

// firebase read data coode
ref.on("value", function(snapshot) {
  //console log the entire data from database in console.log
   console.log(snapshot.val());
   op=snapshot.val();
   //temperature location wise in different variables
   mumbai=op.Mumbai;
   indore=op.Indore;
   delhi=op.Delhi;

//For representing the firebase data into bar format,used highchart js library refrence:highchart js
   Highcharts.chart('container', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Average Min & Max Temperature of Last 3 days in Mumbai,Indore & Delhi '
    },
    subtitle: {
        text: 'Source: WorldWeatherOnline.com'
    },
    xAxis: {
        categories: [
            'Mumbai',
            'Indore',
            'Delhi'
  
        ],
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Temperature in Celsius'
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} °C</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [{
        name: 'Maximum Temperatue',
        data: [mumbai.maxtemp,indore.maxtemp, delhi.maxtemp]

    }, {
        name: 'Minimum Temperature',
        data: [mumbai.mintemp, indore.mintemp,delhi.mintemp]

    }]
});
   
}, function (error) {
   console.log("Error: " + error.code);
});


//current location
if ("geolocation" in navigator) {
  $('.js-geolocation').show(); 
} else {
  $('.js-geolocation').hide();
}

//latitude and longitude value of the current location
$('.js-geolocation').on('click', function() {
  navigator.geolocation.getCurrentPosition(function(position) {
    loadWeather(position.coords.latitude+','+position.coords.longitude); //load weather using your lat/lng coordinates

  });
});


//By default location on page load is seattle
$(document).ready(function() {
  loadWeather('Seattle',''); 
});


//for current location weather
function loadWeather(location, woeid) {
  $.simpleWeather({
    location: location,//longigtude
    woeid: woeid,//latitude
    unit: 'f',//it can C,F or K which ever thing like i.e Celsius,Farhenit or Kelvin
    success: function(weather) {
      //current weather card UI
      html = '<h2><i class="icon-'+weather.code+'"></i> '+weather.temp+'&deg;'+weather.units.temp+'</h2>';
      html += '<ul><li>'+weather.city+', '+weather.region+'</li>';
      html += '<li class="currently">'+weather.currently+'</li>';
      html += '<li>'+weather.alt.temp+'&deg;C</li></ul>';  
      
      $("#weather").html(html);
    },
    error: function(error) {
      $("#weather").html('<p>'+error+'</p>');
    }
  });
}