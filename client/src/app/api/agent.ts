import  axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = "https://localhost:44340/api/";
axios.defaults.withCredentials = true;



const responseBody = (response:AxiosResponse) => response.data;


const request = {
    get: (url:string)=> axios.get(url).then(responseBody),
    post:(url:string, body:{}) => axios.post(url,body).then(responseBody),
    put:(url:string, body:{})=> axios.put(url,body).then(responseBody),
    delete:(url:string,body:{})=> axios.delete(url).then(responseBody) 
}

const Catalog = {
    list:()=> request.get("Products"),
    details:(id:number)=> request.get(`Products/${id}`)
}
const TestingErrors= {
    get404Error:()=>  request.get("Buggy/not-found"),
    get400Error:()=> request.get("Buggy/bad-request"),
    get401Error:()=>request.get("Buggy/unauth"),
    getValidationError:()=> request.get("Buggy/validation-error"),
    getServerError:()=> request.get("Buggy/server-error")
}
const Basket ={
    get:()=>request.get("basket"),
    addItem:(productId:number, quantity:number = 1) =>request.post(`basket?productId=${productId}&quantity=${quantity}`,{}),
    removeItem:(productId:number, quantity:number= 1)=> request.delete(`basket?productId=${productId}&quantity=${quantity}`,{})
    
}

const agent  ={
    Catalog,
    TestingErrors,
    Basket
}

export default agent;