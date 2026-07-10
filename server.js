const express=require('express');
const app=express();
const http=require('http');
const path=require('path');
const authRoutes = require('../routes/authRoutes');
module.exports = app;

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(express.static('Public'));

app.get("/", (req, res)=>{
    const fichier=path.join(__dirname, 'Public', 'Accueil.html');
    res.sendFile(fichier);
});

app.get("/Ins", (req, res)=>{
    const fichier=path.join(__dirname, 'Public', 'Login.html');
    res.sendFile(fichier);
});

app.get("/Passagers", (req, res)=>{
    const fichier=path.join(__dirname, 'Public', 'Passagers.html');
    res.sendFile(fichier);
});

app.use('/api/auth', authRoutes);