const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require("./models/Artigo");
const Artigo = mongoose.model('artigo');

const app = express();

app.use(express.json());


app.use((req, res, next) => {
    //sconsole.log("Acessou o Middleware!");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});

mongoose.connect('mongodb+srv://admin:admin@cluster0.aqfu2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Conexão com MongoDB realizada com sucesso!");
}).catch((erro) => {
    console.log("Erro: Conexão com MongoDB não foi realizada com sucesso!");
});

app.get("/", (req, res) => {
    Artigo.find({}).then((artigo) => {
        return res.json(artigo);
    }).catch((erro) => {
        return res.status(400).json({
            error: true,
            message: "Nenhum Valor encontrado!"
        })
    })
});

app.get("/devendo/id=:id", (req, res) => {
    Artigo.findOne({ _id: req.params.id }).then((artigo) => {
        return res.json(artigo);
    }).catch((erro) => {
        return res.status(400).json({
            error: true,
            message: "Nenhum Valor encontrado!"
        })
    })
})

app.post("/devendo", (req, res) => {
    const artigo = Artigo.create(req.body, (err) => {
        if (err) return res.status(400).json({
            error: true,
            message: "Error: Valor não foi cadastrado com sucesso!"
        });

        return res.status(200).json({
            error: false,
            message: "Valor cadastrado com sucesso!"
        })
    });
});

app.put("/devendo/id=:id", (req, res) => {
    const artigo = Artigo.updateOne({ _id: req.params.id}, req.body, (err) => {
        if(err) return res.status(400).json({
            error: true,
            message: "Error: Valor não foi editado com sucesso!"
        });

        return res.json({
            error: false,
            message: "Valor editado com sucesso!"
        });
    });
});

app.delete("/devendo/id=:id", (req, res) => {
    const artigo = Artigo.deleteOne({_id: req.params.id}, (err) => {
        if(err) return res.status(400).json({
            error: true,
            message: "Error: Valor não foi apagado com sucesso!"
        });

        return res.json({
            error: false,
            message: "Valor apagado com sucesso!"
        });
    });
});

app.listen(3000, () => {
    console.log("Servidor iniciado na porta 80: http://localhost/");
});