import { Switch, Route } from 'react-router-dom';

import AuthRoute from './components/AuthRoute';
import LoginAndRegister from './pages/LoginAndRegister/LoginAndRegister';
import Home from './pages/Home/Home';

const Routes = () => (
  <Switch>
    <Route path='/login'>
      <LoginAndRegister />
    </Route>
    <AuthRoute path='/' component={Home} />
  </Switch>
);

export default Routes;
