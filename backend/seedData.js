require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const User = require('./models/User'); // Make sure to adjust the path based on your project structure

const names = [
    'John', 'Jane', 'Mike', 'Sarah', 'Tom', 'Lily', 'Alex', 'Emma', 'Andrei',
    'Oliver', 'Amelia', 'Noah', 'Harper', 'Ethan', 'Charlotte', 'Lisa', 'Peter', 'Kate',
];
const interests = [
    'Reading', 'Hiking', 'Coding', 'Cooking', 'Traveling', 'Photography', 'Painting', 'Yoga', 'Swimming',
    'Running', 'Baking', 'Dancing', 'Writing', 'Gaming', 'Volunteering', 'Learning Languages', 'Gardening', 'Woodworking', 'Pottery'
]
function getRandomNumber(min, max) {
    return Math.ceil(Math.random() * (max - min)) + min - 1;
}

function getRandomData () {
    const randomName = names[Math.floor(Math.random() * names.length)];
    return {
        name: randomName,
        age: getRandomNumber(18,70),
        email: `${Math.random().toString(36).substring(7)}@example.com`,
        interests: interests[Math.floor(Math.random() * interests.length)],
        address: getRandomNumber(100,999),
    };
}

async function seed() {
  try {
    // Connect to the database
    connectDB();

    // Drop the collection to ensure we're starting fresh
    await User.deleteMany({});

    // Insert 200 random users
    const users = [];
    for (let i = 0; i < 300; i++) {
      users.push(getRandomData());
    }

    const insertedUsers = await User.insertMany(users);

    console.log('Seeding successful!');
  } catch (error) {
    console.error('Error seeding:', error);
  } finally {
    // Close the connection after seeding
    await mongoose.connection.close();
  }
}

seed().then(() => {
  process.exit(0);
});
