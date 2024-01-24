import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { Bedrijfs } from './components/bedrijfs/Bedrijf';
import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { Privacystatement } from "./components/privacystatement"
import { OverOns } from './components/overons/OverOns';
import { Onderzoek } from './components/onderzoek/Onderzoek';
import { ProfielEdit } from './components/profiel/ProfielEdit';
import { ProfielData } from './components/profiel/ProfielData';
// import { Login } from './components/api-authorization/Login';
import { Login } from './components/login/Login';
import { Registreer } from './components/registreer/Registreer';
import { Medewerker } from './components/medewerker/Medewerker';
import { Admin } from './components/admin/Admin';


import { useAuth } from './components/context/AuthContext';

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/fetch-data',
    element: <FetchData />,
  },
  {
    path: '/privacystatement',
    element: <Privacystatement />
  },
  {
    path: '/bedrijfs',
    element: <Bedrijfs />
  },
  {
    path: '/medewerker',
    element: <Medewerker />
  },
  {
    path: '/profiel',
    element: <ProfielData />,
    requireAuth: true,
  },
  {
    path: '/profiel/edit',
    element: <ProfielEdit />,
    requireAuth: true,
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/registreer',
    element: <Registreer />
  },
  {
    path: '/onderzoek',
    element: <Onderzoek />
  },
  {
    path: '/overons',
    element: <OverOns />
  },
  {
    path: '/admin',
    element: <Admin />
  },
  ...ApiAuthorzationRoutes
];

export default AppRoutes;