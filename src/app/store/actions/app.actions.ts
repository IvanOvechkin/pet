import {createAction, props} from "@ngrx/store";
import {
  IUserInfo,
  IUserLoginParams,
  IUserRegistrationParams,
  ICurrency,
  ICategory,
  IRecord
} from "../../api/services/abstract-api.service.";

export const userLogin = createAction(
  '[Login Page] User Login',
  props<IUserLoginParams>()
);
export const userLoginSuccess = createAction(
  '[Auth API] User Login Success',
  props<{ userId: string }>()
);
export const userLoginFailure = createAction(
  '[Auth API] User Login Failure',
  props<{ error: Error }>()
);

export const userCreate = createAction(
  '[Registration Page] User Registration',
  props<IUserRegistrationParams>()
);
export const userCreateSuccess = createAction(
  '[Registration API] User Registration Success',
  props<{ userId: string, userInfo: IUserInfo }>()
);
export const userCreateFailure = createAction(
  '[Registration API] User Registration Failure',
  props<{ error: Error }>()
);

export const getUserInfo = createAction(
  '[User API] Get User Info'
);
export const getUserInfoSuccess = createAction(
  '[User API] Get User Info Success',
  props<{ userInfo: IUserInfo }>()
);
export const getUserInfoFailure = createAction(
  '[User API] Get User Info Failure',
  props<{ error: Error }>()
);

export const setUserInfo = createAction(
  '[User API] Set User Info',
  props<IUserInfo>()
);
export const setUserInfoSuccess = createAction(
  '[User API] Set User Info Success',
  props<IUserInfo>()
);
export const setUserInfoFailure = createAction(
  '[User API] Set User Info Failure',
  props<{ error: Error }>()
);

export const setUserName = createAction(
  '[Profile Page] Set User Name',
  props<{ name: string }>()
);
export const setUserNameSuccess = createAction(
  '[User API] Set User Name Success',
  props<{ name: string }>()
);
export const setUserNameFailure = createAction(
  '[User API] Set User Name Failure',
  props<{ error: Error }>()
);

export const fetchCurrency = createAction(
  '[Currency IPI] Fetch Currency',
);
export const fetchCurrencySuccess = createAction(
  '[Currency API] Fetch Currency Success',
  props<{ currency: ICurrency }>()
);
export const fetchCurrencyFailure = createAction(
  '[Currency API] Fetch Currency Failure',
  props<{ error: Error }>()
);

export const resetCurrency = createAction(
  '[Currency] Reset Currency Failure'
);

export const getCategories = createAction(
  '[Categories API] Get Categories'
);
export const getCategoriesSuccess = createAction(
  '[Categories API] Get Categories Success',
  props<{ categories: ICategory[] }>()
);
export const getCategoriesFailure = createAction(
  '[Categories API] Get Categories Failure',
  props<{ error: Error }>()
);

export const createCategory = createAction(
  '[Categories API] Create Categories',
  props<{ category: ICategory }>()
);
export const createCategorySuccess = createAction(
  '[Categories API] Create Categories Success',
  props<{ category: ICategory }>()
);
export const createCategoryFailure = createAction(
  '[Categories API] Create Categories Failure',
  props<{ error: Error }>()
);

export const editCategory = createAction(
  '[Categories API] Edit Category',
  props<{ category: ICategory }>()
);
export const editCategorySuccess = createAction(
  '[Categories API] Edit Category Success',
  props<{ category: ICategory }>()
);
export const editCategoryFailure = createAction(
  '[Categories API] Edit Category Failure',
  props<{ error: Error }>()
);

export const createRecord = createAction(
  '[Records API] Create Record',
  props<{ bill: number, record: IRecord }>()
);
export const createRecordSuccess = createAction(
  '[Records API] Create Record Success',
  props<{ record: IRecord }>()
);
export const createRecordFailure = createAction(
  '[Records API] Create Record Failure',
  props<{ error: Error }>()
);

export const setUserBill = createAction(
  '[User API] Set User Bill',
  props<{ bill: number }>()
);
export const setUserBillSuccess = createAction(
  '[User API] Set User Bill Success',
  props<{ bill: number }>()
);
export const setUserBillFailure = createAction(
  '[User API] Set User Bill Failure',
  props<{ error: Error }>()
);

export const userLogout = createAction(
  '[User API] User Logout',
);
