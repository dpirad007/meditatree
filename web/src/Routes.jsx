import { Switch, Route } from 'react-router-dom';

import AuthRoute from './components/AuthRoute';
import LoginAndRegister from './pages/LoginAndRegister/LoginAndRegister';
import Home from './pages/Home/Home';
import LeaderBoard from './pages/LeaderBoard/LeaderBoard';
import Streaks from './pages/Streaks/Streaks';

const Routes = () => (
  <Switch>
    <Route path='/login'>
      <LoginAndRegister />
    </Route>
    <AuthRoute exact path='/' component={Home} />
    <AuthRoute exact path='/leaderboard' component={LeaderBoard} />
    <AuthRoute exact path='/streaks' component={Streaks} />
  </Switch>
);

export default Routes;
