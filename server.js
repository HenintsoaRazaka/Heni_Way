const express=require('express');
const app=express();
const http=require('http');
const path=require('path');
const authRoutes = require('./src/routes/authRoutes');
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

app.get("/Heni-Way/Passager", (req, res)=>{
    const fichier=path.join(__dirname, 'Public', 'Passager.html');
    res.sendFile(fichier);
});

app.get("/Heni-Way/Administrateur", (req, res)=>{
    const fichier=path.join(__dirname, 'Public', 'loginAdmi.html');
    res.sendFile(fichier);
});

const { supabase, supabaseService } = require('./src/config/supabase');

app.get('/setup-admin-secret-777', async (req, res) => {     
    try {
        const { data: authData, error: authError } = await supabaseService.auth.admin.createUser({
            email: "Administrateur@heniway.com",
            password: "Tsotsola",
            email_confirm: true,
            app_metadata: { role: 'admin' }
        });

        if (authError) throw authError;

        await supabase.from('Administrateur').insert([
            { identifiant: authData.user.id, Nom: "Henintsoa" }
        ]);

        res.status(200).json({ succes: true, message: "Admin créé avec succès !" });
    } catch (error) {
        res.status(500).json({ succes: false, error: error.message });
    }
});

app.use('/api/auth', authRoutes);