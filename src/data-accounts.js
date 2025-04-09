const citizenAccounts = [
  {
    firstName: 'Ashley',
    lastName: 'Liu',
    email: 'ashleyliu@gmail.com',
    password: '123456'
  },
  {
    firstName: 'Citizen',
    lastName: 'Citizen LastName',
    email: 'citizen@cypress.com',
    password: 'C123'
  }
]

const adminAccounts = [
  {
    firstName: 'Ashley',
    lastName: 'Liu',
    email: 'ashleyliu@gmail.com',
    password: '123456'
  },
  {
    firstName: 'Admin',
    lastName: 'Admin',
    email: 'admin@cypress.com',
    password: 'C123'
  }
]

let defaultNotifications = [
  {
    title: 'Welcome to Cypress',
    description: 'Your account has been created'
  }
];

const notifications = JSON.parse(localStorage.getItem('notifications')) || defaultNotifications;

export function getNotifications() {
  return notifications;
}

export function saveNotifications() {
  localStorage.setItem('notifications', JSON.stringify(notifications));
}

// New function to add a notification when report status is updated
export function addNotification(title, status) {
  const description = `Your report has been marked as: ${status}`;
  notifications.push({ title, description });
  saveNotifications();
}

let defaultReports = [
  {
    id: '1',
    user: 'citizen',
    title: 'Potholes near Mcdonalds',
    location: "McDonald's, Yonge Street, Toronto, ON, Canada",
    status: "Pending",
    description: 'Several large potholes have appeared near the intersection with Bathurst Street. These potholes are causing damage to vehicles and posing a risk to cyclists. Immediate repair work is needed to ensure the safety and smooth flow of traffic in this busy area.'
  },
  {
    id: '2',
    title: 'Pothole',
    user: 'citizen',
    location: "McDonald's, Yonge Street, Toronto, ON, Canada",
    status: "In Progress",
    description: 'There are potholes near the mcdonlads in TMU.'
  },

  {
    id: '3',
    title: 'Flooding Near Scarborough Bluffs',
    user: 'citizen',
    location: "Scarborough Bluffs Park, Scarborough, ON, Canada",
    status: "Pending",
    description: "Heavy rainfall has led to localized flooding near Bluffer’s Park, close to the Scarborough Bluffs. The area becomes impassable for pedestrians and cyclists during storms, and there's concern about potential erosion of the shoreline. Drainage improvements and flood prevention measures are necessary to mitigate the issue."
  },

  {
    id: '4',
    title: 'Graffiti on TTC Subway Stations',
    user: 'citizen',
    location: "Dundas Subway Station, Dundas Street East, Toronto, ON, Canada",
    status: "Completed",
    description: 'The tags are unsightly and contribute to a negative impression of public transit.'
  },

  {
    id: '5',
    title: 'Uneven Pavement on College Street',
    user: 'ashley',
    location: "Toronto Metropolitan University, Victoria Street, Toronto, ON, Canada",
    status: "Pending",
    description: "The pavement on College Street between Bathurst and Spadina has become uneven, leading to tripping hazards for pedestrians and creating problems for cyclists. The city should consider resurfacing this stretch of road to ensure safety for all residents and visitors."
  },

  {
    id: '6',
    title: 'Poor Street Lighting',
    user: 'ashley',
    location: "Toronto Metropolitan University, Victoria Street, Toronto, ON, Canada",
    status: "Pending",
    description: "Street lighting is inadequate on Dundas Street East, specifically between Parliament and Jarvis Street. The dimly lit streets create unsafe conditions at night, particularly for pedestrians and cyclists. There are calls for brighter street lamps and improved lighting infrastructure to enhance safety in the area."
  },

  {
    id: '7',
    title: 'Hanging Sign',
    user: 'ashley',
    location: "Toronto Metropolitan University, Victoria Street, Toronto, ON, Canada",
    status: "Pending",
    description: "There is a hanging sign that looks like its about to fall above the TMU SLC. It might hurt someone"
  },

  {
    id: '8',
    title: 'Damaged Park Benches',
    user: 'bozo',
    location: "High Park, Bloor Street West, Toronto, ON, Canada",
    status: "Pending",
    description: "The benches are unstable."
  },
];
const reports = JSON.parse(localStorage.getItem('reports')) || defaultReports;

export function getReports() {
  return reports;
}

export function saveReports() {
  localStorage.setItem('reports', JSON.stringify(reports));
}

export {citizenAccounts, adminAccounts, reports, defaultReports, notifications}