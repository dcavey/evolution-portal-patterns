import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import microfrontendLayout from "./microfrontend-layout.html";

const routes = constructRoutes(microfrontendLayout);

interface LoadAppProps {
  name: string;
}

const getBaseUrl = () => 'http://localhost:8081';

const applications = constructApplications({
  routes,
  loadApp: async ({ name }: LoadAppProps) => {
    try {
      const baseUrl = getBaseUrl();
      
      switch (name) {
        case "@simple-portals/angular-spa":
          return import(
            /* webpackIgnore: true */ 
            `${baseUrl}/angular-spa/main.js`

          );
          /*
          case "@simple-portals/react-spa":
          return import(

            `${baseUrl}/react-spa/main.js`
          );*/
        default:
          return import(/* webpackIgnore: true */ name);
      }
    } catch (error) {
      console.error(`Failed to load micro frontend: ${name}`, error);
      throw error;
    }
  },
});

const layoutEngine = constructLayoutEngine({ routes, applications });

applications.forEach((app) => {
  try {
    registerApplication(app);
  } catch (error) {
    console.error(`Failed to register application: ${app.name}`, error);
  }
});

Promise.all([
  layoutEngine.activate(),
  start()
]).catch(error => {
  console.error('Failed to start the application:', error);
});
