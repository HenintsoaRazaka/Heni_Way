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

        if (reservation && reservation.id_voiture) {
            // 2. Mettre à jour l'état de la voiture en 'Disponible'
            // 2. Mettre à jour l'état de la voiture en 'Disponible'
            // 2. Mettre à jour l'état de la voiture en 'Disponible'
            // 2. Mettre à jour l'état de la voiture en 'Disponible'
            // 2. Mettre à jour l'état de la voiture en 'Disponible'
            // 2. Mettre à jour l'état de la voiture en 'Disponible'
            const { error: vehicleError } = await subabase.supabaseService
                .from('Voiture')
                .update({ Etats: 'Disponible' }) // Modifie la colonne 'Etats' de ta table Voiture
                .eq('id', reservation.id_voiture);

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