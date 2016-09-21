import bareRoutes from './routes/bare';
import portalRoutes from './routes/portal';
export default (store, subdomain) => {
  let routes = null;
  if (subdomain) {
    routes = portalRoutes({ store, subdomain});
  } else {
    routes = bareRoutes({ store });
  }
  return routes;
};
