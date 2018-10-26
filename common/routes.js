import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Index from './containers/Index';
import Image from './containers/Images';
import NotFound from './containers/NotFound';
/**
 * Defines the constructor for the router
 * Used for both server side & client side rendering
 * switch statement for routing to different routes
 * phones context root to use Phones component
 * tablets context root to use Tablets component
 * prepaid context root to use Prepaid component
 * sim context root to use Sim component
 * @constructor
 */
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

