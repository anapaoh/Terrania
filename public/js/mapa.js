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
          nombre: "Terranía",
          coords: [20.10082568018709, -98.75089666541818],
          info: "Nuestra oficina principal(Huhusehe) en Pachuca de Soto, Hidalgo.",
        },
        {
          nombre: "Arte Xiyo Lana",
          coords: [20.663054799601703, -99.1352020599059],
          info: "Arte Xiyo Lana se encuentra en Santuario, Hidalgo.",
        },
        {
          nombre: "Xoxoc",
          coords: [20.234668615282654, -99.54111540409696],
          info: "Xoxoc se encuentra en Santa María Amealco, Hidalgo.",
        },

        {
          nombre: "Mashei",
          coords: [20.544834924033538, -99.29567854350984],
          info: "Fábrica Vino de Granada Mashei y Tienda Artesanal se encuentra en La Vega, Hidalgo.",
        },

        {
          nombre: "Yonancy",
          coords: [20.145622795563465, -98.19229545436473],
          info: "Yonancy se encuentra en Acaxochitlán, Hidalgo.",
        },

        {
          nombre: "Jamädi",
          coords: [19.3770821555232, -99.22614313767754],
          info: "Jamädi se encuentra en Ciudad de México, Cd. de México.",
        },
        {
          nombre: "Arte Lugo",
          coords: [20.50614535710517, -99.20619310223817],
          info: "Arte Lugo se encuentra en Ixmiquilpan, Hidalgo.",
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