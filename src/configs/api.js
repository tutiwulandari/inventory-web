import axios from "axios";

// axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL
// axios.defaults.timeout = 1000;

axios.interceptors.response.use(function (response) {
    // console.log(response.data)
    if(response.status !== 200) {
        throw new Error(response.statusText);
    }

    let data= response.data
    if(data.code !== 200) {
        throw new Error(data.message);
    }
    console.log(response.data.data)
    return response.data.data;
}, function (error) {
    return Promise.reject(error);
});

export default axios;