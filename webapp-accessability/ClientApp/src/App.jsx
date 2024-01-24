import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
//import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import CustomAuthorizeRoute from './components/api-authorization/CustomAuthorizeRoute';
import { Layout } from './components/Layout';
import './custom.css';

export default class App extends Component {
    // ... other code ...

    render() {
        return (
            <Layout>
                <Routes>
                    {AppRoutes.map((route, index) => {
                        const { element, requireAuth, requiredRoles, ...rest } = route;
                        return (
                            <Route 
                                key={index} 
                                {...rest} 
                                element={
                                    requireAuth ? 
                                    <CustomAuthorizeRoute 
                                        element={element} 
                                        requiredRoles={requiredRoles || ["Admin", "Medewerker", "Ervaringsdeskundige", "Bedrijf"]} // Pass requiredRoles
                                    /> : 
                                    element
                                } 
                            />
                        );
                    })}
                </Routes>
            </Layout>
        );
    }
}
