// Import des objets
import Repository from './core/Repository.js'
import Track from './entities/Track'
import Playlist from './entities/Playlist'

// Initialisation du depot et de l'entite Playlist
let trepo = new Repository(Track);
let track = new Track({
    id: 1,
    title: "Best track ever but another !"
});

// Initialisation du depot et de l'entite Track
let prepo = new Repository(Playlist);
let list = new Playlist({
    id: 1,
    title: "My awesome playlist !"
});

// Drop de la base de donnees
prepo.storage.clear();

// Association et sauvegarde des deux entites
list.link(track);

// Recherche des entites dans la base de donnees
list = prepo.read(list.getIdentifier());
track = trepo.read(list.tracks[1].getIdentifier());

// Affichage des titres des entites
alert(list.title);
alert(track.title);
