import {createSelector} from "@ngrx/store";
import {AppState} from "../state/app.state";

export const selectApp = (state: AppState) => state;

export const selectUser = createSelector(
  selectApp,
  state => {
    return state.app;
  }
);

export const selectUserInfo = createSelector(
  selectApp,
  state => {
    return state.app.userInfo;
  }
);

export const selectUserId = createSelector(
  selectApp,
  state => {
    return state.app.userId;
  }
);

export const selectUserName = createSelector(
  selectApp,
  state => {
    return state.app.userInfo.name;
  }
);

export const selectCurrency = createSelector(
  selectApp,
  state => {
    return state.app.currency;
  }
);

export const selectUserBill = createSelector(
  selectApp,
  state => {
    return state.app.userInfo.bill;
  }
);

export const selectCategories = createSelector(
  selectApp,
  state => {
    return state.app.categories;
  }
);
