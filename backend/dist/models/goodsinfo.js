"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let GoodsInfo = new Schema({
    id_comp: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "CompanyModel"
    }, sifra: {
        type: String
    },
    naziv: {
        type: String
    },
    jedinica_mere: {
        type: String
    },
    stopa: {
        type: Number
    },
    tip: {
        type: String
    },
    proizvodjac: {
        type: String
    },
    zporekla: {
        type: String
    },
    strani_naziv: {
        type: String
    },
    barkod: {
        type: String
    },
    carinska_tarifa: {
        type: Number
    },
    ekoak: {
        type: String,
    }, minz: {
        type: Number
    }, maxz: {
        type: Number
    }, opis: {
        type: String
    },
    deklaracija: {
        type: String
    },
    slika: {
        type: String
    }
});
exports.default = mongoose_1.default.model('GoodsInfoModel', GoodsInfo, 'goodsinfo');
//# sourceMappingURL=goodsinfo.js.map