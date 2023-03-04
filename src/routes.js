import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//

import HomePage from './pages/HomePage';
import Page404 from './pages/Page404';
import ExcelExportPage from "./pages/ExcelExportPage";
import ExcelImportPage from "./pages/ExcelImportPage";

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/excel',
      element: <DashboardLayout />,
      children: [
        { path: 'export', element: <ExcelExportPage/>},
        { path: 'import', element: <ExcelImportPage/>},
      ],
    },
    {
      path: '/home',
      element: <HomePage />,
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
