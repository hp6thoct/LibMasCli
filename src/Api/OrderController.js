import axios from "axios";

export function calculateShip(data) {
  return axios.post("http://localhost:8080/api/Shipping/calculateCost", data);
}

export function calculatePayment(data) {
  return axios.post("http://localhost:8080/api/payment/calculateBorrowCost", data);
}

export function calculateReturnPayment(data) {
  return axios.post("http://localhost:8080/api/payment/calculateReturnCost", data);
}


export function confirmOrder(data) {
  return axios.post("http://localhost:8080/api/borrow/confirm-borrow", data);
}

export function getUserOrder(user) {
  return axios.post(`http://localhost:8080/api/borrow/reader-borrow`,user);
}

export function confirmReturn(data){
  return axios.post(`http://localhost:8080/api/return/confirm-return`,data)
}

export function fineCalculate(data){
  return axios.post(`http://localhost:8080/api/fine/calculateCost`,data)
}