import { create } from 'apisauce';
import { BASE_URL } from 'react-native-dotenv'

const api = create({
    baseURL: BASE_URL
});

api.addResponseTransform(response => {
    if (!response.ok) throw response;
});

export default api;



