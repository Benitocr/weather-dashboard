var loadHistory = function(){
    var info = localStorage.getItem("cityHistory1");
    console.log ("valor de memoria: " + info);
    
    if(!info){
        console.log("en if de !info con info");
        info = "City";
        localStorage.setItem("cityHistory1", "City");
        localStorage.setItem("cityHistory2", "City");
        localStorage.setItem("cityHistory3", "City");
        localStorage.setItem("cityHistory4", "City");
        localStorage.setItem("cityHistory5", "City");
        localStorage.setItem("cityHistory6", "City");
        

    }
    
    $("#cityHistory1").text(info);
    info = localStorage.getItem("cityHistory2");
    $("#cityHistory2").text(info);
    info = localStorage.getItem("cityHistory3");
    $("#cityHistory3").text(info);
    info = localStorage.getItem("cityHistory4");
    $("#cityHistory4").text(info);
    info = localStorage.getItem("cityHistory5");
    $("#cityHistory5").text(info);
    info = localStorage.getItem("cityHistory6");
    $("#cityHistory6").text(info);
   // init();

};

var displayWeather = function(city , fromInput ){
    console.log("in secrch");
    console.log(fromInput);

    
    
    //https://api.openweathermap.org/data/2.5/weather?q=san%20antonio&APPID=22964cc66fc396ccbca6cca46b9ca9f7
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + ",US&units=imperial&APPID=22964cc66fc396ccbca6cca46b9ca9f7";
    var lat;
    var lon;
    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    lat = data.coord.lat;
                    
                    lon = data.coord.lon;
                    
                    var date = moment().format('L');
                    
                    // <img src="img_girl.jpg" alt="Girl in a jacket"></img>
                    $("#city").text(data.name + " " + date); 
                    $("#temp").text("Temp : " + data.main.temp +" F");
                    $("#wind").text("Wind : " + data.wind.speed + "MPH");
                    $("#Humidity").text("Humidity : " + data.main.humidity + " %");
                    apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="+ lat +"&lon="+ lon +  "&units=imperial&APPID=22964cc66fc396ccbca6cca46b9ca9f7";
                    console.log ("link api de ciudad"+ apiUrl)
                    //moving city to local History
                    if(fromInput == 1){
                        var cityToLocalMemory = localStorage.getItem("cityHistory5");
                        $("#cityHistory6").text(cityToLocalMemory);
                        localStorage.setItem("cityHistory6", cityToLocalMemory);
                        cityToLocalMemory = localStorage.getItem("cityHistory4");
                        $("#cityHistory5").text(cityToLocalMemory);
                        localStorage.setItem("cityHistory5", cityToLocalMemory);
                        cityToLocalMemory = localStorage.getItem("cityHistory3");
                        $("#cityHistory4").text(cityToLocalMemory);
                        localStorage.setItem("cityHistory4", cityToLocalMemory);
                        cityToLocalMemory = localStorage.getItem("cityHistory2");
                        $("#cityHistory3").text(cityToLocalMemory);
                        localStorage.setItem("cityHistory3", cityToLocalMemory);
                        cityToLocalMemory = localStorage.getItem("cityHistory1");
                        $("#cityHistory2").text(cityToLocalMemory);
                        localStorage.setItem("cityHistory2", cityToLocalMemory);
                        $("#cityHistory1").text(city);
                        localStorage.setItem("cityHistory1", city);
                    };    
                    

                    //code to get UVI index
                    var response = fetch(apiUrl)
                        .then(function(response) {
                            response.json().then(function(data) {
                                
                                $("#uvi").text(data.current.uvi);
                                
                                
                                if(data.current.uvi<10){
                                    $("#uvi").removeClass();
                                    $("#uvi").toggleClass("bg-success text-white");

                                }else if(data.current.uvi<25){
                                    $("#uvi").removeClass();
                                    $("#uvi").toggleClass("bg-warning text-dark");
                                }else{
                                    $("#uvi").removeClass();
                                    $("#uvi").toggleClass("bg-danger text-white");
                                }
                                
                                var urlIcon = "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png";
                                console.log(urlIcon);
                                $("#iconImg").attr("src", urlIcon);
                                
                            });
                        });
                    //code to display fore Cast information 
                    for(let i =1; i<6 ; i++){
                        
                        var dateForecast = moment().add(i, 'days').format('L');
                        var foreCastId = "#foreCast"+i;
                        $(foreCastId).text(dateForecast);
                        
                        
                        //
                        fetch(apiUrl)
                            .then(function(response) {
                                response.json().then(function(data) {
                    
                                    var urlIconForeCast = "http://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + "@2x.png";
                                    var imageForeCastId = "#imgForeCast"+i;
                                    $(imageForeCastId).attr("src", urlIconForeCast);
                                    console.log("liga para icono forecast" +i+"  "+ urlIconForeCast);
                                    var tempForeCastId = "#tempForeCast"+i;
                                    $(tempForeCastId).text("Temp : " + data.daily[i].temp.day +" F");
                                    var windForeCastId = "#windForeCast"+i;
                                    $(windForeCastId).text("Wind : " + data.daily[i].wind_speed + "MPH");
                                    var HumidityForeCastId = "#HumidityForeCast"+i;
                                    $(HumidityForeCastId).text("Humidity : " + data.daily[i].humidity + " %");
                                });
                            });

                    };
                    
                });
            }else {
                // if not successful, redirect to homepage
                document.location.replace("./index.html");
              }


        });
    
        
   
    


};
//fuction to 
//var init = function(){
    $("#search").on("click", function(){
        
        var text = $("#zipcode").val();
        if(text){
            console.log("en if de Init ")
            displayWeather (text , "1");
        }else{
        alert("Please type a City");
        };
        

    });
   

//};

loadHistory();




//display the weather of City1
$("#cityHistory1").on("click" , function(){
    var text = $("#cityHistory1").text();
    
    if(text  === "City"){
        alert("Please type a City");
    }else if(text) {
        
        displayWeather(text, "0");
    };
    
} );

//display the weather of City2
$("#cityHistory2").on("click" , function(){
    var text = $("#cityHistory2").text();
 
    if(text  === "City"){
        alert("Please type a City");
    }else if(text) {
        
        displayWeather(text, "0");
    };
    
} );

//display the weather of City3
$("#cityHistory3").on("click" , function(){
    var text = $("#cityHistory3").text();
    
    if(text  === "City"){
        alert("Please type a City");
    }else if(text) {
        
        displayWeather(text, "0");
    };
    
} );

//display the weather of City4
$("#cityHistory4").on("click" , function(){
    var text = $("#cityHistory4").text();
    
    if(text  === "City"){
        alert("Please type a City");
    }else if(text) {
        
        displayWeather(text, "0");
    };
    
} );

//display the weather of City5
$("#cityHistory5").on("click" , function(){
    var text = $("#cityHistory5").text();
    
    if(text  === "City"){
        alert("Please type a City");
    }else if(text) {
        
        displayWeather(text, "0");
    };
    
} );

//display the weather of City6
$("#cityHistory6").on("click" , function(){
    var text = $("#cityHistory6").text();
    
    if(text  === "City"){
        alert("Please type a City");
    }else if(text) {
        
        displayWeather(text, "0");
    };
    
} );




