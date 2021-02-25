import { Switch, Route } from "react-router-dom";

import AuthRoute from "./components/AuthRoute";
import LoginAndRegister from "./pages/LoginAndRegister/LoginAndRegister";
import Home from "./pages/Home/Home";
import LeaderBoard from "./pages/LeaderBoard/LeaderBoard";

const Routes = () => (
  <Switch>
    <Route path="/login">
      <LoginAndRegister />
    </Route>
    <Route exact path="/" component={Home} />
    <Route exact path="/leaderboard" component={LeaderBoard} />
  </Switch>
);

export default Routes;
