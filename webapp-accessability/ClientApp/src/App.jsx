// App.jsx

import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import { Layout } from './components/Layout';
import './custom.css';

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Routes>
                    {AppRoutes.map((route, index) => {
                        const { element, requireAuth, ...rest } = route;
                        const RouteComponent = requireAuth ? AuthorizeRoute : Route;
                        return <RouteComponent key={index} {...rest} element={element} />;
                    })}
                </Routes>
            </Layout>
        );
    }
}
