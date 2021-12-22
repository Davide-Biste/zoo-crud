const { errorMonitor } = require("events");
const { query, text } = require("express");
const req = require("express/lib/request");
const { type } = require("express/lib/response");
const fs = require("fs");
const mongoose = require("mongoose");


//Schemi
const classiSchema = mongoose.Schema({
    idClasse: {type:String, required: true, unique:true},
    nome: String,
    descrizione: String,
});

const animaliSchema = mongoose.Schema({
    idAnimale: {type: String, required:true, unique:true},
    nome: {type: String, default: "non scelto"},
    razza: String,
    classe: {type: String},
    //classe : {type: mongoose.Schema.Types.Mixed, default: {"CIao" : {"Prova": "Mammifero"}}},
});


//dichiaro i model


const classiModel = mongoose.model("Class",classiSchema);
const animaliModel = mongoose.model("Animal", animaliSchema);



module.exports = {
    caricaAnimali : function(callback){
        animaliModel.find((err, animali)=>{
            if(err) throw err;
            callback(animali);
        });
        },

    caricaClassi : function(callback){
        classiModel.find((err, classi)=>{
            if(err) throw err;
            callback(classi);
        });
        },
    
    aggiungiClasse: function(n, d, callback){

        var provaC = false;
        let nuovaClasse = new classiModel();

        nuovaClasse.idClasse = Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);

        if(n == ""){
            throw err;
        }
        else{
            nuovaClasse.nome = n;
        }
        
        if(d == ""){
            throw err;
        }
        else{
            nuovaClasse.descrizione = d;
        }

        nuovaClasse.save();
        callback(nuovaClasse);
        },
    
    aggiungiAnimale : function (n, r, c, callback){
        var nuovoAnimale = new animaliModel();

        nuovoAnimale.idAnimale = Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);

        if(n == ""){
            throw err;
        }
        else{
            nuovoAnimale.nome = n;
        }
        
        if(r == ""){
            throw err;
        }
        else{
            nuovoAnimale.razza = r;
        }

        if(c == ""){
            throw err;
        }
        else{
            nuovoAnimale.classe = c;
                
        }
        nuovoAnimale.save();
                callback(nuovoAnimale);
    },

    modificaClasse : function(id, n, d, callback){
        classiModel.findOne({idClasse : id},(err, classi)=>{

            if(err) throw err;

            if(n == ""){
                classi.nome = classi.nome;
            }
            else{
                classi.nome = n;
            }
            
            if(d == ""){
                classi.descrizione = classi.descrizione;
            }
            else{
                classi.descrizione = d;
            }

            classi.save();
            callback(classi);
        });

    },

    modificaAnimale : function(id, n, r, c, callback){
        animaliModel.findOne({idAnimale : id},(err, animali)=>{
            if(err) throw err;

            if(n == ""){
                animali.nome = animali.nome;
            }
            else{
                animali.nome = n;
            }
            
            if(r == ""){
                animali.razza = animali.razza;
            }
            else{
                animali.razza = r;
            }

            if(c == ""){
               animali.classe = animali.classe;
            }
            else{
               animali.classe = c;
            }

            animali.save();
            callback(animali);
        });
    },

    eliminaAnimali : function(id, callback){
    animaliModel.deleteOne({idAnimale:id}, (err)=>{
        if(err) throw err;
        callback(id);
    })
    },

    eliminaClassi : function(id, callback){

        classiModel.findOne({idClasse:id}, (err,nuovaClasse)=>{
            if(err) throw err;
            animaliModel.deleteMany({classe: nuovaClasse.nome}, (err)=>{
                if(err) throw err;
                classiModel.deleteOne({idClasse:id}, (err)=>{
                    if(err) throw err;
                    callback(id);
                })
            });
        });
        
    },

    caricaClassiFiltrate : function(d, callback){

            classiModel.find({ $text: { $search: "\"" + d + "\""  } } ,(err, trovato)=>{
                if(d == ""){
                    classiModel.find((err, classi)=>{
                        if(err) throw err;
                            callback(classi);
                        });
                }
                else{
                    callback(trovato);
                }
            });
    },

    
    

    charge : function(){
        mongoose.connect(process.env.MONGODB, (err) => {
            if (err)
                console.log(err);
            else
                classiSchema.index({descrizione: "text"});
                console.log(("Connessione al db avvenuta con successo."));
            
                /*
                let stud = new studentiModel();
                stud.idStudente = "001";
                stud.nome = "Davide";
                stud.cognome = "Mazzeo";
                stud.nascita.data = new Date("2002-08-27");
                stud.nascita.luogo = "Alzano Lombardo";
                stud.save((err)=>{
                    if(err) throw err;
                });
                */
                
        });
        
    }
}

