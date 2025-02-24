import { registerApplication, start } from "single-spa";
import microfrontendLayout from "./microfrontend-layout";
// switch to using .ts file instead of import microfrontendLayout from "./microfrontend-layout.html";
import "regenerator-runtime/runtime";

import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";


const routes = constructRoutes(microfrontendLayout);

interface LoadAppProps {
  name: string;
}

const getBaseUrl = (name: string) => {
  switch (name) {
    case "@simple-portals/angular-spa":
      return "http://localhost:8081";
    case "@simple-portals/react-spa":
      return "http://localhost:8082";
   default:
      return "http://localhost:9001"; // Default root config host
  }
};


const applications = constructApplications({
  routes,
  loadApp: async ({ name }: LoadAppProps) => {
    try {
      const baseUrl = getBaseUrl(name);
      return import(/* webpackIgnore: true */ `${baseUrl}/${name}/main.js`);
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
