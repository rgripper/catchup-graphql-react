import uuid from "uuid/v1";

export class FruitService {
  fruits = [
    { id: uuid(), name: "Apple" },
    { id: uuid(), name: "Coconut" },
    { id: uuid(), name: "Banana" },
    { id: uuid(), name: "Pear" }
  ];

  add({ name }) {
    const newFruit = { id: uuid(), name };
    this.fruits.push(newFruit);
    return newFruit;
  }

  getAll() {
    return this.fruits;
  }
}
