import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_GET_MESSAGE
} from "../services/actions/wsActions";

export interface ILocation {
  from?: {
    pathname: string;
  }
}

export interface IUser {
  isAuthorized?: boolean;
  name?: string;
  email?: string;
  password?: string;
}

export interface IIngredient {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  uuid?: string;
  index: number;
}

export interface IOrder {
  _id: string;
  status: string;
  number: number;
  ingredients: string[];
  createdAt: string;
  updatedAt: string;
  name: string;
}

export interface IOrders {
  success: boolean,
  orders: Array<IOrder>,
  total: number,
  totalToday: number,
}