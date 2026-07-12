const { supabase } = require('../config/supabase');

const verificationSession = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer')) {
            return res.status(401).json({ 
                succes: false, 
                message: "Aucun jeton fourni." 
            });
        }

        const token = authHeader.split(' ')[1];
        const { data: { user }, error } = await supabase.auth.getUser(token);

        if (error || !user) {
            return res.status(401).json({ 
                succes: false, 
                message: "Session expirée ou invalide. Veuillez vous reconnecter." 
            });
        }
        req.user = user;
        
        next();
    } catch (err) {
        return res.status(500).json({ succes: false, message: "Erreur d'authentification." });
    }
};

module.exports = verificationSession;