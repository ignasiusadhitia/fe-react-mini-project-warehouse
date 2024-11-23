import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { encryptTransform } from 'redux-persist-transform-encrypt';

import productsReducer from './slices/productSlice';

const encryptor = encryptTransform({
  secretKey: import.meta.env.VITE_SECRET_KEY,
  onError: (error) => {
    console.log('Error while encrypting', error);
  },
});

export const rootReducer = combineReducers({
  products: productsReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['products'],
  transforms: [encryptor],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { persistor, store };
