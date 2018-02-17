import axios from 'axios';

const API_HOST = 'http://192.168.1.10:5000';

var disco = {
    getCurrentPlaylist: () => {
        return axios.get(API_HOST + `/playing`)
        .then(res => res.data)
        .catch(err => console.log(err));
    },
    getAllPlaylists: () => {
        return axios.get(API_HOST + `/playlists`)
        .then(res => res.data)
        .catch(err => console.log(err));
    },
    getPlaylistHistory: () => {
        return axios.get(API_HOST + `/history`)
        .then(res => res.data)
        .catch(err => console.log(err));
    },
    searchForTracks: (artist, title) => {
        return axios.get(API_HOST + `/tracks?artist=` + artist + `&title=` + title)
        .then(res => res.data)
        .catch(err => console.log(err));
    },
    searchForAlbums: (artist, title) => {
        return axios.get(API_HOST + `/albums?artist=` + artist + `&title=` + title)
        .then(res => res.data)
        .catch(err => console.log(err));
    },
    addTrackToCurrentPlaylist: (album_id, track_id) => {
        return axios.post(API_HOST + `/add/` + album_id + '/' + track_id)
        .catch(err => console.log(err));
    },
    addAlbumToCurrentPlaylist: (id, track_count) => {
        let success = false;
        for (var i = 1; i <= track_count; i++) {
            axios.post(API_HOST + `/add/` + id + '/' + i)
            .then(success = true)
            .catch(err => console.log(err));
        }
        return success;
    },    
    removeTrackFromCurrentPlaylist: (album_id, track_id) => {
        axios.post(API_HOST + `/remove/` + album_id + '/' + track_id)
        .catch(err => console.log(err));
    },
    addTrackToShortlist: (album_id, track_id) => {
        axios.post(API_HOST + `/shortlist/` + album_id + '/' + track_id)
        .catch(err => console.log(err));
    },
    removeTrackFromShortlist: (album_id, track_id) => {
        axios.delete(API_HOST + `/shortlist/` + album_id + '/' + track_id)
        .catch(err => console.log(err));
    },
    skipToNextTrack: () => {
        return axios.post(API_HOST + `/next`)
        .catch(err => console.log(err));
    },
    moveTrackWithinCurrentPlaylist: (album_id, track_id, oldIndex, newIndex) => {
        let difference = oldIndex - newIndex;
        let url = '';
        if (difference == 0) {
            return;
        } else if (difference > 0) {
            url = API_HOST + `/move_up/` + album_id + '/' + track_id + `?num=` + difference;
        } else if (difference < 0) {
            difference = -difference;
            url = API_HOST + `/move_down/` + album_id + '/' + track_id + `?num=` + difference;
        }
        return axios.post(url)
        .catch(err => console.log(err));
    }
}

module.exports = disco;
