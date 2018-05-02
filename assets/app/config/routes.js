export default {
  landing: '/',
  createRoom: '/create-room',
  signup: '/signup',
  login: '/login',
  room: '/room/:roomUrl',
};

/**
 * replaces a route with the params
 *
 * argument 1: the route : /someRoute/:someParam
 * argument 2: the parameters : { someParam: 15 }
 *
 * will return /someRoute/15
 */
export const createRoute = (route, params) =>
  Object.keys(params).reduce(
    (r, key) => r
      .replace(new RegExp(`/:${key}/`, 'g'), `/${params[key]}/`)
      .replace(new RegExp(`/:${key}$`, 'g'), `/${params[key]}`),
    route,
  );
