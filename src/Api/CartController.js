import axios from "axios";

export function getCart(userId) {
  return axios.get(`http://localhost:8080/api/cart/get/${userId}`);
}

export function createCart(userId) {
  return axios.get(`http://localhost:8080/api/cart/createCart/${userId}`);
}
export function addToCart(cartId, item) {
  return axios.post(`http://localhost:8080/api/cart/add/${cartId}`, item);
}
export function updateCartItem(cartid, itemid, quantity) {
  return axios.post(
    `http://localhost:8080/api/cart/updateQuantity/${cartid}/${itemid}/${quantity}`
  );
}
export function deleteItem(cartid, itemid){
  return axios.post(
    `http://localhost:8080/api/cart/remove/${cartid}/${itemid}`
  );
}