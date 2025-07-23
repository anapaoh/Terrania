// Función para verificar si Leaflet está cargado
function initMap() {
    console.log("Iniciando mapa...");
    console.log("¿Leaflet disponible?", typeof L);
    
    if (typeof L === 'undefined') {
      console.error("Leaflet no está disponible. Reintentando en 500ms...");
      setTimeout(initMap, 500);
      return;
    }
  
    // Evita duplicados
    const mapElement = document.getElementById('map');
    if (!mapElement) {
      console.error("No se encontró el elemento #map");
      return;
    }
    
    if (mapElement._leaflet_id) {
      mapElement._leaflet_id = null;
    }
  
    try {
      const map = L.map("map").setView([20.1, -98.75], 8);
      console.log("Mapa creado exitosamente");
  
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);
  
      const ubicaciones = [
        {
          nombre: "Oficina Central - Pachuca",
          coords: [20.123, -98.736],
          info: "Nuestra oficina principal en Pachuca de Soto, Hidalgo.",
        },
        {
          nombre: "Sucursal Tulancingo",
          coords: [20.959, -98.366],
          info: "Sucursal en Tulancingo para atención regional.",
        },
        {
          nombre: "Centro de Distribución - Tula",
          coords: [20.051, -99.300],
          info: "Centro de distribución ubicado en Tula de Allende.",
        },
      ];
  
      const infoDiv = document.getElementById("location-info");
  
      ubicaciones.forEach((ubic) => {
        const marker = L.marker(ubic.coords).addTo(map);
        marker.bindPopup(`<b>${ubic.nombre}</b><br>${ubic.info}`);
        marker.on("click", () => {
          infoDiv.innerHTML = `<h5>${ubic.nombre}</h5><p>${ubic.info}</p>`;
        });
      });
  
      console.log("Marcadores agregados exitosamente");
  
    } catch (error) {
      console.error("Error creando el mapa:", error);
    }
  }
  
  // Inicializar cuando el DOM esté listo
  document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM cargado, iniciando mapa...");
    initMap();
  });