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
   npm install
   ```

## Usage:

1. Start the development server:
   ```
   npm start
   ```
2. Open your web browser and visit `http://localhost:3000` to view the application.

## Configuration:

- Configure Axios base URL and other options in the Axios configuration file (`axiosConfig.js` or similar).

## Folder Structure:

```
src/
|-- components/         # React components
|-- Pages/             # CSS or styling files
|-- Hooks/           # Custom hooks for React Query or other functionality
|-- App.tsx             # Main application component
|-- index.tsx           # Entry point of the application
|-- axiosConfig.js      # Axios configuration (optional)
```

## Future Thought:

There are many things which can be added to improve frontend, Adding more CSS to make it responsive, usage of css frameworks like tailwind css and styled component for factored css files.
Usage of any State management like redux when app will grow. Creating Dynamic Components e.g a single component of form can be used to create diffrent forms. It will help to maintain base configurations for the components.
