import React from "react";
import ReactDOM from "react-dom";

import { App } from "./components/App.js";

import "antd/dist/antd.css";
import "./styles.css";

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
