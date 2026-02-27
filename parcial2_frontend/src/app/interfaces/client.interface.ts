export interface Client {
  clienteId: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
}

export interface CreateClient {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
}
