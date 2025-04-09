import { mapKey } from "./keys.js";
let id = 8;
(g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})
  ({key: `AIzaSyBzlUFvIOR_ib5xbh03sYh7To5nk93DqBI`, v: "weekly"});
  

const reportForm = document.getElementById('report-form');

import { getReports, saveReports } from "./data-accounts.js";

// Render reports function
function renderReports(filterLocation = '') {
  const container = document.getElementById('reports-container');
  container.innerHTML = '';
  const reports = getReports();
  const filteredReports = filterLocation
    ? reports.filter(report =>
        report.location.toLowerCase().includes(filterLocation.toLowerCase())
      )
    : reports;

  filteredReports.forEach((report) => {
    const div = document.createElement('div');
    div.className = 'report-info-container';

    div.innerHTML = `
      <div>
        <h1 class="report-title">${report.title}</h1>
        <h2 class="report-status">Status:${report.status}</h2>
      </div>
      <h3 class="report-location">Location: ${report.location}</h3>
      <h4 class="report-description">Description: ${report.description}</h4>
      <button class="sub-${report.id}"> Subscribe </button>
    `;

    // Event listener for the "Subscribe" button
    div.querySelector(`.sub-${report.id}`).addEventListener('click', () => {
      // Change the user of the report to 'citizen'
      report.user = 'citizen';

      // Optionally, save the updated reports to persist changes
      saveReports();

      // Refresh the reports after subscription
      renderReports(filterLocation);
    });

    div.addEventListener('click', () => {
      const service = new google.maps.places.PlacesService(map);
      const request = {
        query: report.location,
        fields: ['name', 'geometry']
      };

      service.findPlaceFromQuery(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results[0]?.geometry) {
          const loc = results[0].geometry.location;
          map.setCenter(loc);
          map.setZoom(19);

          new google.maps.Marker({
            position: loc,
            map: map,
            title: report.title
          });
        }
      });
    });

    container.appendChild(div);
  });
}



// Initial render of reports
renderReports();

// Form submission logic
reportForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const reports = getReports();
  const title = document.getElementById('title').value;
  const location = document.getElementById('location').value;
  const description = document.getElementById('description').value;
  const user = "citizen";
  const status = "Pending";
  id = id +1;

  const newReport = { id, user, title, location, status, description };

  // Add the new report to the reports array
  reports.push(newReport);

  // Render the updated reports
  saveReports();
  renderReports();

  // Reset the form after submission
  reportForm.reset();
});
const searchInput = document.getElementById('search-bar');
const defaultCenter = { lat: 43.651, lng: -79.347 }; // Default map center (Toronto)
const defaultZoom = 12; // Default zoom level

searchInput.addEventListener('change', () => {
  const searchLocation = searchInput.value.trim();

  if (!searchLocation) {
    // If the search input is empty, reset the map to its original position
    map.setCenter(defaultCenter);
    map.setZoom(defaultZoom);
    return; // Exit the function early
  }

  renderReports(searchLocation);

  // Use PlacesService to geocode the input and center the map
  const service = new google.maps.places.PlacesService(map);
  const request = {
    query: searchLocation,
    fields: ['name', 'geometry']
  };

  service.findPlaceFromQuery(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK && results && results.length > 0) {
      const location = results[0].geometry.location;
      
      // Check if location is available and zoom
      if (location) {
        map.setCenter(location);
        map.setZoom(16);
      }
    } else {
      console.error("No results found for location:", searchLocation);
    }
  });
});

// Map and search box initialization
let map;
let searchBox;
let searchReview;

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");
  const { SearchBox } = await google.maps.importLibrary("places");

  map = new Map(document.getElementById("map"), {
    center: { lat: 43.651, lng: -79.347 },
    zoom: 12,
  });

  const input = document.getElementById("search-bar");
  const inputReport = document.getElementById("location");

  searchBox = new SearchBox(input);
  searchReview = new SearchBox(inputReport);

  map.addListener("bounds_changed", () => {
    searchBox.setBounds(map.getBounds());
  });

  searchBox.addListener("places_changed", () => {
    const places = searchBox.getPlaces();

    if (!places || places.length === 0) return;

    const bounds = new google.maps.LatLngBounds();

    places.forEach(place => {
      if (!place.geometry) return;

      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });

    map.fitBounds(bounds);
  });

  searchReview.addListener("places_changed", () => {
    const places = searchReview.getPlaces();

    if (!places || places.length === 0) return;

    const bounds = new google.maps.LatLngBounds();

    places.forEach(place => {
      if (!place.geometry) return;

      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });

    map.fitBounds(bounds);
  });
}

initMap();

// Form popup control
const openFormBtn = document.getElementById('report-button');
const popupForm = document.getElementById('report-form-container');

openFormBtn.addEventListener('click', function() {
  popupForm.style.display = 'flex';
});

window.addEventListener('click', function(event) {
  if (event.target === popupForm) {
    popupForm.style.display = 'none';
  }
});


