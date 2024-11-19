import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import { Authenticator } from '@aws-amplify/ui-react'; //setp3 login function part1
import '@aws-amplify/ui-react/styles.css';//setp4 login function part2

Amplify.configure(outputs);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Authenticator signUpAttributes={[
        'name',
      ]}>
    <App />
    </Authenticator>
  </React.StrictMode>
);
