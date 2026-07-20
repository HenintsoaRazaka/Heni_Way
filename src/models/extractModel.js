const e = require('express');
const subabase = require('../config/supabase');

const extraction = {
    extraction: async (tableName, columns) => {
        const { data, error } = await subabase.supabaseService
        .from(tableName)
        .select(columns)
        .single();

        if (error) {
            throw new Error(`Erreur lors de l'extraction des données : ${error.message}`);
        }

        return data;
    }, 

    Supprimer: async (Id) => {  
        const { data: reservation, error: fetchError } = await subabase.supabaseService
            .from('Reservation')
            .select('ID_Voiture')
            .eq('id', Id)
            .single();

        if (fetchError) throw fetchError;

        if (reservation && reservation.ID_Voiture) {

            const { error: vehicleError } = await subabase.supabaseService
                .from('Voiture')
                .update({ Etats: 'Disponible' }) 
                .eq('id', reservation.ID_Voiture);

            if (vehicleError) throw vehicleError;
        }
        const { data, error } = await subabase.supabaseService
            .from('Reservation')
            .delete()
            .eq('id', Id);

        if (error) throw error;
        return data;
    }

}

module.exports = extraction;