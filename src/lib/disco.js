import axios from 'axios';

import {API_URL} from './config';

var disco = {
    getCurrentPlaylist: () => {
        return axios.get(API_URL + `/playing`)
        .then(res => res.data)
        .catch(err => console.log(err));
    },
    getAllPlaylists: () => {
        return axios.get(API_URL + `/playlists`)
        .then(res => res.data)
        .catch(err => console.log(err));
    },
    getPlaylistHistory: () => {
        return axios.get(API_URL + `/history`)
        .then(res => res.data)
        .catch(err => console.log(err));
    },
    searchForTracks: (artist, title) => {
        return axios.get(API_URL + `/tracks?artist=` + artist.trim() + `&title=` + title.trim())
        .then(res => res.data)
        .catch(err => console.log(err));
    },
    searchForAlbums: (artist, title) => {
        return axios.get(API_URL + `/albums?artist=` + artist.trim() + `&title=` + title.trim())
        .then(res => res.data)
        .catch(err => console.log(err));
    },
    addTrackToCurrentPlaylist: (album_id, track_id) => {
        return axios.post(API_URL + `/add/` + album_id + '/' + track_id)
        .catch(err => console.log(err));
    },
    addAlbumToCurrentPlaylist: (id, track_count) => {
        return axios.post(API_URL + `/add/` + id)
        .then(res => res.data)
        .catch(err => console.log(err));
    },    
    removeTrackFromCurrentPlaylist: (album_id, track_id) => {
        axios.post(API_URL + `/remove/` + album_id + '/' + track_id)
        .catch(err => console.log(err));
    },
    addTrackToShortlist: (album_id, track_id) => {
        axios.post(API_URL + `/shortlist/` + album_id + '/' + track_id)
        .catch(err => console.log(err));
    },
    removeTrackFromShortlist: (album_id, track_id) => {
        axios.delete(API_URL + `/shortlist/` + album_id + '/' + track_id)
        .catch(err => console.log(err));
    },
    skipToNextTrack: () => {
        return axios.post(API_URL + `/next`)
        .catch(err => console.log(err));
    },
    moveTrackWithinCurrentPlaylist: (album_id, track_id, oldIndex, newIndex) => {
        let difference = oldIndex - newIndex;
        let url = '';
        if (difference == 0) {
            //TODO make this a Promise...
            return;
        } else if (difference > 0) {
            url = API_URL + `/move_up/` + album_id + '/' + track_id + `?num=` + difference;
        } else if (difference < 0) {
            difference = -difference;
            url = API_URL + `/move_down/` + album_id + '/' + track_id + `?num=` + difference;
        }
        return axios.post(url)
        .catch(err => console.log(err));
    }
}

module.exports = disco;
