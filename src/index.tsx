import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GApiService } from './GApiService';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
GApiService.instance.init();
root.render(
  <React.StrictMode>
    {/* <div className="topright">Top Right</div> */}
    <App />
  </React.StrictMode>
);

