**Project Name: Fronend For Sleep Tracking App Cynomi Assignment**

## Description:

This project is a frontend application built using React with TypeScript, React Query, and Axios. It provides a robust foundation for creating dynamic and efficient web applications by leveraging the power of React Query for data fetching and caching, along with Axios for making HTTP requests. With TypeScript, you benefit from static typing, enabling better code organization, reliability, and scalability.

## Features:

- **React Components**: Utilize reusable React components to create a modular and maintainable UI.
- **TypeScript**: Leverage the benefits of TypeScript for static typing, improving code quality and developer productivity.
- **AntD**: A UI library to develop forms, tables and other components
- **React Query**: Seamlessly manage data fetching, caching, and synchronization with server data using React Query, enhancing performance and reducing boilerplate code.
- **Axios**: Make HTTP requests to interact with backend APIs easily and efficiently.

## Installation:

1. Clone the repository:
   ```
   git clone https://github.com/mohsinshafique7/cynomi_fe.git
   ```
2. Navigate to the project directory:
   ```
   cd cynomi_fe
   ```
3. Install dependencies:
   ```
   yarn or npm install
   ```

## Usage:

1. Start the development server:
   ```
   npm start
   ```
2. Open your web browser and visit `http://localhost:3000` to view the application.

## Configuration:

- Configure Axios base URL and other options in the Axios configuration file (`axiosConfig.js` or similar).

## Test Coverage

Test coverage report can be found in `coverage/icov-report/index.html`.

### Tests Detail:

#### Entry Form:

- All text and labels should be displayed.
- If not filled errors should be displayed.
- Test Date Formate validations
- Test Date future date validation
- Sleep time must be between 1 and 24

#### History Table:

- Loading component should be displayed.
- Renders error component when account data fetch fails.
- Renders account data but not charts on successful data fetch
- On Click Show Charts Component

#### Charts:

- Renders no record message when no data is provided.
- Renders chart when data is provided.

#### Get Hooks:

- useGetAllAccounts fetches data correctly
- useGetLastSevenDaysData fetches data correctly.

## Folder Structure:

```
src/
|-- __tests__/          # Unit tests for the components and hooks
|-- components/         # React components
|-- Hooks/              # Custom hooks for React Query or other functionality
|-- Pages/              # Pages rendered by router
|-- tests.utils/        # Utility function of testing
|-- App.tsx             # Main application component
|-- index.tsx           # Entry point of the application
|-- axiosConfig.js      # Axios configuration (optional)
|-- .nvmrc              # node version
```

## Future Thought:

There are many things which can be added to improve frontend, Adding more CSS to make it responsive, usage of css frameworks like tailwind css and styled component for factored css files.
Usage of any State management like redux when app will grow. Creating Dynamic Components e.g a single component of form can be used to create diffrent forms. It will help to maintain base configurations for the components.
