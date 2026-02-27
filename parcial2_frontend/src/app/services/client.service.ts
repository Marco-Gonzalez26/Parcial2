import { Injectable } from '@angular/core';
import { Client, CreateClient } from '../interfaces/client.interface';
import { Observable } from 'rxjs';
import { API } from '../constants';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private http: HttpClient) {}
  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${API}/clientes`);
  }
  getClient(id: number): Observable<Client> {
    return this.http.get<Client>(`${API}/clientes/${id}`);
  }
  createClient(data: CreateClient): Observable<Client> {
    return this.http.post<Client>(`${API}/clientes`, data);
  }
  updateClient(id: number, data: CreateClient): Observable<void> {
    const body = { ...data, clienteId: id };
    return this.http.put<void>(`${API}/clientes/${id}`, body);
  }
  deleteClient(id: number): Observable<void> {
    return this.http.delete<void>(`${API}/clientes/${id}`);
  }
}
