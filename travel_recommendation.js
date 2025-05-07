function search() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    alert('Input value: ' + input); // Debug alert to check the input value
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'travel_recommendation_api.json', true);
    xhr.onload = function() {
        if (this.status === 200) {
            const recommendations = JSON.parse(this.responseText);
            let output = '<h2>Search Results:</h2>';
            recommendations.forEach(function(recommendation) {
                recommendation.cities.forEach(function(city) {
                    if (city.name.toLowerCase().includes(input) || city.description.toLowerCase().includes(input)) {
                        output += `
                            <div class="recommendation">
                                <h3>${city.name}</h3>
                                <img src="${city.imageUrl}" alt="${city.name}" class="city-image">
                                <p>${city.description}</p>
                            </div>
                        `;
                    }
                });
            });
            document.getElementById('searchResults').innerHTML = output;
        }
    };
    xhr.send();
}

function clearSearch() {
    document.getElementById('searchInput').value = '';
    document.getElementById('searchResults').innerHTML = '';
}
