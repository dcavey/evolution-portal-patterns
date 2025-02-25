import { registerApplication, start } from "single-spa";
import "regenerator-runtime/runtime";

import {
  constructRoutes,
  constructApplications,
  constructLayoutEngine,
} from "single-spa-layout";

// Import the layout definition as a string thanks to raw-loader
import microfrontendLayout from "./microfrontend-layout.html";

// Construct the routes from the HTML layout
const routes = constructRoutes(microfrontendLayout);

// Define a helper function to return the base URL for each app by name
const getBaseUrl = (name: string): string => {
  switch (name) {
    case "@simple-portals/angular-spa":
      return "http://localhost:8001";
    case "@simple-portals/react-spa":
      return "http://localhost:8101";
    default:
      return "http://localhost:9001"; // For example, a welcome or default app
  }
};

// Construct applications from the routes. The loadApp function is responsible
// for dynamically importing the micro-frontend app.
const applications = constructApplications({
  routes,
  loadApp: async ({ name }) => {
    const baseUrl = getBaseUrl(name);
    // Use webpackIgnore to let the browser load the remote script dynamically.
    return import(/* webpackIgnore: true */ `${baseUrl}/main.js`);
  },
});

// Create the layout engine instance
const layoutEngine = constructLayoutEngine({ routes, applications });

// Register each application with single-spa
applications.forEach((app) => {
  registerApplication(app);
});

// Activate the layout engine and start single-spa
Promise.all([
  layoutEngine.activate(),
  start()
]).catch(error => {
  console.error("Failed to start the application:", error);
});
