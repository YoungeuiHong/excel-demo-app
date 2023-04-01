import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//

import HomePage from './pages/HomePage';
import Page404 from './pages/Page404';
import FrontExportPage from "./pages/FrontExportPage";
import FrontImportPage from "./pages/FrontImportPage";
import HeaderDefinePage from "./pages/HeaderDefinePage";
import BackExportPage from "./pages/BackExportPage";
import BackImportPage from "./pages/BackImportPage";
import BackendDashboardLayout from "./layouts/dashboard/BackendDashboardLayout";

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/home',
      element: <HomePage />,
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
