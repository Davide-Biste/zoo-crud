const express = require("express");
const controller = require("../02controllers/zoo.js");

const router = express.Router();    
module.exports = router;        

router.get("/", controller.getClassi);
router.post("/aggiungi/", controller.postAddClasse);
router.put("/modifica/", controller.putModificaClasse);
router.delete("/elimina/",controller.delEliminaClasse);
router.get("/ricerca",controller.getRicerca);