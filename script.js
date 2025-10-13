// Dummy route (array of lat, lng points)
const route = [
    [19.9975, 73.7898], // CBS Bus Stand
    [19.9982, 73.7910], 
    [19.9995, 73.7922], 
    [20.0010, 73.7935], 
    [20.0028, 73.7947], 
    [20.0045, 73.7960], 
    [20.0058, 73.7975], 
    [20.0072, 73.7988], 
    [20.0090, 73.8000], // Near Panchavati Karanja
  ];
  
// Initialize map centered at first coordinate
const map = L.map('map').setView(route[0], 15);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Custom car icon
const carIcon = L.icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/743/743988.png",
    iconSize: [40, 40], // size of the icon
    iconAnchor: [20, 20], // point of icon which will be at marker's position
  });
  
  // Vehicle marker with car icon
  let marker = L.marker(route[0], { icon: carIcon }).addTo(map);
  

// Draw polyline (path) starting from first point
let polyline = L.polyline([route[0]], { color: 'blue' }).addTo(map);

// Move vehicle along route
// Move vehicle along route

let i = 1;
let intervalId = null; // store interval so we can stop it

// Start movement
document.getElementById("startBtn").addEventListener("click", () => {
  if (intervalId) return; // prevent multiple starts
  intervalId = setInterval(() => {
    if (i < route.length) {
      marker.setLatLng(route[i]);
      polyline.addLatLng(route[i]);
      map.panTo(route[i]);
      i++;
    } else {
      clearInterval(intervalId);
      intervalId = null;
    }
  }, 2000);
});

// Stop movement
document.getElementById("stopBtn").addEventListener("click", () => {
  clearInterval(intervalId);
  intervalId = null;
});



