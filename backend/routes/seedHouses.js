const House = require("../models/house.model");
const { faker } = require("@faker-js/faker");


async function seedHouses() {
  try {
    console.log("🚀 Generating house data...");

    const houses = [];

    for (let i = 0; i < 50; i++) {
      houses.push({
        author: faker.name.findName(),
        status: "Available",
        houseType: "Villa",
        privacyType: "Entire Place",
        location: {
          country: faker.address.country(),
          addressLineOne: faker.address.streetAddress(),
          addressLineTwo: faker.address.secondaryAddress(),
          city: faker.address.city(),
          state: faker.address.state(),
          postCode: faker.address.zipCode()
        },
        floorPlan: {
          guests: 4,
          bedrooms: 2,
          beds: 2,
          bathroomsNumber: 1
        },
        amenities: ["WiFi", "TV", "AC"],
        photos: [faker.image.imageUrl()],
        title: faker.company.catchPhrase(),
        highlight: ["Sea View", "Luxury Stay"],
        description: faker.lorem.sentence(),
        visibility: "Public",
        guestType: "Family",
        priceAfterTaxes: 150,
        authorEarnedPrice: 120,
        basePrice: 100,
        security: ["ID Check"],
        ratings: 4.5
      });
    }

    console.log("📦 Inserting 50 houses...");
    const result = await House.insertMany(houses, { ordered: true });

    console.log(`✅ Successfully inserted ${result.length} houses`);
  } catch (err) {
    console.error("❌ Insert failed:");
    if (err.writeErrors) {
      err.writeErrors.forEach((we, i) => {
        console.error(`❌ Doc ${i + 1}: ${we.errmsg || we.message}`);
      });
    } else if (err.name === "ValidationError") {
      console.error("❌ Validation Error:");
      for (const field in err.errors) {
        console.error(`  - ${field}: ${err.errors[field].message}`);
      }
    } else {
      console.error(err.message);
    }
  }
}

module.exports = seedHouses;
