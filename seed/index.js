const { faker } = require('@faker-js/faker');
const { join } = require('path');
const { writeFile } = require('fs/promises');

const Car = require('../src/entities/car');
const CarCategory = require('../src/entities/carCategory');
const Customer = require('../src/entities/customer');

const seederBaseFolder = join(__dirname, '../', 'database');
const ITEMS_AMOUNT = 2;
const cars = [];
const customers = [];

const write = (filename, data) => writeFile(join(seederBaseFolder, filename), JSON.stringify(data));

const carCategory = new CarCategory({
  id: faker.string.uuid(),
  name: faker.vehicle.type(),
  carIds: [],
  price: faker.finance.amount({ min: 20, max: 100 }),
});

for (let index = 0; index < ITEMS_AMOUNT; index++) {
  const car = new Car({
    id: faker.string.uuid(),
    name: faker.vehicle.model(),
    available: true,
    gasAvailable: true,
    releaseYear: faker.date.past().getFullYear(),
  });
  carCategory.carIds.push(car.id);
  cars.push(car);

  const costumer = new Customer({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    age: faker.number.int({ min: 18, max: 99 }),
  });
  customers.push(costumer);
}

(async () => {
  await write('cars.json', cars);
  await write('carCategories.json', [carCategory]);
  await write('customers.json', [customers]);
})();
