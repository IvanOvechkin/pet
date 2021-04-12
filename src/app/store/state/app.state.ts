import {ICurrency, ICategory, IUserInfo} from "../../api/services/abstract-api.service.";

export interface AppState {
  app: {
    userId: string;
    userInfo: IUserInfo,
    currency: ICurrency,
    categories: ICategory[]
  }
}
