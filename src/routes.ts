import { dAppName } from 'config';
import Lotteries from 'pages/Lotteries';
import withPageTitle from './components/PageTitle';
import Nftickets from './pages/Nftickets';
import Home from './pages/Home';
import Transaction from './pages/Transaction';
import Dashboard from './pages/Dashboard';

export const routeNames = {
  home: '/',
  dashboard:'/dashboard',
  nftickets: '/nftickets',
  transaction: '/transaction',
  lotteries: '/lotteries',
  unlock: '/unlock',
  ledger: '/ledger',
  walletconnect: '/walletconnect',

};

//eslint-disable-next-line    @typescript-eslint/no-explicit-any
const routes: Array<any> = [
  {
    path: routeNames.home,
    title: 'Home',
    component: Home
  },
  {
    path: routeNames.dashboard,
    title: 'Dashboard',
    component: Dashboard
  },
  {
    path: routeNames.nftickets,
    title: 'Nftickets',
    component: Nftickets,
    //authenticatedRoute: true
  },
  {
    path: routeNames.transaction,
    title: 'Transaction',
    component: Transaction
  },
  {
    path: routeNames.lotteries,
    title: 'Lotteries',
    component: Lotteries
  },
 
];

const mappedRoutes = routes.map((route) => {
  const title = route.title
    ? `${route.title} • Elrond ${dAppName}`
    : `Elrond ${dAppName}`;

  const requiresAuth = Boolean(route.authenticatedRoute);
  const wrappedComponent = withPageTitle(title, route.component);

  return {
    path: route.path,
    component: wrappedComponent,
    authenticatedRoute: requiresAuth
  };
});

export default mappedRoutes;
