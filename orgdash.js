// Dummy Data (Replace with Firebase Data)
const requests = [
    { name: "John Doe", age: 45, gender: "Male", needs: "Medical Aid", lat: 28.7041, lng: 77.1025, status: "Pending" },
    { name: "Mary Jane", age: 32, gender: "Female", needs: "Shelter", lat: 19.0760, lng: 72.8777, status: "Pending" },
    { name: "Ravi Kumar", age: 60, gender: "Male", needs: "Food & Water", lat: 13.0827, lng: 80.2707, status: "Pending" },
    { name: "Sita Patel", age: 50, gender: "Female", needs: "Rehabilitation", lat: 22.5726, lng: 88.3639, status: "Pending" }
];

let map;
let markers = [];

// Initialize Map
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 20.5937, lng: 78.9629 }, // Center of India
        zoom: 5,
    });

    // Add Homeless People Locations on Map
    requests.forEach((request, index) => {
        const marker = new google.maps.Marker({
            position: { lat: request.lat, lng: request.lng },
            map: map,
            icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png" // Red Marker for Homeless People
        });

        markers.push(marker);

        // Info Window
        const infoWindow = new google.maps.InfoWindow({
            content: `<strong>${request.name}</strong><br>Needs: ${request.needs}`
        });

        marker.addListener("click", () => {
            infoWindow.open(map, marker);
        });
    });
}

// Load Shelter Requests
function loadRequests() {
    const requestList = document.getElementById("requestList");
    requestList.innerHTML = "";

    requests.forEach((req, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${req.name}</td>
            <td>${req.age}</td>
            <td>${req.gender}</td>
            <td>${req.needs}</td>
            <td><button onclick="showOnMap(${index})">📍 View Location</button></td>
            <td>${req.status}</td>
            <td>
                <button class="accept-btn" onclick="acceptRequest(${index})">✅ Accept</button>
                <button class="reject-btn" onclick="declineRequest(${index})">❌ Decline</button>
            </td>
        `;

        requestList.appendChild(row);
    });
}

// Show Location on Map
function showOnMap(index) {
    const req = requests[index];
    const location = { lat: req.lat, lng: req.lng };

    map.setCenter(location);
    map.setZoom(12);
}

// Accept Request
function acceptRequest(index) {
    requests[index].status = "Accepted";
    alert(`Shelter request accepted for ${requests[index].name}`);
    loadRequests();
}

// Decline Request
function declineRequest(index) {
    requests[index].status = "Declined";
    alert(`Shelter request declined for ${requests[index].name}`);
    loadRequests();
}

// Load Data on Page Load
window.onload = function () {
    loadRequests();
    initMap();
};