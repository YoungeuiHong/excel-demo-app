import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BackendDashboardLayout from "./layouts/dashboard/BackendDashboardLayout";
import {HeaderDefinePage, HomePage, Page404, FrontExportPage, FrontImportPage, BackExportPage, BackImportPage} from "./pages";

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/home',
      element: <HomePage/>,
    },
    {
      path: '/excel-front',
      element: <DashboardLayout/>,
      children: [
        { path: 'header', element: <HeaderDefinePage/>},
        { path: 'export', element: <FrontExportPage/>},
        { path: 'import', element: <FrontImportPage/>},
      ],
    },
    {
      path: '/excel-back',
      element: <BackendDashboardLayout/>,
      children: [
        { path: 'export', element: <BackExportPage/>},
        { path: 'import', element: <BackImportPage/>},
      ],
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/home" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
