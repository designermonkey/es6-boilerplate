import React from "react";
import ReactDOM from "react-dom";
import App from "./components/application";

const root = document.createElement("div");
root.id = "root";

document.querySelector("body").appendChild(root);

ReactDOM.render(<App />, document.getElementById("root"));
