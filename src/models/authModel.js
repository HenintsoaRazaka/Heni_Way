const supabase = require('../config/supabase');

const inscriptionModel = {
    inscription: async (email, password, infosPassagers) => {
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    Nom: infosPassagers.Nom,
                    Pseudo: infosPassagers.Pseudo,
                    Telephone: infosPassagers.Telephone
                }
            }
        });

        if (authError) {
            throw new Error(`Erreur d'authentification : ${authError.message}`);
        }

        return authData.user;
    },

    verification: async (email) => {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email);
        
        return { data, error };
    }
};

module.exports = inscriptionModel;