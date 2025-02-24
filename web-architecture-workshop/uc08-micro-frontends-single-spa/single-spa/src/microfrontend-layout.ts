export default {
    routes: [
      {
        type: "route",
        path: "angular",
        routes: [{ type: "application", name: "@simple-portals/angular-spa" }],
      },
      {
        type: "route",
        default: true,
        routes: [{ type: "application", name: "@single-spa/welcome" }],
      },
    ],
  };
  