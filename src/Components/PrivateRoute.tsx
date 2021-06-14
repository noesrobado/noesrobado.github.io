/**
 * Handle private route for react-router
 *
 * Usage:
 *   <PrivateRoute exact path="/private" component={comp} redirectionURI="/login"  />
 */

import { Route, Redirect } from 'react-router'

export const PrivateRoute = ({
  component: Component,
  isAuthenticated,
  redirectionURI = '/login',
  ...rest
}: any) =>
  isAuthenticated ? (
    <Route component={Component} {...rest} />
  ) : (
    <Redirect to={redirectionURI} />
  )
