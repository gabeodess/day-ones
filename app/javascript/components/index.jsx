import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

document.addEventListener("turbo:load", () => {
  const div = document.getElementById('react-app')
  if(div) {
    div.innerHtml = '';
    const root = createRoot(div);
    root.render(<App />);
  }
});
