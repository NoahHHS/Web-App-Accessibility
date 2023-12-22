import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { Bedrijfs } from './components/bedrijfs/Bedrijf';
import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { Privacystatement } from "./components/privacystatement"
import { OverOns } from "./components/overons";
import { Onderzoek } from "./components/onderzoek";
import { Profiel } from "./components/profiel";
import { Login } from "./components/login";
import { Registreer } from "./components/registreer";
import { Medewerker } from "./components/medewerker";

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
    requireAuth: true,
    element: <FetchData />
  },
  {
    path: '/privacystatement',
    element: <Privacystatement/>
  },
  {
    path: '/bedrijfs',
    element: <Bedrijfs/>
  },
  {
    path: '/medewerker',
    element: <Medewerker/>
  },
  {
    path: '/profiel',
    element: <Profiel/>
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/registreer',
    element: <Registreer/>
  },
  {
    path: '/onderzoek',
    element: <Onderzoek/>
  },
  {
    path: '/overons',
    element: <OverOns/>
  },
  ...ApiAuthorzationRoutes
];

export default AppRoutes;
