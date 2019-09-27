/* ==========================================================================
** App Routes Definition
** 28/08/2019
** Alan Medina Silva
** ========================================================================== */


// ?--------------------------------------
// ? Get View Components
// ?--------------------------------------
    import KbHomeView from '../views/kbHome/KBHome';
    import AddHeroCardView from '../views/addHeroCard/AddHeroCard';



// ?--------------------------------------
// ? Set Path from .ENV
// ?--------------------------------------
    const path = process.env.REACT_APP_SP_PATH
    // const path = '/qnaMaker'
    // const path = ''


// ?--------------------------------------
// ? Create & Export Routes
// ?--------------------------------------
    export const appRoutes = [
        {
            path: `${path}/home`,
            exact: true,
            key: 'route-homeView',
            menuTitle: 'Home',
            component: KbHomeView
        },
        {
            path: `${path}/add-card`,
            exact: true,
            key: 'route-addCard',
            menuTitle: 'Add Hero Card',
            component: AddHeroCardView
        },
        { redirect: true, path: '/', to: `${path}/home`, key: 'indexRedirect-route' }
    ]