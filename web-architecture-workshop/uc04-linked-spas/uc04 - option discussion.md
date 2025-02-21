**Frontend Framework Choice: I can see Vue.js is listed in your package.json, but would you like to consider any other frontend frameworks, or should we stick with Vue.js?**
Use the Angular frontend framework.

**Routing Strategy:**
***Do you want to implement hash-based routing (#) or HTML5 history mode routing?***
Use HTML5 history mode routing

***Do you need to preserve any existing routes from the server-routing example?***
Yes, I want the same routes being used. 
BTW Is that a problem?

**SPA Structure:**
***How many separate SPAs do you plan to link together?***
I will ultimately link 3 SPAs. Bt we can start small.

***Will these SPAs share any common components or state?***
Yes, but not in uc04. That will come in later use cases

***Do you need authentication/authorization between the linked SPAs?***
Yes. But start small. We can go for more comprehesive authn/autz later.

**Deployment Architecture:**
***Will each SPA be deployed to a separate subdomain?***
Yes. Ultimately the SPAs will surely have their separate domain.

***Do you need to handle cross-origin communication between the SPAs?***
Yes. 

***Are you planning to deploy this on AWS (CloudFront + S3)?***
Maybe. Initialially I want to deploy the applications simpley as dockers in an EC2 instance.

**State Management:**
***Do you need a centralized state management solution across the SPAs?***
No. Not yet. That will be added as part of later use case.

***Should each SPA maintain its own independent state?***
Yes.

**Build System:**
***Would you like separate build configurations for each SPA?***
Yes.

***Do you want to share common dependencies between the SPAs?***
Not yet. This is an optimisation. 

Please provide your preferences for these options, and I can help you with the specific implementation details
