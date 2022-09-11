import axios from "axios";

const APIService = {
    init(baseURL) {
        axios.defaults.baseURL = baseURL;
        axios.interceptors.request.use((config) => {
            config.headers.common['Content-Type'] = 'application/json';
            config.headers.common['Access-Control-Allow-Origin'] = '*';
            return config;
        });
        axios.interceptors.response.use(
            response => {
                return response
            },
            error => {
                return Promise.reject(error)
            }
        );
    },

    get(resource, params) {
        return axios.get(resource, {params: {...params}});
    }
}
export default APIService;
