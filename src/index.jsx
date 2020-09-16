import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app";

import Styles from "./index.scss";

const root = document.createElement("div");
root.id = "root";
document.querySelector("body").prepend(root);

ReactDOM.render(<App />, root);
