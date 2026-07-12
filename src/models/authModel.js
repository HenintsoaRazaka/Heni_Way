const supabase = require('../config/supabase');

const inscriptionModel = {
    inscription: async (email, password, infosPassagers) => {
        const { data: authData, error: authError } = await supabase.supabase.auth.signUp({
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
        const { data: { users }, error } = await supabase.supabaseService.auth.admin.listUsers();
            
        if (error) return { exist: false, error };
        const emailExiste = users.some(user => user.email === email);
        return { 
            exist: emailExiste, error: null 
        };
    }
};

module.exports = inscriptionModel;