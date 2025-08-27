import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import reducer from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));

const store = configureStore({ reducer: reducer }); // reducer 는 pub(상태 변경) sub은 라이브러리가 자동으로 관리해주고 pub만 하면 된다.

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
