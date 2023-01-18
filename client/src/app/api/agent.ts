import  axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = "https://localhost:44340/api/";
axios.defaults.withCredentials = true;



const responseBody = (response:AxiosResponse) => response.data;
const app = axios.create({
    baseURL: "https://localhost:44340/api/",
    withCredentials: true
})
app.interceptors.response.use(
    response => (response), 
    error => (Promise.reject(error.response.data.err))
)

const request = {
    get: (url:string)=> app.get(url).then(responseBody),
    post:(url:string, body:{}) => app.post(url,body).then(responseBody),
    put:(url:string, body:{})=> app.put(url,body).then(responseBody),
    delete:(url:string,body:{})=> app.delete(url).then(responseBody) 
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
    get:()=>request.get("basket").then(responseBody),
    addItem:(productId:number, quantity:number = 1) =>request.post(`basket?productId=${productId}&quantity=${quantity}`,{}),
    removeItem:(productId:number, quantity:number= 1)=> request.delete(`basket?productId=${productId}&quantity=${quantity}`,{})
    
}

const agent  ={
    Catalog,
    TestingErrors,
    Basket
}

export default agent;