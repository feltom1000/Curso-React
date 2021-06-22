import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Layout from "./Layout";
import BadgeNew from "../pages/BadgeNew";
import Badges from "../pages/Badges";
import NotFound from "../pages/NotFound";
import BadgeDetails from "../pages/BadgeDetailsContainer"
import Main from '../pages/Main';
import BadgeEdit from '../pages/BadgeEdit';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/badges" component={Badges} />
          <Route exact path="/badges/new" component={BadgeNew} />
          <Route exact path="/badges/:badgeId" component={BadgeDetails} />
          <Route exact path="/badges/:badgeId/edit" component={BadgeEdit} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
