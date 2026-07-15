const SUPABASE_URL = "https://jzyunzjhjamoosctqoor.supabase.co"; 
const SUPABASE_ANON_KEY = "sb_publishable_jruqsDdFgLDoODPjkcacLA_cx_7cJdo"; 
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let listeVoitures = [];
const statsContainer = document.getElementById('stats-vehicules');
const pourcentageContainer = document.getElementById('pourcentage-voiture');

function mettreAJourAffichage() {
    if (!statsContainer) return;
    const voituresPublices = listeVoitures.filter(v => v.Statut === 'Public');
    const publicDisponibles = voituresPublices.filter(v => v.Etats === 'Disponible');

    const total = voituresPublices.length;
    const dispos = publicDisponibles.length;
    statsContainer.textContent = `${dispos}/${total}`;

    if (pourcentageContainer) {
        if (total > 0) {
            const pourcentage = Math.round((dispos / total) * 100);
            pourcentageContainer.textContent = `+${pourcentage}%`;
        } else {
            pourcentageContainer.textContent = "0%";
        }
    }

}

async function chargerDonneesInitiales() {
    try {
        const { data, error } = await supabaseClient
            .from('Voiture')
            .select('*');

        if (error) throw error;

        listeVoitures = data || [];
        mettreAJourAffichage();
    } catch (err) {
        console.error("Erreur lors du chargement initial :", err);
        if (statsContainer) statsContainer.textContent = "Erreur";
    }
}

function connecterAuTempsReel() {
    supabaseClient
        .channel('changements-voitures')
        .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'Voiture' },
            (payload) => {
                if (payload.eventType === 'INSERT') {
                    listeVoitures.push(payload.new);
                } 
                else if (payload.eventType === 'UPDATE') {
                    const index = listeVoitures.findIndex(v => v.id === payload.new.id);
                    if (index !== -1) {
                        listeVoitures[index] = payload.new;
                    }
                } 
                else if (payload.eventType === 'DELETE') {
                    listeVoitures = listeVoitures.filter(v => v.id !== payload.old.id);
                }

                mettreAJourAffichage();
            }
        )
        .subscribe();
}

document.addEventListener("DOMContentLoaded", () => {
    chargerDonneesInitiales();
    connecterAuTempsReel();
});