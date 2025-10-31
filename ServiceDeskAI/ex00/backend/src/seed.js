require('dotenv').config();
const mongoose = require('mongoose');
const Office = require('./models/Office');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

const seedOffices = async () => {
  try {
    await connectDB();

    // Clear existing offices
    await Office.deleteMany();

    // Create sample offices
    const offices = [
      {
        name: 'Globant Madrid',
        address: {
          street: 'Calle de Velázquez',
          city: 'Madrid',
          state: 'Madrid',
          country: 'Spain',
          zipCode: '28001',
        },
        location: {
          type: 'Point',
          coordinates: [-3.6879, 40.4168], // [longitude, latitude]
        },
        floors: 5,
        workstations: [
          { name: 'Desk 1A', floor: 1, capacity: 1 },
          { name: 'Desk 1B', floor: 1, capacity: 1 },
          { name: 'Meeting Room A', floor: 2, capacity: 8 },
        ],
        amenities: ['WiFi', 'Coffee', 'Parking', 'Gym'],
        contactEmail: 'madrid@globant.com',
        contactPhone: '+34 123 456 789',
      },
      {
        name: 'Globant Málaga',
        address: {
          street: 'Boulevard Louis Pasteur',
          city: 'Málaga',
          state: 'Andalucía',
          country: 'Spain',
          zipCode: '29010',
        },
        location: {
          type: 'Point',
          coordinates: [-4.4214, 36.7213],
        },
        floors: 3,
        workstations: [
          { name: 'Desk 2A', floor: 1, capacity: 1 },
          { name: 'Desk 2B', floor: 1, capacity: 1 },
        ],
        amenities: ['WiFi', 'Coffee', 'Terrace'],
        contactEmail: 'malaga@globant.com',
        contactPhone: '+34 987 654 321',
      },
      {
        name: 'Globant Buenos Aires',
        address: {
          street: 'Av. Corrientes',
          city: 'Buenos Aires',
          state: 'Buenos Aires',
          country: 'Argentina',
          zipCode: 'C1043',
        },
        location: {
          type: 'Point',
          coordinates: [-58.3816, -34.6037],
        },
        floors: 8,
        workstations: [
          { name: 'Desk 3A', floor: 1, capacity: 1 },
          { name: 'Desk 3B', floor: 2, capacity: 1 },
          { name: 'Conference Room', floor: 3, capacity: 20 },
        ],
        amenities: ['WiFi', 'Coffee', 'Restaurant', 'Gym', 'Game Room'],
        contactEmail: 'buenosaires@globant.com',
        contactPhone: '+54 11 1234 5678',
      },
    ];

    await Office.insertMany(offices);
    console.log('✅ Sample offices created');
    process.exit();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

seedOffices();
