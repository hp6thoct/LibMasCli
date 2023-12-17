import axios from "axios";

export function getProduct (){
    return axios.get('http://localhost:8080/api/book')
}

export function searchProduct(keyword){
    return axios.get(`http://localhost:8080/products/search?keyword=${keyword}`)
}