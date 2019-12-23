"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FruitService = (function () {
    function FruitService() {
        this.fruits = [{ name: "Apple" }, { name: "Coconut" }, { name: "Banana" }, { name: "Pear" }];
    }
    FruitService.prototype.getAll = function () {
        return this.fruits;
    };
    return FruitService;
}());
exports.FruitService = FruitService;
