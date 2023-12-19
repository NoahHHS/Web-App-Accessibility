import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { Bedrijfs } from './components/bedrijfs/Bedrijf';
import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { Privacystatement } from "./components/privacystatement"

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
  ...ApiAuthorzationRoutes
];

export default AppRoutes;
