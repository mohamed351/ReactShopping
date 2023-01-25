import { createStore } from "redux";
import counterReducer from "./counterReducer";

export function configureStore(){
   return  createStore(counterReducer);
}