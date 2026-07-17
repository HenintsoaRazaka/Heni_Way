const subabase = require('../config/supabase');

const createVoiture =  {
    create: async (voitureData) => {
            const { data, error } = await subabase.supabaseService
                .from('Voiture')
                .insert([voitureData])
                .select();

            if (error) {
                throw new Error(`Erreur lors de l'insertion : ${error.message}`);
            }
            return data[0];
        },
    
    createP: async (publicationData) => {
            const { data, error } = await subabase.supabaseService
                .from('Reservation')
                .insert([publicationData])
                .select();

            if (error) {
                throw new Error(`Erreur lors de la publication : ${error.message}`);
            }
            return data[0];
        }
    
};
module.exports = createVoiture ;