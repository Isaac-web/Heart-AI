import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"

const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route index element={<HomePage />}></Route>
    )
  )
  return (
    <RouterProvider router={router} />
  )
}

export default App