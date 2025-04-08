import { mapKey } from "./keys.js";

(g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})
  ({key: `${mapKey}`, v: "weekly"});
  

const reportForm = document.getElementById('report-form');

// Initialize the reports array with predefined reports
let reports = [
  {
    title: 'Potholes near Mcdonalds',
    location: "McDonald's, Yonge Street, Toronto, ON, Canada",
    description: 'Several large potholes have appeared near the intersection with Bathurst Street. These potholes are causing damage to vehicles and posing a risk to cyclists. Immediate repair work is needed to ensure the safety and smooth flow of traffic in this busy area.'
  },
  {
    title: 'Pothole',
    location: "McDonald's, Yonge Street, Toronto, ON, Canada",
    description: 'There are potholes near the mcdonlads in TMU.'
  },

  {
    title: 'Flooding Near Scarborough Bluffs',
    location: "Scarborough Bluffs Park, Scarborough, ON, Canada",
    description: "Heavy rainfall has led to localized flooding near Bluffer’s Park, close to the Scarborough Bluffs. The area becomes impassable for pedestrians and cyclists during storms, and there's concern about potential erosion of the shoreline. Drainage improvements and flood prevention measures are necessary to mitigate the issue."
  },

  {
    title: 'Graffiti on TTC Subway Stations',
    location: "Dundas Subway Station, Dundas Street East, Toronto, ON, Canada",
    description: 'The tags are unsightly and contribute to a negative impression of public transit.'
  },

  {
    title: 'Uneven Pavement on College Street',
    location: "Toronto Metropolitan University, Victoria Street, Toronto, ON, Canada",
    description: "The pavement on College Street between Bathurst and Spadina has become uneven, leading to tripping hazards for pedestrians and creating problems for cyclists. The city should consider resurfacing this stretch of road to ensure safety for all residents and visitors."
  },

  {
    title: 'Poor Street Lighting',
    location: "Toronto Metropolitan University, Victoria Street, Toronto, ON, Canada",
    description: "Street lighting is inadequate on Dundas Street East, specifically between Parliament and Jarvis Street. The dimly lit streets create unsafe conditions at night, particularly for pedestrians and cyclists. There are calls for brighter street lamps and improved lighting infrastructure to enhance safety in the area."
  },

  {
    title: 'Hanging Sign',
    location: "Toronto Metropolitan University, Victoria Street, Toronto, ON, Canada",
    description: "There is a hanging sign that looks like its about to fall above the TMU SLC. It might hurt someone"
  },

  {
    title: 'Damaged Park Benches',
    location: "High Park, Bloor Street West, Toronto, ON, Canada",
    description: "Several park benches near Grenadier Pond in High Park are damaged or missing, making it difficult for visitors to relax and enjoy the natural surroundings. The city should prioritize replacing or repairing the benches to ensure that the park remains an accessible and enjoyable space for all."
  },
];

// Render reports function
function renderReports(filterLocation = '') {
  const container = document.getElementById('reports-container');
  container.innerHTML = '';

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
        <h2 class="report-status">Status: New</h2>
      </div>
      <h3 class="report-location">Location: ${report.location}</h3>
      <h4 class="report-description">Description: ${report.description}</h4>
    `;

    container.appendChild(div);
  });
}

// Initial render of reports
renderReports();

// Form submission logic
reportForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const location = document.getElementById('location').value;
  const description = document.getElementById('description').value;

  const newReport = { title, location, description };

  // Add the new report to the reports array
  reports.push(newReport);

  // Render the updated reports
  renderReports();

  // Reset the form after submission
  reportForm.reset();
});

// Handle search functionality for filtering reports by location
const searchInput = document.getElementById('search-bar');
searchInput.addEventListener('change', () => {
  const searchLocation = searchInput.value.trim();
  renderReports(searchLocation);

  // Use PlacesService to geocode the input and center the map
  const service = new google.maps.places.PlacesService(map);
  const request = {
    query: searchLocation,
    fields: ['name', 'geometry']
  };

  service.findPlaceFromQuery(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK && results && results[0].geometry) {
      const location = results[0].geometry.location;
      map.setCenter(location);
      map.setZoom(14);
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
    zoom: 8,
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

    if (!