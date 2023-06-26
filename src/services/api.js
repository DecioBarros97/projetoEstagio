import axios from "axios";

// https://games-test-api-81e9fb0d564a.herokuapp.com/api/data



const api = axios.create({
    baseURL: "https://games-test-api-81e9fb0d564a.herokuapp.com/api/data"
});

export default api;

/* const response = await axios.get("https://games-test-api-81e9fb0d564a.herokuapp.com/api/data", {
    headers: {
        'dev-email-address': 'deciobarros97@gmail.com'

    }
}) */

/* axios.get('https://games-test-api-81e9fb0d564a.herokuapp.com/api/data', {
    headers: {
        'dev-email-address': 'deciobarros97@gmail.com'
    }

})
 */