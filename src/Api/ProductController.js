import axios from "axios";

export function getProduct (){
    return axios.get('http://localhost:8080/api/book')
}

export function searchProduct(keyword){
    return axios.get(`http://localhost:8080/api/book/search?keyword=${keyword}`)
}

export function getCategory(){
    return axios.get('http://localhost:8080/api/category')
}

export function getBookByCategory(categoryid){
    return axios.get(`http://localhost:8080/api/book/category/${categoryid}`)
}
