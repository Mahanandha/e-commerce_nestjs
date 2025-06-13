import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
reportWebVitals();
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { Provider } from 'react-redux';

// import App from './App';
// import { store } from './store';

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <Provider store={store}>
//     <App />
//   </Provider>
// );
