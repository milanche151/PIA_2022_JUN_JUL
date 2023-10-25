"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Request = new Schema({
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
    }
});
exports.default = mongoose_1.default.model('RequestModel', Request, 'requests');
//# sourceMappingURL=request.js.map