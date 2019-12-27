"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var v1_1 = __importDefault(require("uuid/v1"));
var FruitService = (function () {
    function FruitService() {
        this.fruits = [
            { id: v1_1.default(), name: "Apple" },
            { id: v1_1.default(), name: "Coconut" },
            { id: v1_1.default(), name: "Banana" },
            { id: v1_1.default(), name: "Pear" }
        ];
    }
    FruitService.prototype.add = function (_a) {
        var name = _a.name;
        var newFruit = { id: v1_1.default(), name: name };
        this.fruits.push(newFruit);
        return newFruit;
    };
    FruitService.prototype.getAll = function () {
        return this.fruits;
    };
    return FruitService;
}());
exports.FruitService = FruitService;
