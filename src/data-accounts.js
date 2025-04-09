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

let reports = [
  {
    title: 'Potholes near Mcdonalds',
    location: "McDonald's, Yonge Street, Toronto, ON, Canada",
    status: "New",
    description: 'Several large potholes have appeared near the intersection with Bathurst Street. These potholes are causing damage to vehicles and posing a risk to cyclists. Immediate repair work is needed to ensure the safety and smooth flow of traffic in this busy area.'
  },
  {
    title: 'Pothole',
    location: "McDonald's, Yonge Street, Toronto, ON, Canada",
    status: "In Progress",
    description: 'There are potholes near the mcdonlads in TMU.'
  },

  {
    title: 'Flooding Near Scarborough Bluffs',
    location: "Scarborough Bluffs Park, Scarborough, ON, Canada",
    status: "New",
    description: "Heavy rainfall has led to localized flooding near Bluffer’s Park, close to the Scarborough Bluffs. The area becomes impassable for pedestrians and cyclists during storms, and there's concern about potential erosion of the shoreline. Drainage improvements and flood prevention measures are necessary to mitigate the issue."
  },

  {
    title: 'Graffiti on TTC Subway Stations',
    location: "Dundas Subway Station, Dundas Street East, Toronto, ON, Canada",
    status: "Completed",
    description: 'The tags are unsightly and contribute to a negative impression of public transit.'
  },

  {
    title: 'Uneven Pavement on College Street',
    location: "Toronto Metropolitan University, Victoria Street, Toronto, ON, Canada",
    status: "New",
    description: "The pavement on College Street between Bathurst and Spadina has become uneven, leading to tripping hazards for pedestrians and creating problems for cyclists. The city should consider resurfacing this stretch of road to ensure safety for all residents and visitors."
  },

  {
    title: 'Poor Street Lighting',
    location: "Toronto Metropolitan University, Victoria Street, Toronto, ON, Canada",
    status: "New",
    description: "Street lighting is inadequate on Dundas Street East, specifically between Parliament and Jarvis Street. The dimly lit streets create unsafe conditions at night, particularly for pedestrians and cyclists. There are calls for brighter street lamps and improved lighting infrastructure to enhance safety in the area."
  },

  {
    title: 'Hanging Sign',
    location: "Toronto Metropolitan University, Victoria Street, Toronto, ON, Canada",
    status: "New",
    description: "There is a hanging sign that looks like its about to fall above the TMU SLC. It might hurt someone"
  },

  {
    title: 'Damaged Park Benches',
    location: "High Park, Bloor Street West, Toronto, ON, Canada",
    status: "New",
    description: "Several park benches near Grenadier Pond in High Park are damaged or missing, making it difficult for visitors to relax and enjoy the natural surroundings. The city should prioritize replacing or repairing the benches to ensure that the park remains an accessible and enjoyable space for all."
  },
];

export {citizenAccounts, adminAccounts, reports}