import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";
import { AppLayout } from "./components/AppLayout";
import { ErrorPage } from "./components/ErrorPage";
import { Login, loginData } from "./components/Login";
import { Register, registerData } from "./pages/Register";
import { profileLoader } from "./API/profileLoader.jsx";
import { usersLoader } from "./API/usersLoader.jsx";
import { EditUser } from "./pages/EditUser.jsx";
import { getUserById } from "./API/getUserById.jsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/home",
          element: <Home />,
          loader: usersLoader,
        },
        {
          path: "/edit-user/:id",
          element: <EditUser />,
          loader: getUserById,
        },
        {
          path: "/login",
          element: <Login />,
          action: loginData,
        },
        {
          path: "/register",
          element: <Register />,
          action: registerData,
        },
        {
          path: "/profile/:id",
          element: <Profile />
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
