"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("../models/user"));
const customer_1 = __importDefault(require("../models/customer"));
class UserController {
    constructor() {
        this.login = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            user_1.default.findOne({ 'username': username, 'password': password }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.register = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let user = yield user_1.default.create({
                _id: new mongoose_1.default.Types.ObjectId(),
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                username: req.body.username,
                password: req.body.password,
                type: req.body.type
            });
            let cust = new customer_1.default({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                username: req.body.username,
                password: req.body.password,
                type: req.body.type,
                tel: req.body.tel,
                brojlk: req.body.blk
            });
            let uname;
            user_1.default.findOne({ 'username': cust.username }, (err, user) => {
                if (err)
                    console.log(err);
                else if (user == null) {
                    uname = null;
                }
                else {
                    uname = user.username;
                }
            });
            yield cust.save((err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "message": "error" });
                }
                else if (uname != null) {
                    res.json({ "message": "Korisnik sa korisnickim imenom " + uname + " vec postoji" });
                }
                else
                    res.json({ "message": "ok" });
            });
        });
        this.changePassword = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            user_1.default.updateOne({ 'username': username }, { 'password': password }, (err, user) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "message": "error" });
                }
                else
                    res.json({ "message": "Šifra uspešno promenjena" });
            });
        };
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map