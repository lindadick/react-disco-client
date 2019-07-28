/* eslint-disable no-console */
import axios from 'axios'

// eslint-disable-next-line import/no-unresolved
import { API_URL, PHP_URL } from 'discoConfig'

const disco = {
    getCurrentPlaylist: () => {
        return axios
            .get(`${API_URL}/playing`)
            .then((res) => res.data)
            .catch((err) => console.log(err))
    },
    getCurrentMode: () => {
        return axios
            .get(`${PHP_URL}/get_current_mode.php`)
            .then((res) => res.data)
            .catch((err) => console.log(err))
    },
    getAllAlbums: () => {
        return axios
            .get(`${API_URL}/albums?artist=`)
            .then((res) => res.data)
            .catch((err) => console.log(err))
    },
    getAllPlaylists: () => {
        return axios
            .get(`${PHP_URL}/get_playlists.php`)
            .then((res) => res.data)
            .catch((err) => console.log(err))
    },
    getPlaylistHistory: () => {
        return axios
            .get(`${API_URL}/history`)
            .then((res) => res.data)
            .catch((err) => console.log(err))
    },
    searchForTracks: (artist, title) => {
        return axios
            .get(`${API_URL}/tracks?artist=${artist.trim()}&title=${title.trim()}`)
            .then((res) => res.data)
            .catch((err) => console.log(err))
    },
    searchForAlbums: (artist, title) => {
        return axios
            .get(`${API_URL}/albums?artist=${artist.trim()}&title=${title.trim()}`)
            .then((res) => res.data)
            .catch((err) => console.log(err))
    },
    getAlbumDetails: (album_id) => {
        return axios
            .get(`${API_URL}/albums/${album_id}`)
            .then((res) => res.data)
            .catch((err) => console.log(err))
    },
    addTrackToCurrentPlaylist: (album_id, track_id) => {
        return axios.post(`${API_URL}/add/${album_id}/${track_id}`).catch((err) => console.log(err))
    },
    addAlbumToCurrentPlaylist: (album_id) => {
        return axios
            .post(`${API_URL}/add/${album_id}`)
            .then((res) => res.data)
            .catch((err) => console.log(err))
    },
    addPlaylistToCurrentPlaylist: (playlist_name) => {
        return axios
            .get(`${PHP_URL}/add_playlist.php?playlist=${playlist_name}`)
            .then((res) => res.data)
            .catch((err) => console.log(err))
    },
    setCurrentMode: (mode, playlist_name = '') => {
        return axios
            .get(`${PHP_URL}/set_mode.php?mode=${mode}&playlist=${playlist_name}`)
            .then((res) => res.data)
            .catch((err) => console.log(err))
    },
    removeTrackFromCurrentPlaylist: (album_id, track_id) => {
        axios.post(`${API_URL}/remove/${album_id}/${track_id}`).catch((err) => console.log(err))
    },
    addTrackToShortlist: (album_id, track_id) => {
        axios.post(`${API_URL}/shortlist/${album_id}/${track_id}`).catch((err) => console.log(err))
    },
    removeTrackFromShortlist: (album_id, track_id) => {
        axios
            .delete(`${API_URL}/shortlist/${album_id}/${track_id}`)
            .catch((err) => console.log(err))
    },
    addTrackToBanList: (album_id, track_id) => {
        axios.post(`${API_URL}/ban/${album_id}/${track_id}`).catch((err) => console.log(err))
    },
    removeTrackFromBanList: (album_id, track_id) => {
        axios.delete(`${API_URL}/ban/${album_id}/${track_id}`).catch((err) => console.log(err))
    },
    skipToNextTrack: () => {
        return axios.post(`${API_URL}/next`).catch((err) => console.log(err))
    },
    moveTrackWithinCurrentPlaylist: (album_id, track_id, oldIndex, newIndex) => {
        let difference = oldIndex - newIndex
        let url = ''
        if (difference !== 0) {
            if (difference > 0) {
                url = `${API_URL}/move_up/${album_id}/${track_id}?num=${difference}`
            } else if (difference < 0) {
                difference = -difference
                url = `${API_URL}/move_down/${album_id}/${track_id}?num=${difference}`
            }
            return axios.post(url).catch((err) => console.log(err))
        }
        return null
    },
}

module.exports = disco
module.exports.default = disco
