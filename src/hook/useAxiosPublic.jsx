import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://human-society1-server.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;