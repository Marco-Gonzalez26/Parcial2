import { Client } from './client.interface';
import { Product } from './product.interface';

export interface OrderDetail {
  detalleOrdenId: number;
  ordenId: number;
  productoId: number;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
  producto: Product;
}

export interface Order {
  ordenId: number;
  clienteId: number;
  fechaOrden: string;
  estado: 'Pendiente' | 'Completada' | 'Cancelada';
  total: number;
  cliente: Client;
  detallesOrden: OrderDetail[];
}

export interface CreateOrderDetail {
  productoId: number;
  cantidad: number;
}

export interface CreateOrder {
  clienteId: number;
  detallesOrden: CreateOrderDetail[];
}

export interface OrderItem {
  product: Product;
  cantidad: number;
}
