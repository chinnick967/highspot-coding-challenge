# highspot-coding-challenge
A card-rendering UI for Highspot's coding challenge interview. This project uses AirBnB linting.

## Installation

Install NPM (https://www.npmjs.com/get-npm)  
  
Clone the respository into a local directory  
  
Run `npm install` to install dependencies  
  
Run `npm run start` to initialize the app on port 8080  
  
Open http://localhost:8080/ in your browser  

## Known Issues

- Card description text can overflow from the container in rare cases
- No error handling for when the API doesn't return the expected response
- Removing checkboxes or searching for a name will sometimes have issues if you're scrolled down the page

## Further Improvements

- Add in testing infrastructure and tests for components
- Implement TypeScript and replace PropTypes library
- More styling on Filters menu
- Earlier infinite scrolling API calls to increase smoothness
- More Filters to increase searchability
- Fit the lazy loading boxes to more closely match returned data
- CSS media queries adjusted to be mobile-first, left as-is because changes for mobile were minimal
- On mobile, when the filter menu pulls out there should be a black overlay behind the filter menu
- Add "Scroll to Top" button to return the user to the top of the page
- Scroll the user to the top of the page when they use a filter to see the newest results