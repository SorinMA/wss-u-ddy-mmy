import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {ImgProvider} from "./context/ImgContext"

ReactDOM.render(
  <ImgProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ImgProvider>,
  document.getElementById('root')
);