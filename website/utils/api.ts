
import axios from "axios";
import { AxiosRequestConfig } from "axios";

class api{
    // public static readonly url: string = "http://localhost:8000";
    public static readonly url: string = "https://api.marloneulberg.de";

    public static async get(path: string, config?: AxiosRequestConfig<any> | undefined){
        const response = await axios.get(this.url+path, config);
        return response;
    }

    public static async post(path: string,  data:any, config?:AxiosRequestConfig<any> | undefined) {
        const response = await axios.post(this.url+path, data, config);
        return response; 
    }

    public static async delete(path: string, config?:AxiosRequestConfig<any> | undefined) {
        const response = await axios.delete(this.url+path, config);
        return response; 
    }

    public static async put(path:string, data:any, config?:AxiosRequestConfig<any> | undefined){
        const response = await axios.put(this.url+path, data, config);
        return response; 
    }

}

export default api;




