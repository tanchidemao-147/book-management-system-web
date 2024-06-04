import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/es/integration/react'
import { store, persistor } from './redux/store'
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <PersistGate persistor={persistor}>
                    <Suspense fallback={<h3>loading</h3>}>
                        <App />
                    </Suspense>
                </PersistGate>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
