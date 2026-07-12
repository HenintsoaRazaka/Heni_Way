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
    }
}

module.exports = extraction;