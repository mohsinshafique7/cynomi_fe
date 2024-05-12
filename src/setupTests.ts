// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import "@testing-library/jest-dom"
import { render } from "@testing-library/react"
// // Provide the server-side API with the request handlers.

// // const server = setupServer(...handlers)

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: any) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
})

// const customRender = (ui, options) =>
//   render(ui, {wrapper: AllTheProviders, ...options})

// const QueryClientRender = (componentTree: JSX.Element) => {
//   const queryClient = new QueryClient({
//     defaultOptions: {
//       queries: {
//         retry: false,
//       },
//     },
//   })
//   return (
//     <QueryClientProvider client={queryClient}>
//       {componentTree}
//     </QueryClientProvider>
//   )
// }
