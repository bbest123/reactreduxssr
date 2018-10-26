import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Index from './containers/Index';
import Image from './containers/Images';
import NotFound from './containers/NotFound';

const Routes = () => (
    <Switch>
        <Route path="/index" component={Index}/>
        <Route path="/images" component={Image}/>
        /* Any other route */
        <Route component={NotFound}/>
        /* end switch statement */
    </Switch>
);
/* export Routes */
export default Routes;

