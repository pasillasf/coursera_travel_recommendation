function getCurrentTime(timeLocale, timeOptions) {
    let time = new Date().toLocaleTimeString(timeLocale, timeOptions);
    alert('time', time);
    return time;
}

function search() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    alert('search', input);
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'travel_recommendation_api.json', true);
    xhr.onload = function() {
        if (this.status === 200) {
            const data = JSON.parse(this.responseText);
            let output = '<h2>Search Results:</h2>';
            
            // Search in countries and cities
            data.countries.forEach(function(country) {
                alert('countries');
                if (country.name.toLowerCase().includes(input)) {
                    alert('before get');
                    let currentTime = getCurrentTime(country.cities.locale, country.cities.options) 
                        output += `
                            <div class="recommendation">
                                <h3>${country.cities.name}</h3>
                                <p>Current local time: ${currentTime}</p>
                            </div>
                        `;
                        document.getElementById('searchResults').innerHTML = output;                    
                }
                country.cities.forEach(function(city) {
                    if (city.name.toLowerCase().includes(input) || city.description.toLowerCase().includes(input)) {
                        let currentTime = getCurrentTime(country.cities.locale, country.cities.options)
                            output += `
                                <div class="recommendation">
                                    <h3>${city.name}</h3>
                                    <img src="${city.imageUrl}" alt="${city.name}" class="city-image">
                                    <p>${city.description}</p>
                                    <p>Current local time: ${currentTime}</p>
                                </div>
                            `;
                            document.getElementById('searchResults').innerHTML = output;                        
                    }
                });
            });

            // Search in temples
            if (input === 'temples') {
                data.temples.forEach(function(temple) {
                    output += `
                        <div class="recommendation">
                            <h3>${temple.name}</h3>
                            <img src="${temple.imageUrl}" alt="${temple.name}" class="city-image">
                            <p>${temple.description}</p>
                        </div>
                    `;
                });
            } else {
                data.temples.forEach(function(temple) {
                    if (temple.name.toLowerCase().includes(input) || temple.description.toLowerCase().includes(input)) {
                        output += `
                            <div class="recommendation">
                                <h3>${temple.name}</h3>
                                <img src="${temple.imageUrl}" alt="${temple.name}" class="city-image">
                                <p>${temple.description}</p>
                            </div>
                        `;
                    }
                });
            }

            // Search in beaches
            if (input === 'beaches') {
                data.beaches.forEach(function(beach) {
                    output += `
                        <div class="recommendation">
                            <h3>${beach.name}</h3>
                            <img src="${beach.imageUrl}" alt="${beach.name}" class="city-image">
                            <p>${beach.description}</p>
                        </div>
                    `;
                });
            } else {
                data.beaches.forEach(function(beach) {
                    if (beach.name.toLowerCase().includes(input) || beach.description.toLowerCase().includes(input)) {
                        output += `
                            <div class="recommendation">
                                <h3>${beach.name}</h3>
                                <img src="${beach.imageUrl}" alt="${beach.name}" class="city-image">
                                <p>${beach.description}</p>
                            </div>
                        `;
                    }
                });
            }

            document.getElementById('searchResults').innerHTML = output;
        }
    };
    xhr.send();
}

function clearSearch() {
    document.getElementById('searchInput').value = '';
    document.getElementById('searchResults').innerHTML = '';
}
