import express from 'express'

import { CompanyCotroller } from '../controllers/company.controller';

const companyRouter = express.Router();

companyRouter.route('/register').post(
    (req,res)=>new CompanyCotroller().addComp(req,res)
)
companyRouter.route('/makereq').post(
    (req,res)=>new CompanyCotroller().addReq(req,res)
)
companyRouter.route('/getreqs').post(
    (req,res)=>new CompanyCotroller().getReqs(req,res)
)
companyRouter.route('/deleter').post(
    (req,res)=>new CompanyCotroller().deleteR(req,res)
)
companyRouter.route('/getcomp').post(
    (req,res)=>new CompanyCotroller().getComp(req,res)
)
companyRouter.route('/act').post(
    (req,res)=>new CompanyCotroller().activate(req,res)
)
companyRouter.route('/deact').post(
    (req,res)=>new CompanyCotroller().deactivate(req,res)
)

companyRouter.route('/addinfo').post(
    (req,res)=>new CompanyCotroller().addInfo(req,res)
)
companyRouter.route('/mycomp').post(
    (req,res)=>new CompanyCotroller().getMyComp(req,res)
)
companyRouter.route('/updm').post(
    (req,res)=>new CompanyCotroller().updM(req,res)
)
companyRouter.route('/updk').post(
    (req,res)=>new CompanyCotroller().updK(req,res)
)
companyRouter.route('/adpurch').post(
    (req,res)=>new CompanyCotroller().addPur(req,res)
)
companyRouter.route('/byp').post(
    (req,res)=>new CompanyCotroller().byPib(req,res)
)
companyRouter.route('/addgood').post(
    (req,res)=>new CompanyCotroller().addG(req,res)
)
companyRouter.route('/getg').post(
    (req,res)=>new CompanyCotroller().getGoods(req,res)
)
export default companyRouter