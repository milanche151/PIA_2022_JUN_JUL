"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Purch = new Schema({
    kompanija: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "CompanyModel"
    },
    brojDana: {
        type: Number
    },
    rabat: {
        type: Number
    }
});
exports.default = mongoose_1.default.model('PurchModel', Purch, 'purchasers');
//# sourceMappingURL=purchaser.js.map