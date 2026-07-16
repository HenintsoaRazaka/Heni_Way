const subabase = require('../config/supabase');

const createVoiture =  {
    create: async (voitureData) => {
            const { data, error } = await supabase.supabaseService
                .from('Voiture')
                .insert([voitureData])
                .select();

            if (error) {
                throw new Error(`Erreur lors de l'insertion : ${error.message}`);
            }
            return data[0];
        }
};

module.exports = createVoiture ;