import React from "react";
import {createRoot} from "react-dom/client";
import {Pitch} from "./components/pitch";
import "./style.css";
createRoot(document.getElementById("root")!).render(<Pitch defaultLanguage="ko"/>);
