import axios from "axios";

const api_url = "http://localhost:8080/games";

export async function saveGame(game) {
    return await axios.post(api_url, game)
}