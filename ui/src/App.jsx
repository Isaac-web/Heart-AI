import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import AuthPage from "./pages/AuthPage"
import Dashboard from "./pages/Dashboard"

const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route index element={<HomePage />}></Route>
        <Route path="/auth" element={<AuthPage />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </>

    )
  )
  return (
    <RouterProvider router={router} />
  )
}

export default App