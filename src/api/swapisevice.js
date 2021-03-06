import axios from 'axios';

const replaceApiProtocol = (request) => ({
    ...request,
    // would be better to change in API
    url: request.url.replace('http://', 'https://')
});

axios.interceptors.request.use(
    request => replaceApiProtocol(request)
);

export default class SwapiService {
    _swapiservice = axios.create({
        baseURL: 'https://swapi.dev/api/'
    });

    getPlanets = async (params = '') => {
        const response = await this._swapiservice.get(`/planets/${params}`)
            .catch(response => response.data);
        return response.data;
    }

    getPlanet = async (id) => {
        const response = await this._swapiservice.get(`/planets/${id}/`)
            .catch(response => response.data);
        return response.data;
    }

    getResident = async (url) => {
        const response = await axios.get(url)
            .catch(response => response.data);
        return response.data;
    }

    getPlanetImage = async (id) => {
        const response =  await axios.get(`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`)
            .catch(response => response.data);
        return response.config.url;
        
    }
}
