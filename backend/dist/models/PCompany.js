"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let PCompany = new Schema({
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
        type: String
    },
    sif: {
        type: Array()
    },
    pdf: {
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
    },
    brojDana: {
        type: Number
    },
    rabat: {
        type: Number
    }
});
exports.default = mongoose_1.default.model('PCompanyModel', PCompany, 'purchasers');
//# sourceMappingURL=PCompany.js.map