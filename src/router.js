import routes from "./routes.js"
import VueRouter from "vue-router";


/**
 * Sets up the router with the defined routes in routes.js
 *
 * @return {VueRouter}
 */
export function routerSetup() {
    let router = new VueRouter(
        {
            routes: routes,
            mode: 'history'
        }
    );


    router.beforeEach(async (to, from, next) => {
        if (to.meta.notLoggedIn) {

            if (sessionStorage.getItem("token") === null) {
                next();
            } else {
                // Redirect to login
                next({ name: "Home"})
            }
        }
        else {
            next();
        }
    });
    return router;


}

    export default routerSetup;
