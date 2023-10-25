"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
class good {
}
const Schema = mongoose_1.default.Schema;
let Kind = new Schema({
    name: {
        type: String
    },
    goods: {
        type: [{ gd: good }]
    }
});
exports.default = mongoose_1.default.model('KindModel', Kind, 'kinds');
//# sourceMappingURL=kind.js.map