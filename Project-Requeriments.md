### Overview

Please create a responsive web page that displays a form based on the following requirements. We have provided mockups to assist in styling. Although a desktop form factor is provided for reference, you should create a layout that changes to a single column at the breakpoint listed below. We also provided assets for you to use.


We have provided documentation for the API that will receive the form submission. You’ll need to mock this API yourself using any method that works for you.

### How We Evaluate

The design team at Hero Digital has provided you with designs for a new signup form! Your task is to build out the project to the designs inside the `/design` folder. You will find both a mobile and a desktop version of the design to work to. You can use any tools you like to help you complete the challenge. So if you've got something you'd like to practice, feel free to give it a go.


We leave the architecture and organization of the project up to you. We’ll want to discuss your approach when we meet with you to review the finished product. Note we do assume a NodeJs-based dev environment using npm for dependency management and scripting tasks.

Just like real requirements and design deliverables—these might not be perfect! If you note aspects of the design that you don’t agree with or feel strongly about, let us know!

It’s possible you will run out of time to complete the requirements, or you may get through quickly and have time left over :) In any case, please concentrate on the following core aspects and prioritize accordingly:

We should be able to run npm install && npm start and see a working page with a form that matches the designs as closely as possible. 
It should display and function well at the tablet/mobile breakpoint listed below. 
It should be coded with WCAG 2.1 AA guidelines in mind.
You may use whatever framework, library or plug-ins you want—but we expect the page and static resources to be as lightweight as possible. We will be looking at your assessment from a web performance standpoint.
The form should submit (if front-end validation passes) successfully to your mock API endpoint and the message returned should display on the page.

### Requirements

-   Implement assignment using:
    -   Language: **JavaScript**
    -   Framework: **any framework**
    -   NodeJS: **any version at or above 12.19.0**
    -   CSS: **We would prefer to see you use SASS**
    -   A11y: **Follow WCAG 2.1 AA Guidelines**
-   Running the project
    - Install dependencies: **npm install**
    - Run the project: **npm start**

When we open the files for review, we should be able to do the following (from project root):
-   Run `npm install` to install dependencies
-   Run `npm start` to view the web page locally (with the mock API endpoint returning a mock success response)

### UI Requirements

-   Front Family: [Open Sans](https://fonts.google.com/specimen/Open+Sans) (you can use Google Fonts CDN to load)
-   Breakpoint for tablet/mobile: <768px
-   Form Validation: Front-end only. No backend validation is required in your mock
-   Form fields should
    -   Be browser native
    -   With CSS styling to approximate the look of the design comps. No need to exactly match comps
    -   No need to create custom select lists or checkboxes that override the browser defaults.

### API documentation
-   Required fields (**bolded** fields are required inputs)
    -   **firstName: <FirstName>**
    -   **lastName: <LastName>**
    -   **email: <testemail@domain.org>**
        -   Standard email formatting
    -   org: <orgname> 
    -   **euResident: Yes/No**
    -   At least one of the checkbox options is required (Advances, Alerts or Other Communication)
        -   fieldName: advances
        -   fieldName: alerts
        -   fieldName: other
-   Form Submission: POST, Url-encoded form fields
-   Response: The mock just needs to return a success response. The UI should simply replace the form with the message shown here.
-   Bonus points for handling error case :)

```json
{ 
 "status": "success", 
 "message": "Thank you. You are now subscribed." 
} 

// bonus
{ 
  "status": "error", 
  "message": "Invalid Subscription request." 
}
```

### UX Guidance
See the provided Mockup files in `\design` folder for styling and UX reference. A certain amount of the UX experience we leave to you. Feel free to stick to a minimal version that simply matches the design comps, or you can add any bells and whistles you like! Be prepared to talk through your approach during the review.


-   Implement assignment using:
    -   Language: **JavaScript**
    -   Framework: **any framework**
-   Your users should be able to:
    -   View the optimal layout for the site depending on their device's screen size
    -   See hover states for all interactive elements on the page
    -   Receive an error message when the `form` is submitted if:
        -   Any `input` field is empty. The message for this error should say _"[Field Name] cannot be empty"_
        -   The email address is not formatted correctly (i.e. a correct email address should have this structure: `name@host.tld`). The message for this error should say _"Looks like this is not an email"_
-   You will find all the required assets in the `/images` folder. The assets are already optimized.
-   There is also a `style-guide.md` file, containing the information you'll need, such as color palette and fonts.

### Evaluation Criteria

-   **JavaScript** best practices
-   Show us your work through your commit history
-   We're looking for you to produce working code, with enough room to demonstrate how to structure components in a small program
-   Completeness: did you complete the features?
-   Correctness: does the functionality act in sensible, thought-out ways?
-   Maintainability: is it written in a clean, maintainable way?
-   Ease of use: Can we run `npm build && npm start` to run the whole thing?

### Deliverables

Make sure to include all source code in the repository. 

Please organize, design, test and document your code as if it were going into production - then push your changes to the master branch. After you have pushed your code, you may submit the assignment on the assignment page.

All the best and happy coding,

The Hero Digital Team