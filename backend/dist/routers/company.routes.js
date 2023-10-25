"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const company_controller_1 = require("../controllers/company.controller");
const companyRouter = express_1.default.Router();
companyRouter.route('/register').post((req, res) => new company_controller_1.CompanyCotroller().addComp(req, res));
companyRouter.route('/makereq').post((req, res) => new company_controller_1.CompanyCotroller().addReq(req, res));
companyRouter.route('/getreqs').post((req, res) => new company_controller_1.CompanyCotroller().getReqs(req, res));
companyRouter.route('/deleter').post((req, res) => new company_controller_1.CompanyCotroller().deleteR(req, res));
companyRouter.route('/getcomp').post((req, res) => new company_controller_1.CompanyCotroller().getComp(req, res));
companyRouter.route('/act').post((req, res) => new company_controller_1.CompanyCotroller().activate(req, res));
companyRouter.route('/deact').post((req, res) => new company_controller_1.CompanyCotroller().deactivate(req, res));
companyRouter.route('/addinfo').post((req, res) => new company_controller_1.CompanyCotroller().addInfo(req, res));
companyRouter.route('/mycomp').post((req, res) => new company_controller_1.CompanyCotroller().getMyComp(req, res));
companyRouter.route('/updm').post((req, res) => new company_controller_1.CompanyCotroller().updM(req, res));
companyRouter.route('/updk').post((req, res) => new company_controller_1.CompanyCotroller().updK(req, res));
companyRouter.route('/adpurch').post((req, res) => new company_controller_1.CompanyCotroller().addPur(req, res));
companyRouter.route('/byp').post((req, res) => new company_controller_1.CompanyCotroller().byPib(req, res));
companyRouter.route('/addgood').post((req, res) => new company_controller_1.CompanyCotroller().addG(req, res));
companyRouter.route('/getg').post((req, res) => new company_controller_1.CompanyCotroller().getGoods(req, res));
exports.default = companyRouter;
//# sourceMappingURL=company.routes.js.map