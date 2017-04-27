$(document).ready(function() {
    // Document Variables 
    const usrZip = document.querySelector('#user_input');
    const submit = document.querySelector('#subBtn');
    const container = document.querySelector('.results_container');

    // Http Request variable
    const http = new XMLHttpRequest();

    // Http response data (weather data in JSON)
    let w;
    // Weather Condition (for images)
    let wC;

    // Weather Constructor
    function Weather() {
        // Openweathermap.org API Key!
        this.apiKey = "0c56fc5e1ebbca32eb2c96a717d8520c";

        // Getting the current weather by zip
        this.getCurrent = function(zip) {
            // URL for weather by zip using imperial units
            let URL ="https://api.openweathermap.org/data/2.5/weather?zip=" + zip + ",us&units=imperial&APPID=" + this.apiKey; 

            // Http request
            http.open('GET', URL, false);
            http.send();

            // Parsing http response 
            w = JSON.parse(http.response);

             // Error if zip is invalid
            if (w.cod == '404') {
                alert(w.message);
            }

            // Use image based on weather condition ID
            for (let i = 0; i < wConditions.length; i++) {
                if (w.weather[0].id == wConditions[i].id) {
                    wC = wConditions[i].img;
                    break;
                } else {
                    wC = wConditions[0].img;
                }
            }
            console.log(w.weather[0].id);
    
            //Http checks
            console.log(http.status);
            console.log(http.statusText);
        };

        // Weather Conditions array
        let wConditions = [
            {id: 'default', img: '/img/15.png'},
            {id: 804, img: '/img/37.png'},
            {id: 801, img: '/img/32.png'},
            {id: 800, img: '/img/33.png'},
            {id: 701, img: '/img/30.png'},
            {id: 500, img: '/img/34.png'},
            {id: 211, img: '/img/25.png'}
        ];
    }
    // Weather object
    const weather = new Weather();
    
    // Render data to html
    function render() {
        // Clear container
        container.innerHTML = '';

        // Array to hold created elements
        let elements = [];

        // City label
        let rLabel = document.createElement('h1');
        rLabel.classList.add('results-label');
        rLabel.innerHTML = w.name;

        // Weather icon
        let icon = document.createElement('img');
        icon.setAttribute('src', wC);

        let currentT = document.createElement('p');
        currentT.innerHTML = "Current: " + w.main.temp; 

        // High and low weather data
        let highLow = document.createElement('p');
        highLow.innerHTML = "High: " + w.main.temp_max + " &#8457 " + " Low: " + w.main.temp_min + " &#8457 ";

        // Render elements to document 
        elements.push(rLabel, icon, currentT, highLow);
        elements.forEach(function(element) {
            container.appendChild(element);
        });

        // Animation
        $('.results').delay(1250).fadeIn('slow');
    }

    // Intro animation
    (function() {
        $('#landing h1').slideDown(1500).delay(1500).fadeOut('slow');
        $('.header').delay(3550).fadeIn('slow');
        $('.info').delay(3550).fadeIn('slow');
    })();    

    // Submit button event
    submit.addEventListener('click', () => {
        // Check if input has a value
        if (usrZip.value !== '') {
            weather.getCurrent(usrZip.value);
            $('.info').fadeOut('slow');
            render();
        } else {
            alert('Please enter a zip code!');
        }
    });

    // Back button event
    document.querySelector('#backBtn').addEventListener('click', function() {
        $('.results').fadeOut('slow');
        $('.info').delay(1250).fadeIn('slow');
    });
});
