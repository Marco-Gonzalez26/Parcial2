import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateOrderDetail, Order } from '../interfaces/order.interface';
import { API } from '../constants';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}
  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${API}/ordenes`);
  }
  getOrder(id: number): Observable<Order> {
    return this.http.get<Order>(`${API}/ordenes/${id}`);
  }
  getOrdersByClient(clienteId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${API}/ordenes/cliente/${clienteId}`);
  }
  createOrder(data: CreateOrderDetail): Observable<Order> {
    return this.http.post<Order>(`${API}/ordenes`, data);
  }
  updateOrderStatus(id: number, estado: string): Observable<void> {
    return this.http.patch<void>(`${API}/ordenes/${id}/estado`, { estado });
  }
  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${API}/ordenes/${id}`);
  }
}
