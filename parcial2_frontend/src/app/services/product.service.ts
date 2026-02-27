import { Injectable } from '@angular/core';
import { Product, CreateProduct } from '../interfaces/product.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API } from '../constants';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${API}/productos`);
  }
  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${API}/productos/${id}`);
  }
  createProduct(data: CreateProduct): Observable<Product> {
    return this.http.post<Product>(`${API}/productos`, data);
  }
  updateProduct(id: number, data: CreateProduct): Observable<void> {
    const body = { ...data, productoId: id };
    return this.http.put<void>(`${API}/productos/${id}`, body);
  }
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${API}/productos/${id}`);
  }
}
