var search = function(){
    console.log("in secrch");

    $("#search").on("click", function(){
        alert("click");
        var text = $("#zipcode").val();
        //https://api.openweathermap.org/data/2.5/weather?q=san%20antonio&APPID=22964cc66fc396ccbca6cca46b9ca9f7
        var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + text + ",US&units=imperial&APPID=22964cc66fc396ccbca6cca46b9ca9f7";
        var lat;
        var lon;
        var getInfo = fetch(apiUrl)
        .then(function(response) {
                response.json().then(function(data) {
                    lat = data.coord.lat;
                    console.log(lat);
                    lon = data.coord.lon;
                    console.log(lon);
                    var date = moment().format('L');
                    
                    // <img src="img_girl.jpg" alt="Girl in a jacket"></img>
                    $("#city").text(data.name + " " + date); 
                    $("#temp").text("Temp : " + data.main.temp +" F");
                    $("#wind").text("Wind : " + data.wind.speed + "MPH");
                    $("#Humidity").text("Humidity : " + data.main.humidity + " %");
                    apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="+ lat +"&lon="+ lon +  "&units=imperial&APPID=22964cc66fc396ccbca6cca46b9ca9f7";
                    var response = fetch(apiUrl)
                        .then(function(response) {
                            response.json().then(function(data) {
                   
                                $("#uv").text("UV Index : " + data.current.uvi);

                                console.log(data.current.uvi)
                                console.log(data.current.weather[0].icon);
                                var urlIcon = "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png";
                                console.log(urlIcon);
                                $("#iconImg").attr("src", urlIcon);
                                
                            });
                        });
                   
                });
            });
    
        
        
    });


};


search();



