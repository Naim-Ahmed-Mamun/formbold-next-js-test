"use client";
import { Provider, useStore } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
// import { wrapper } from "../store";
import { store } from "../store";


const ReduxProvider = ({ children }) => {
  return (
    <Provider store={store}>
      <ReduxPersist>
        {children}
      </ReduxPersist>
    </Provider>
  );
};

export default ReduxProvider;

const ReduxPersist = ({ children }) => {
  const syncStore = useStore((state) => state);

  // Use typeof window to check if running in the browser
  const isBrowser = typeof window !== "undefined";

  return (
    <PersistGate
      persistor={isBrowser ? syncStore.__persistor : syncStore}
      loading={children}
    >
      {children}
    </PersistGate>
  );
};

