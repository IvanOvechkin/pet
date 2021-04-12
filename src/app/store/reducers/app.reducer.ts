import {createReducer, on} from "@ngrx/store";
import * as AppActions from "../actions/app.actions";

export const initialState = {
  userId: null,
  userInfo: null,
  currency: null,
  categories: [],
  records: []
};

const _appReducer = createReducer(
  initialState,

  on(AppActions.userLogin, state => state),
  on(AppActions.userLoginSuccess, (state, action) => {
    console.log(action, 'LOGIN');
    return { ...state, userId: action.userId };
  }),
  on(AppActions.userLoginFailure, state => state),


  on(AppActions.userCreate, state => state),
  on(AppActions.userCreateSuccess, (state, action) => {
    console.log(action, 'CREATE');
    return { ...state, userId: action.userId, userInfo: action.userInfo };
  }),
  on(AppActions.userCreateFailure, state => state),


  on(AppActions.getUserInfo, state => state),
  on(AppActions.getUserInfoSuccess, (state, action) => {
    console.log(state, 'GET INFO STATE');
    console.log(action, 'GET INFO');
    return { ...state, userInfo: action.userInfo };
  }),
  on(AppActions.getUserInfoFailure, state => state),


  on(AppActions.setUserName, state => state),
  on(AppActions.setUserNameSuccess, (state, action) => {
    console.log(action, 'SET NAME');
    return { ...state, userInfo: {...state.userInfo, name: action.name} };
  }),
  on(AppActions.setUserNameFailure, state => state),


  on(AppActions.fetchCurrency, state => state),
  on(AppActions.fetchCurrencySuccess, (state, action) => {
    console.log(action, 'FETCH CURRENCY');
    return { ...state, currency: action.currency };
  }),
  on(AppActions.fetchCurrencyFailure, state => state),


  on(AppActions.resetCurrency, (state, action) => {
    console.log(action, 'RESET CURRENCY');
    return { ...state, currency: null };
  }),


  on(AppActions.getCategories, state => state),
  on(AppActions.getCategoriesSuccess, (state, action) => {
    console.log(action, 'GET CATEGORIES');
    return { ...state, categories: action.categories };
  }),
  on(AppActions.getCategoriesFailure, state => state),


  on(AppActions.createCategory, state => state),
  on(AppActions.createCategorySuccess, (state, action) => {
    console.log(action, 'CREATE CATEGORY');
    return { ...state, categories: [...state.categories, action.category] };
  }),
  on(AppActions.createCategoryFailure, state => state),


  on(AppActions.editCategory, state => state),
  on(AppActions.editCategorySuccess, (state, action) => {
    console.log(action, 'EDIT CATEGORY');
    const categories = state.categories.map(cat => {
      if (cat.id === action.category.id) {
        cat = action.category;
      }
      return cat;
    });
    return { ...state, categories: categories };
  }),
  on(AppActions.editCategoryFailure, state => state),


  on(AppActions.createRecord, state => state),
  on(AppActions.createRecordSuccess, (state, action) => {
    console.log(action, 'CREATE RECORD');
      return { ...state, records: [...state.records, action.record] };
  }),
  on(AppActions.createRecordFailure, state => state),


  on(AppActions.setUserBill, state => state),
  on(AppActions.setUserBillSuccess, (state, action) => {
    console.log(action, 'SET USER BILL');
    return { ...state, userInfo: {...state.userInfo, bill: action.bill} };
  }),
  on(AppActions.setUserBillFailure, state => state),


  on(AppActions.userLogout, state => initialState),
);

export function appReducer(state, action) {
  return _appReducer(state, action);
}
