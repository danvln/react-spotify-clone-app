import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { REACT_APP_REDIRECT_PATH } from "../../utils/constants";

import LoggedInOrNot from "../LoggedInOrNot";
import SpotifyLogin from "../SpotifyLogin";
import Player from "../Player";
import NotFoundPage from "../NotFoundPage";
import SpotifyLogout from "../SpotifyLogout";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <div className="main">
        <Switch>
          <Route exact path="/" component={LoggedInOrNot} />
          <Route exact path="/home" component={Player} />
          <Route path={REACT_APP_REDIRECT_PATH} component={SpotifyLogin} />
          <Route path="/logout" component={SpotifyLogout} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};
export default AppRouter;
