export class Routes {

    public routes = {};

    constructor()
    {
        this.routes =
        {
            "dashboard": "HOME_PAGE.PAGE_TITLE",
            "REPORTS": "DASHBOARD.VISUALIZATION",
            "create-user": "USER_CREATE.PAGE_TITLE",
            "create-vehicle": "PARCEL_CREATE.PAGE_TITLE",
            "vehicle-list": "PARCELS_PAGE.PAGE_TITLE",
            "search-vehicle": "APP_TITLE",
            "user-list": "USERS_PAGE.PAGE_TITLE",
            "settings": "SETTINGS_PAGE.PAGE_TITLE",
            "lookup-list": "SCHEDULED_SEARCH_PAGE.PAGE_TITLE",
            "create-lookup": "CREATE_LOOKUP_PAGE.PAGE_TITLE",
        }
    }
}
