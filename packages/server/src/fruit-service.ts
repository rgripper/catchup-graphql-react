export class FruitService {
  fruits = [{ name: "Apple" }, { name: "Coconut" }, { name: "Banana" }, { name: "Pear" }];

  getAll() {
    return this.fruits;
  }
}
