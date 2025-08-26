// import { createStore, applyMiddleware } from "redux";
// import { createWrapper } from "next-redux-wrapper";
// import createSagaMiddleware from "redux-saga";
// import storage from "./syncStorage";
// import { composeWithDevTools } from "@redux-devtools/extension";
// // If you don't bother about the error redux-persist failed to create sync storage. falling back to noop storage...uncomment the next line and comment out the previous import. See more on - https://github.com/vercel/next.js/discussions/15687
// // const storage = require('redux-persist/lib/storage').default;

// import rootReducer from "../reducers";
// import rootSaga from "../sagas";

// const sagaMiddleware = createSagaMiddleware();

// // BINDING MIDDLEWARE
// const bindMiddleware = (middleware) => {
//   if (process.env.NEXT_ENV !== "production") {
//     return composeWithDevTools(applyMiddleware(...middleware));
//   }
//   return applyMiddleware(...middleware);
// };

// const makeStore = ({ isServer }) => {
//   if (isServer) {
//     //If it's on server side, create a store
//     const store = createStore(rootReducer, bindMiddleware([sagaMiddleware]));
//     sagaMiddleware.run(rootSaga);
//     return store;
//   } else {
//     //If it's on client side, create a store which will persist
//     const { persistStore, persistReducer } = require("redux-persist");

//     const persistConfig = {
//       key: "nextjs",
//       whitelist: ["auth", "forms"], // reducers  will be persisted
//       storage, // if needed, use a safer storage
//     };

//     const persistedReducer = persistReducer(persistConfig, rootReducer); // Create a new reducer with our existing reducer
//     const store = createStore(persistedReducer, bindMiddleware([sagaMiddleware])); // Creating the store again
//     store.__persistor = persistStore(store); // This creates a persistor object & push that persisted object to .__persistor, so that we can avail the persistability feature
//     sagaMiddleware.run(rootSaga);
//     return store;
//   }
// };

// // Export the wrapper & wrap the pages/_app.js with this wrapper only
// export const wrapper = createWrapper(makeStore);






'use client';

import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from '../reducers';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'nextjs',
  whitelist: ['auth', 'forms'], // Adjust based on your reducers
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable for redux-persist compatibility
    }).concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});

store.__persistor = persistStore(store);
sagaMiddleware.run(rootSaga);