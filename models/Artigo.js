const mongoose = require('mongoose');

const Artigo = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    valor: {
        type: String,
        required: true
    }
},
{
    timestamps: false,
});

mongoose.model('artigo', Artigo);