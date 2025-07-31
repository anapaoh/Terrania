document.addEventListener("DOMContentLoaded", () => {
    console.log("Página de contacto Terranía lista.");
  
    const mapElement = document.getElementById("map-contacto");
    if (!mapElement) {
      console.warn("No se encontró contenedor #map-contacto, mapa no inicializado");
      return;
    }
  
    const map = L.map('map-contacto').setView([20.10082568018709, -98.75089666541818], 10);
  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
  
    L.marker([20.10082568018709, -98.75089666541818]).addTo(map)
      .bindPopup('Terranía - Plaza de las Américas')
      .openPopup();
  });  