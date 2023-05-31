// const faker = require('faker');
const { faker } = require('@faker-js/faker');

function generateCatalogData(count) {
  const catalogData = [];
  for (let i = 0; i < count; i++) {
    const catalogItem = {
      name: faker.commerce.productName(),
      description: faker.lorem.sentence(),
      url: faker.internet.url(),
      cost1: faker.number.int({min: 50, max: 1000}),
      cost2: faker.number.int({min: 50, max: 1000}),
      cost3: faker.number.int({min: 50, max: 1000}),
      req1: faker.number.int({min: 1, max: 10}),  
      req2: faker.number.int({min: 1, max: 10}),
      req3: faker.number.int({min: 1, max: 10}),
      category: faker.number.int({min: 50, max: 1000}),
    };
    catalogData.push(catalogItem);
  }
  return catalogData;
}

function generateUserData(numItems) {
  const userData = [];

  for (let i = 0; i < numItems; i++) {
    const user = {
      address: faker.finance.bitcoinAddress(),
      cash1: faker.finance.amount(),
      cash2: faker.finance.amount(),
      cash3: faker.finance.amount(),
    };
    userData.push(user);
  }
  return userData;
}

async function generateAssetData(numItems, UserCollection) {
  const assetData = [];
  const addresses = await UserCollection.find().toArray();
  for (let i = 0; i < numItems; i++) {
    const address = faker.helpers.arrayElement(addresses).address
    const asset = {
      type: faker.number.int({ min: 1, max: 3 }),
      level: faker.number.int({ min: 1, max: 10 }),
      address,
    };
    assetData.push(asset);
  }
  return assetData;
}

function generateProductData(numItems) {
  const productData = [];

  for (let i = 0; i < numItems; i++) {
    const product = {
      address: faker.finance.bitcoinAddress(),
      id: faker.number.int(),
    };
    productData.push(product);
  }
  return productData;
}

module.exports = {
  async up(db, client) {
    await db.collection('catalogs').insertMany(generateCatalogData(30));
    await db.collection('users').insertMany(generateUserData(50));
    const assetsData = await generateAssetData(20, db.collection('users'))
    await db.collection('assets').insertMany(assetsData);
    await db.collection('products').insertMany(generateProductData(30));
  },

  async down(db, client) {
    await db.collection('catalogs').deleteMany();
    await db.collection('products').deleteMany();
    await db.collection('assets').deleteMany();
    await db.collection('users').deleteMany();
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
