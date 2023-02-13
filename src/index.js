import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Register from './Register';
import Friends from './Friends';
import Myroutes from './Myroutes';
import { Provider } from 'react-redux';
import store from './AllState';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Provider store={store}> 
   <Myroutes/>
   </Provider>
  </React.StrictMode>
);

