import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import placesReducer from "../features/placesSlice";
import modalReducer from "../features/modalSlice";

export const store = configureStore({
  reducer: {
    places: placesReducer,
    modal: modalReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
