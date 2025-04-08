let map;

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
}

initMap();


const openFormBtn = document.getElementById('report-button');
const popupForm = document.getElementById('report-form-container');

// Open the popup when the button is clicked
openFormBtn.addEventListener('click', function() {
  popupForm.style.display = 'flex';
});



// Close the popup if the user clicks outside of the form
window.addEventListener('click', function(event) {
  if (event.target === popupForm) {
    popupForm.style.display = 'none';
  }
});