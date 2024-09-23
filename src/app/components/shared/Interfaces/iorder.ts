import { IProduct } from './iproduct';

export interface IOrder {
  branch_id: number;
  city_id: number;
  clientName: string;
  cost: number;
  created_date: string;
  email: string;
  governorate_id: number;
  id: number;
  max_weight: number;
  notes: string;
  orderType: string;
  paymentType: string;
  phone1: string;
  products: [];
  region_id: number;
  shippingType: string;
  status: string;
  toVillage: string;
  user_id: number;
  village: string;
  weight: string;
}
