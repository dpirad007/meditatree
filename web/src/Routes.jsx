import { Switch, Route } from 'react-router-dom';

import LoginAndRegister from '../pages/LoginAndRegister/LoginAndRegister';

const Routes = () => (
  <Switch>
    <Route path='/login'>
      <LoginAndRegister />
    </Route>
  </Switch>
);

export default Routes;
