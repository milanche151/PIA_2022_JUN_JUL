"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let GoodsW = new Schema({
    id_info: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "GoodsInfoModel"
    },
    minkol: {
        type: Number
    },
    maxkol: {
        type: Number
    },
    magacin: {
        type: String
    },
    nabavna: {
        type: Number
    },
    prodajna: {
        type: Number
    },
    stanje: {
        type: Number
    }
});
exports.default = mongoose_1.default.model('GoodsWModel', GoodsW, 'goodswarehouse');
//# sourceMappingURL=goodsW.js.map