import {
  FileTypesEnum,
  MaterialTypeEnum,
  OrderStatusEnum,
  RoleEnum,
  UserGenderEnum,
  UserPositionEnum,
  UserRankEnum,
} from './enums';

export interface IBaseModel {
  id: number; //uuid
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  isDeleted?: boolean;
}

export interface IUser extends IBaseModel {
  login: string; //unique
  password: string;
  role: RoleEnum;
  name: string;
  surname: string;
  avatar: string;
  gender: UserGenderEnum;
  email: string;
  phone: string;
  birthDate: Date;
  orders: IOrder[];
  address?: string;
  positions: IPosition[];
}

export interface IFile extends IBaseModel {
  url: string;
  secure_url: string;
  asset_id: string;
  public_id: string;
  type: FileTypesEnum;
  folder?: string;
  // material?: IMaterial;
}

export interface IHueta extends IBaseModel {
  material?: IMaterial;
  service: IService;
  quantity: number;
  length?: number; // float
  width?: number; // float
  description?: string;
}

export interface IOrder extends IBaseModel {
  name: string;
  surname: string;
  phone: string;
  startDate?: Date;
  deadline?: Date;
  employee: IUser;
  amount?: number;
  huetas?: IHueta[];
  status: OrderStatusEnum;
}

export interface IService extends IBaseModel {
  name: string;
  price: number;
  orders?: IOrder[];
}

export interface IMaterial extends IBaseModel {
  title: string;
  cost: number;
  type: MaterialTypeEnum;
  image?: string;
  categories?: ICategory[];
  total?: number;
  provider?: IProvider;
}

export interface IProvider extends IBaseModel {
  company: string;
  email: string;
  address: string;
  fio: string;
  phone?: string;
  date?: Date;
  bin?: string;
  // products: IProduct[];
}

export interface ICategory extends IBaseModel {
  name: string;
  material: IMaterial;
  products?: IProduct[];
}

export interface IProduct extends IBaseModel {
  category: ICategory;
  orderDate: Date;
  receptionDate: Date;
  amount: number;
  money: number;
  // provider: IProvider;
}

export interface IPosition extends IBaseModel {
  value: UserPositionEnum;
  rank: UserRankEnum;
  endDate?: Date;
  user: IUser;
}
