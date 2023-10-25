"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Company = new Schema({
    korisnik: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "UserModel"
    },
    telefon: {
        type: String
    },
    mejl: {
        type: String
    },
    naziv: {
        type: String
    },
    adresa: {
        type: Array()
    },
    pib: {
        type: String
    },
    maticnibroj: {
        type: String
    },
    slika: {
        type: String
    },
    status: {
        type: String
    },
    kategorija: {
        type: String,
    },
    sif: {
        type: Array()
    },
    pdv: {
        type: Boolean
    },
    ziro: {
        type: Array()
    },
    magacini: {
        type: Number
    },
    mag: {
        type: Array()
    },
    kase: {
        type: Number
    },
    kas: {
        type: Array()
    }
});
exports.default = mongoose_1.default.model('CompanyModel', Company, 'companies');
//# sourceMappingURL=company.js.map