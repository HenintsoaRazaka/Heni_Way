const subabase = require('../config/supabase');

const extraction = {
    extraction: async (tableName, columns) => {
        const { data, error } = await subabase.supabaseService
        .from(tableName)
        .select(columns);

        if (error) {
            throw new Error(`Erreur lors de l'extraction des données : ${error.message}`);
        }

        return data;
    }
}