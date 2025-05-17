const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const House = require("../models/house.model");
const User = require("../models/user.model");

// Categories matching your frontend categoryApi
const categories = [
  "House",
  "Apartment",
  "Tree house",
  "Boat",
  "Cabin",
  "Camper",
  "Castle",
  "Cave",
  "Container",
  "Dome",
  "Earth home",
  "Tent",
  "Tower",
  "Hotel",
  "Pool",
  "Grill",
  "Campfire",
  "Tennis court",
  "Ski in/ Ski out"
];

async function seedHouses() {
  try {
    console.log("🧹 Deleting existing users and houses...");
    await User.deleteMany({});
    await House.deleteMany({});

    console.log("👤 Seeding 5 users...");
    const users = [];
    for (let i = 0; i < 5; i++) {
      users.push({
        name: {
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName()
        },
        emailId: faker.internet.email(),
        password: "test123",
        role: "host"
      });
    }
    const createdUsers = await User.insertMany(users);
    console.log("✅ Inserted 5 users");

    console.log("🏡 Seeding 50 houses...");
    const houses = [];
    for (let i = 0; i < 50; i++) {
      houses.push({
        author: faker.helpers.arrayElement(createdUsers)._id,
        status: "Complete",
        houseType: faker.helpers.arrayElement(categories),
        privacyType: "Entire Place",
        location: {
          country: faker.location.country(),
          addressLineOne: faker.location.streetAddress(),
          addressLineTwo: faker.location.secondaryAddress(),
          city: faker.location.city(),
          state: faker.location.state(),
          postCode: faker.location.zipCode()
        },
        floorPlan: {
          guests: faker.number.int({ min: 1, max: 6 }),
          bedrooms: faker.number.int({ min: 1, max: 3 }),
          beds: faker.number.int({ min: 1, max: 3 }),
          bathroomsNumber: faker.number.int({ min: 1, max: 2 })
        },
        amenities: ["WiFi", "TV", "AC", "Heater"],
        photos: [
          faker.image.url(),
          faker.image.url(),
          faker.image.url()
        ],
        title: faker.company.catchPhrase(),
        highlight: [faker.lorem.word(), faker.lorem.word()],
        description: faker.lorem.sentences(2),
        visibility: "Public",
        guestType: faker.helpers.arrayElement(["Family", "Solo", "Business"]),
        priceAfterTaxes: faker.number.int({ min: 100, max: 500 }),
        authorEarnedPrice: faker.number.int({ min: 80, max: 450 }),
        basePrice: faker.number.int({ min: 60, max: 400 }),
        security: ["ID Check"],
        ratings: faker.number.float({ min: 3, max: 5, precision: 0.1 })
      });
    }

    const result = await House.insertMany(houses);
    console.log(`✅ Successfully inserted ${result.length} houses`);
  } catch (err) {
    console.error("❌ Error inserting seed data:", err.message);
  }
}

module.exports = seedHouses;
