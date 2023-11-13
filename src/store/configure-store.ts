import {configureStore} from '@reduxjs/toolkit';

import reducer from './reducer';
import apiMiddleware from './middlewares/api-middlewares';

/**
 * Function which is used to combine the root reducer and clear the redux
 * @param state
 * @param action
 * @returns
 */
const rootReducer = (state: any, action: any) => {
  return reducer(state, action);
};

const middleware = [
  /* other middleware */
  apiMiddleware,
];


export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;