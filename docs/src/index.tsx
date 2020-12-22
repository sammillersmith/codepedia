import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import { store } from "./models";
import { Provider } from "react-redux";
import { theme } from "@codecademy/gamut-styles";
import { ThemeProvider } from "@emotion/react";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,

  document.getElementById("root")
);
