const express = require("express");
const controller = require("../02controllers/zoo.js");

const router = express.Router();    
module.exports = router;        

router.get("/", controller.getAnimali);
router.post("/aggiungi/", controller.postAddAnimale);
router.put("/modifica/", controller.putModificaAnimale);
router.delete("/elimina/",controller.delEliminaAnimale);