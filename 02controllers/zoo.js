const zooModels = require("../03models/zoo.js");
var path = require('path');
const { dirname } = require("path");


module.exports = {
    getAnimali: function (req, res) {
        zooModels.caricaAnimali((animali)=>{
            res.end(JSON.stringify(animali));
        });
    },

    getClassi: function (req, res) {
        zooModels.caricaClassi((classi)=>{
            res.end(JSON.stringify(classi));
        });
    },


    postAddAnimale : function(req, res){
        zooModels.aggiungiAnimale(req.body.nome, req.body.razza, req.body.classe, (prova)=>{
                res.redirect("http://localhost:3000/animali.html");
        });
    },
    postAddClasse : function(req, res){
        zooModels.aggiungiClasse(req.body.nome, req.body.descrizione, (prova)=>{
            res.redirect("http://localhost:3000/classi.html");  
        });
    },


    putModificaAnimale : function(req, res){
        zooModels.modificaAnimale(req.body.idAnimale, req.body.nome, req.body.razza, req.body.classe,(animale)=>{
            res.end("ID: " + animale.idAnimale +". L'animale " + animale.nome + " è stato modificato con successo.");
        });
    },


    putModificaClasse : function(req, res){
        zooModels.modificaClasse(req.body.idClasse, req.body.nome, req.body.descrizione, (classe)=>{
            res.redirect("http://localhost:3000/classi.html");
        });
    },


    delEliminaAnimale : function(req, res){
        zooModels.eliminaAnimali(req.body.idAnimale, (id)=>{
            res.end("L'animale con ID: " + id + " è stato eliminato.");
        })
    },
    delEliminaClasse : function(req, res){
        zooModels.eliminaClassi(req.body.idClasse, (id)=>{
            res.end("La classe con ID " + id + " è stata eliminata.");
        })
    },

    getRicerca : function(req,res){
        zooModels.caricaClassiFiltrate(req.query.descrizione, (trovato)=>{
            res.end(JSON.stringify(trovato));
        });
    }
}