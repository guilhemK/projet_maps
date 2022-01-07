
// On initialise la latitude et la longitude de Paris (centre de la carte)
var lat = 43.5835629;
var lon = 1.4031838;
var macarte = null;
// Fonction d'initialisation de la carte
fetch("./data_restaurants.json")
.then(function(response) {
    if(response.ok) {
        response.json().then(function(json) {  
            var restaurants = json;
            // Créer l'objet "macarte" et l'insèrer dans l'élément HTML qui a l'ID "map"
            macarte = L.map('map').setView([lat, lon], 11);
            // Leaflet ne récupère pas les cartes (tiles) sur un serveur par défaut. Nous devons lui préciser où nous souhaitons les récupérer. Ici, openstreetmap.fr
            L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
                // Il est toujours bien de laisser le lien vers la source des données
                attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
                minZoom: 1,
                maxZoom: 20
            }).addTo(macarte);
            // Nous ajoutons un marqueur
            L.marker([lat, lon]).addTo(macarte);

            restaurants.forEach(restaurant => {
                let marker = L.marker([restaurant.lat, restaurant.long]).addTo(macarte);
                marker.on('click', function(e){
                    displayMarker(marker, restaurant);
                })      
            });
        });
    } else {
        console.log('Erreur pour data_restaurants.json ' + response.status + ': ' + response.statusText);
    }
});
function displayMarker(marker, restaurant) {
    document.getElementById("info-restaurant").style.display = "block";
    document.getElementById("nom").textContent = restaurant.restaurantName;
    document.getElementById("description").textContent = restaurant.description;
    
}