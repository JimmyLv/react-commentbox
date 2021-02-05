import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { CommentProvider } from './hooks/useComment'

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <CommentProvider>
      <App />
    </CommentProvider>
  </React.StrictMode>,
  rootElement
);
