$(document).ready(function() {
    // Document Variables 
    const usrZip = document.querySelector('#user_input');
    const submit = document.querySelector('#subBtn');
    const container = document.querySelector('.results_container');

    // Http Request state
    let stateIsReady = false;

    // Http response data (weather data in JSON)
    let w;
    
    // Weather Constructor
    function Weather() {
        // APIXU.com APIA Key!
        this.apiKey = "9c6ed4adb16842ad89213210172704";

        // Getting the current weather by zip
        this.getCurrent = function(zip) {
            // Request URL 
            let URL = 'https://api.apixu.com/v1/current.json?key=' + this.apiKey + '&q=' + zip;
        
            // Https request
            const http = new XMLHttpRequest();
            http.open('GET', URL, true);
            http.onreadystatechange= function () {
                if (http.readyState == 4) {                    
                    w = JSON.parse(http.responseText);
                    console.log(w);

                    // If invalid zip is entered
                    if (w.error) {
                        alert(w.error.message);
                    }
                    
                    // Http request is ready!
                    stateIsReady = true;
                }
            };            
            http.send();
        };
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
        rLabel.innerHTML = w.location.name + ', ' + w.location.region;

        // Weather Condition
        let wCondition = document.createElement('p');
        wCondition.innerHTML = w.current.condition.text + "<span><img src='" + w.current.condition.icon + "'></span>"; 

        // Current weather tempature
        let wCurrent = document.createElement('p');
        wCurrent.innerHTML = "Current: " + w.current.temp_f + " &#8457";

        // Render elements to document 
        elements.push(rLabel, wCondition, wCurrent);
        elements.forEach(function(element) {
            container.appendChild(element);
        });

        // Animation
        $('.results').delay(1250).fadeIn('slow');
    }

    // Intro animation
    (function() {
        $('#landing h1').slideDown('slow').delay(2400).fadeOut('slow');
        $('.header').delay(3550).fadeIn('slow');
        $('.info').delay(3550).fadeIn('slow');
    })();    

    // Submit button event
    submit.addEventListener('click', () => {
        // Check if input has a value
        if (usrZip.value !== '') {
            weather.getCurrent(usrZip.value);

            // When Http request is ready
            if (stateIsReady) {
                $('.info').fadeOut('slow');
                render();
            }            
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
