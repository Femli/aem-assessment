# Project - Roman Numeral Conversion App

![Roman Tablet](/public/roman-tablet.png)

The Roman Numeral Conversion App application takes any Western-Arabic Numbers (range 1-3999) and prints out the Roman Number equivalent. This is a lightweight application meant to run locally in your system.

This app consists of a Node.js backend service running on port 8080 and a React frontend running on port 3000.

*Prerequisites*
- Node.js (v18 or higher)
- npm (v9 or higher)

## Installation

1. Clone the repository:
```
git clone https://github.com/Femli/aem-assessment.git
cd aem-assessment
```

2. Install the node dependencies:
```
npm install
```

## Running the App

You'll need to run both the node backend and React frontend services:
```
npm run start:be //starts node server
npm run start:fe //starts React server
```
- Backend listening on: http://localhost:8080
- Fronend listening on: http://localhost:3000

## Using the App

You can interact with the conversion service via the node server on http://localhost:8080.
Visit the following endpoint `GET /romannumeral?query={number}` and submit your query parameter for a JSON response.
![Backend Web Demo](/public/backend-demo.png)

If you wish to interact via the React UI, visit http://localhost:3000 and you can submit the form instead.
![Frontend Web Demo](/public/frontend-demo.png)

## Development

Should you wish to make your own additions or contributions, here is some tooling to help you:
```
npm run dev //uses nodemon for hot-reloading
npm run build //builds and packages the frontend for production
```

To run the Jest unit tests:
```
npm test //Run all tests
npm run test:watch //Run tests in interactive mode
npm run test:leakCheck //Run tests with memory leak detection
```

## Package Layout
Project files and their purpose:
```
aem-assessment/
├── .vscode/                   # VSCode configuration
│   └── launch.json            # Debug/launch configuration
│
├── server/                   # Backend Node.js service
│   ├── services/             # Backend services
│   │   ├── roman-numeral-conversion/
│   │   │   ├── romanNumeralService.js      # Roman numeral conversion logic
│   │   │   └── romanNumeralService.test.js # Jest unit tests
│   │   └── server/
│   │       ├── serverService.js            # HTTP server configuration
│   │       └── serverService.test.js       # Jest unit tests
│   └── server.js            # Server entry point
│
├── src/                     # Frontend React application
│   ├── components/          # React components
│   │   ├── InputField.jsx   # Input field component
│   │   ├── InputForm.jsx    # Input form component
│   │   ├── ThemeSetter.jsx  # Theme context provider
│   │   └── Toggler.jsx      # Toggle component
│   ├── styles/            
│   │   └── main.css       # Global styles and Tailwind
│   ├── App.jsx            # Root React component
│   ├── index.html         # HTML template
│   └── index.js           # Frontend entry point
│
├── public/                 # Static assets directory
│
├── .gitignore             # Git ignore configuration
├── jest.config.js         # Jest testing configuration
├── package.json           # Project dependencies and scripts
├── package-lock.json      # Locked dependency versions
├── postcss.config.js      # PostCSS configuration
├── README.md              # Project documentation
├── tailwind.config.js     # Tailwind CSS configuration
└── webpack.config.js      # Frontend build configuration
```

## About the App
The object was to keep the backend simple. There are two primary services at play here:
- `Server Service`: Responsible for the configuration and orchestration of the server instance, endpoints, and error handling.
- `Roman Numeral Service`: Executes the actual conversion. The roman numeral system is position-based, so it was a matter of implementing a recursive pattern-approach for numbers based on the number of digits they have. Special note that there was no web searches or AI involved in figuring out this approach. Just a notepad and brain power.

Since we used a node.js server, there is no special packaging here. Only

### Test Approach
In terms of app dependencies, the Jest unit testing library is universally popular in the Javascript community, so it was a safe bet. Not only are unit tests account for 100% code and branch coverage, but they go further beyond in ensuring tests are thorough and thoughtful.

![Test Coverage](/public/test-coverage.png)

## About Dependencies

### Core Dependencies

- React (^19.0.0): Frontend UI library
- React DOM (^19.0.0): React rendering for web browsers
- Tailwind CSS (^3.4.17): Utility-first CSS framework for styling
- HeadlessUI (^2.2.0): Unstyled, accessible UI components

### Dev Dependencies

- Build Tools
    - webpack (^5.97.1): Module bundler
    - webpack-cli (^6.0.1): CLI tools for webpack
    - webpack-dev-server (^5.2.0): Development server with hot reload
    - html-webpack-plugin (^5.6.3): Generates HTML files for webpack bundles


- Transpilation
    - @babel/core (^7.26.0): JavaScript compiler
    - @babel/preset-env (^7.26.0): Smart preset for Babel
    - @babel/preset-react (^7.26.3): React preset for Babel
    - babel-loader (^9.2.1): Webpack loader for Babel


- Styling
    - postcss (^8.4.49): Tool for transforming CSS
    - autoprefixer (^10.4.20): PostCSS plugin for vendor prefixes
    - css-loader (^7.1.2): Webpack loader for CSS files
    - style-loader (^4.0.0): Injects CSS into DOM
    - postcss-loader (^8.1.1): PostCSS loader for webpack


- Testing
    - jest (^29.7.0): Testing framework
    - supertest (^7.0.0): HTTP testing library
    - @faker-js/faker (^9.3.0): Generate fake data for testing


- Development Utilities
    - nodemon (^3.1.9): Auto-restart Node.js application during development

The application uses ES modules ("type": "module" in package.json) and requires Node.js version 18 or higher due to the use of modern JavaScript features.