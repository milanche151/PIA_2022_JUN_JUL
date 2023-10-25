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
exports.CompanyCotroller = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const company_1 = __importDefault(require("../models/company"));
const user_1 = __importDefault(require("../models/user"));
const request_1 = __importDefault(require("../models/request"));
const purchaser_1 = __importDefault(require("../models/purchaser"));
const PCompany_1 = __importDefault(require("../models/PCompany"));
const goodsinfo_1 = __importDefault(require("../models/goodsinfo"));
const goodsW_1 = __importDefault(require("../models/goodsW"));
const kind_1 = __importDefault(require("../models/kind"));
class CompanyCotroller {
    constructor() {
        this.addComp = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let error = false;
            let isin = false;
            let u = yield user_1.default.findOne({ "username": req.body.user.username });
            if (u != null) {
                if (u.type == 2 || u.type == 1) {
                    res.json({ "message": "Korisnik sa tim k. imenom vec postoji" });
                    return;
                }
                else {
                    //console.log("Usao");
                    isin = true;
                    try {
                        yield user_1.default.updateOne({ "username": req.body.user.username }, { "type": 2 });
                    }
                    catch (err) {
                        console.log(err);
                        res.status(400).json({ "message": "greška" });
                    }
                }
            }
            if (!isin) {
                u = yield user_1.default.create({
                    _id: new mongoose_1.default.Types.ObjectId(),
                    firstname: req.body.user.firstname,
                    lastname: req.body.user.lastname,
                    username: req.body.user.username,
                    password: req.body.user.password,
                    type: req.body.user.type
                });
            }
            let comp = new company_1.default({
                korisnik: u._id,
                telefon: req.body.tel,
                mejl: req.body.mail,
                naziv: req.body.name,
                adresa: req.body.adr,
                pib: req.body.pib,
                maticnibroj: req.body.mat,
                slika: req.body.img,
                status: req.body.status,
                kategorija: null,
                sif: null,
                pdv: null,
                ziro: null,
                magacini: null,
                mag: null,
                kase: null,
                kas: null
            });
            request_1.default.deleteOne({ "pib": comp.pib }, (err, resp) => {
                if (err) {
                    res.status(400).json({ "message": "greska pri odbijanju zahteva" });
                    error = true;
                }
            });
            yield comp.save((err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "message": "greška-kompanija" });
                    error = true;
                }
            });
            if (!error) {
                res.json({ "message": "Kompanija ubacena" });
                return;
            }
        });
        this.addReq = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let error = false;
            let isin = false;
            const u = yield user_1.default.findOne({ "username": req.body.user.username });
            if (u != null) {
                res.json({ "message": "Korisnik sa tim k. imenom vec postoji" });
                return;
            }
            let user = yield user_1.default.create({
                _id: new mongoose_1.default.Types.ObjectId(),
                firstname: req.body.user.firstname,
                lastname: req.body.user.lastname,
                username: req.body.user.username,
                password: req.body.user.password,
                type: req.body.user.type
            });
            let comp = new request_1.default({
                korisnik: user._id,
                telefon: req.body.tel,
                mejl: req.body.mail,
                naziv: req.body.name,
                adresa: req.body.adr,
                pib: req.body.pib,
                maticnibroj: req.body.mat,
                slika: req.body.img
            });
            yield comp.save((err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "message": "greška-zahtev" });
                    error = true;
                }
            });
            if (!error) {
                res.json({ "message": "Zahtev ubacen" });
                return;
            }
        });
        this.addPur = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let company;
            let error = false;
            company = yield company_1.default.findOne({ "maticnibroj": req.body.mat });
            if (company != null) {
                console.log(req.body.brDana);
                try {
                    yield purchaser_1.default.create({
                        kompanija: company._id,
                        brojDana: req.body.brDana,
                        rabat: req.body.rabat
                    });
                }
                catch (err) {
                    console.log(err);
                    res.status(400).json({ "message": "greška-narucilac" });
                    error = true;
                }
            }
            else {
                try {
                    let company = yield PCompany_1.default.create({
                        korisnik: req.body.user._id,
                        telefon: req.body.tel,
                        mejl: req.body.mail,
                        naziv: req.body.name,
                        adresa: req.body.adr,
                        pib: req.body.pib,
                        maticnibroj: req.body.mat,
                        slika: req.body.img,
                        status: null,
                        kategorija: null,
                        sif: null,
                        pdv: null,
                        ziro: null,
                        magacini: null,
                        mag: null,
                        kase: null,
                        kas: null,
                        brojDana: req.body.brDana,
                        rabat: req.body.rabat
                    });
                }
                catch (err) {
                    console.log(err);
                    res.status(400).json({ "message": "greška-narucilac" });
                    error = true;
                }
            }
            if (!error) {
                res.json({ "message": "Narucilac ubacen" });
                return;
            }
        });
    }
    updK(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //console.log(req.body.myComp.maticnibroj)
                yield company_1.default.updateOne({ "maticnibroj": req.body.myComp.maticnibroj }, { $set: { "kas": req.body.kas } });
                res.json({ "message": "Uspesno promenjeno kase" });
            }
            catch (err) {
                res.json({ "message": "greska" });
                console.log(err);
            }
        });
    }
    updM(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //console.log(req.body.myComp.maticnibroj)
                yield company_1.default.updateOne({ "maticnibroj": req.body.myComp.maticnibroj }, { $set: { "mag": req.body.mag } });
                res.json({ "message": "Uspesno promenjeno" });
            }
            catch (err) {
                res.json({ "message": "greska" });
                console.log(err);
            }
        });
    }
    activate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield company_1.default.updateOne({ "maticnibroj": req.body.comp.maticnibroj }, { "status": "aktivno" });
                yield user_1.default.updateOne({ "username": req.body.comp.korisnik.username }, { "type": 2 });
            }
            catch (err) {
                console.log(err);
                res.status(400).json({ "message": "greška" });
            }
            res.json({ "message": "Preduzece aktivno!" });
        });
    }
    deactivate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield company_1.default.updateOne({ "maticnibroj": req.body.comp.maticnibroj }, { "status": "neaktivno" });
                yield user_1.default.updateOne({ "username": req.body.comp.korisnik.username }, { "type": 3 });
            }
            catch (err) {
                console.log(err);
                res.status(400).json({ "message": "greška" });
            }
            res.json({ "message": "Preduzece neaktivno!" });
        });
    }
    getReqs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let firms;
            firms = yield request_1.default.find().populate("korisnik");
            res.json(firms);
        });
    }
    deleteR(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let mb = req.body.maticni;
            let username = req.body.user.username;
            let rek = yield request_1.default.findOne({ "maticnibroj": mb });
            let comp = new company_1.default({
                korisnik: rek.korisnik,
                telefon: rek.telefon,
                mejl: rek.mejl,
                naziv: rek.naziv,
                adresa: rek.adresa,
                pib: rek.pib,
                maticnibroj: rek.maticnibroj,
                slika: rek.slika,
                status: "neaktivno",
                kategorija: null,
                sif: null,
                pdv: null,
                ziro: null,
                magacini: null,
                kase: null
            });
            yield comp.save((err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "message": "greška-zahtev" });
                }
            });
            yield request_1.default.deleteOne({ "maticnibroj": mb });
            res.json({ "message": "Obrisan zahtev" });
        });
    }
    getComp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let firms;
            firms = yield company_1.default.find().populate("korisnik");
            res.json(firms);
        });
    }
    addInfo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let uname = req.body.uname;
            let userid = yield user_1.default.findOne({ "username": uname });
            yield company_1.default.updateOne({ "korisnik": userid._id }, { "kategorija": req.body.kategorija, "sif": req.body.sifra, "pdv": req.body.pdv, "ziro": req.body.ziro, "kase": req.body.kase, "magacini": req.body.magacini });
            res.json({ "message": "Uspesno registorvanje" });
        });
    }
    getMyComp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield user_1.default.findOne({ "username": req.body.uname });
                let comp = yield company_1.default.findOne({ "korisnik": user._id }).populate("korisnik");
                res.json(comp);
            }
            catch (err) {
                console.log(err);
                res.status(400).json(err);
            }
        });
    }
    byPib(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let cmp = null;
            let error = false;
            try {
                cmp = yield company_1.default.find({ "pib": req.body.pib }).populate("korisnik");
                if (cmp == null) {
                    res.json(null);
                    return;
                }
            }
            catch (err) {
                console.log(err);
                res.status(400).json({ "message": "greška-narucilac" });
                error = true;
            }
            res.json(cmp);
        });
    }
    addG(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let error = false;
            try {
                let cmp = yield company_1.default.findOne({ "maticnibroj": req.body.info.comp.maticnibroj });
                let inf = yield goodsinfo_1.default.create({
                    id_comp: cmp._id,
                    sifra: req.body.info.sifra,
                    naziv: req.body.info.naziv,
                    jedinica_mere: req.body.info.jedinica_mere,
                    stopa: req.body.info.stopa,
                    tip: req.body.info.tip,
                    proizvodjac: req.body.info.proizvodjac,
                    zporekla: req.body.info.zporekla,
                    strani_naziv: req.body.info.strani_naziv,
                    barkod: req.body.info.barkod,
                    carinska_tarifa: req.body.info.carinska_tarifa,
                    ekoak: req.body.info.ekoak,
                    minz: req.body.info.minz,
                    maxz: req.body.info.maxz,
                    opis: req.body.info.opis,
                    deklaracija: req.body.info.deklaracija,
                    slika: req.body.info.slika
                });
                for (let i = 0; i < cmp.magacini; i++) {
                    if (req.body.warehouse[i].minkol &&
                        req.body.warehouse[i].maxkol &&
                        req.body.warehouse[i].magacin &&
                        req.body.warehouse[i].nabavna &&
                        req.body.warehouse[i].prodajna &&
                        req.body.warehouse[i].stanje) {
                        let gw = goodsW_1.default.create({
                            id_info: inf._id,
                            minkol: req.body.warehouse[i].minkol,
                            maxkol: req.body.warehouse[i].maxkol,
                            magacin: req.body.warehouse[i].magacin,
                            nabavna: req.body.warehouse[i].nabavna,
                            prodajna: req.body.warehouse[i].prodajna,
                            stanje: req.body.warehouse[i].stanje,
                        });
                    }
                }
            }
            catch (err) {
                console.log(err);
                res.status(400).json({ "message": "greška-narucilac" });
                error = true;
            }
            if (!error) {
                res.json({ "message": "Artikal ubacen" });
                return;
            }
        });
    }
    getGoods(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let mat = req.body.mat;
            let arr, cmp;
            try {
                cmp = yield company_1.default.findOne({ "maticnibroj": mat });
                if (cmp) {
                    arr = yield goodsinfo_1.default.find({ "id_comp": cmp._id });
                }
            }
            catch (err) {
                console.log("GRESKA");
                res.json(null);
                return;
            }
            res.json(arr);
        });
    }
    addkind(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let error = false;
            try {
                kind_1.default.updateOne({ 'name': req.body.name }, { $push: { "goods": req.body.elem } });
            }
            catch (err) {
                console.log(err);
                res.status(400).json({ "message": "greška-narucilac" });
                error = true;
            }
            if (!error) {
                res.json({ "message": "Uspesno ubacen artikal u proizvod" });
            }
        });
    }
    delkind(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let error = false;
            try {
                kind_1.default.updateOne({ 'name': req.body.name }, { $pull: { 'goods': { 'sifra': req.body.elem } } });
            }
            catch (err) {
                console.log(err);
                res.status(400).json({ "message": "greška-narucilac" });
                error = true;
            }
            if (!error) {
                res.json({ "message": "Uspesno ubacen artikal u proizvod" });
            }
        });
    }
    addk(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.CompanyCotroller = CompanyCotroller;
//# sourceMappingURL=company.controller.js.map