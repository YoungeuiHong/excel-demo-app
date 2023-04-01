import React from 'react';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/scroll-to-top';
import {Provider, getDefaultStore} from "jotai";
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS

// ----------------------------------------------------------------------

export const defaultStore = getDefaultStore();

export default function App() {
    return (
        <Provider store={defaultStore}>
            <ThemeProvider>
                <ScrollToTop/>
                <Router/>
            </ThemeProvider>
        </Provider>
    );
}
