import axios from "axios";

const api_url = "http://localhost:8080/games";

export async function saveGame(game) {
    return await axios.post(api_url, game)
}

export async function getGames(page = 0, size = 10) {
    return await axios.get(`${api_url}?page=${page}&size=${size}`)
}

export async function getGame(id) {
    return await axios.get(`${api_url}/${id}`)
}

export async function updateGame(game) {
    return await axios.post(api_url, game)
}

export async function updatePhoto(formData) {
    return await axios.put(`${api_url}/photo`, formData)
}

export async function deleteGame(id) {
    return await axios.delete(`${api_url}/${id}`)
}