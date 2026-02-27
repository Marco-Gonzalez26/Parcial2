export interface Product {
  productoId: number;
  nombre: string;
  talla: string;
  color: string;
  precio: number;
}

export interface CreateProduct {
  nombre: string;
  talla: string;
  color: string;
  precio: number;
}
