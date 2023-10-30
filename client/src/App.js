import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Write from "./pages/Write";
import Single from "./pages/Single";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Changepass from "./pages/Changepass";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import TopUp from "./pages/TopUp"
import Transaction from "./pages/Transaction";
import "./styles/style.scss"

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/post/:id",
        element: <Single />,
      },
      {
        path: "/write",
        element: <Write />,
      },
      {
        path: "/Changepass",
        element: <Changepass />,
      },
      {
        path: "/Usermenu",
        element: <Menu />,
      },
      {
        path: "/Cart",
        element: <Cart />,
      },
      {
        path: "/Transaction",
        element: <Transaction />,
      },
      {
        path: "/TopUp",
        element: <TopUp />,
      },
    ]
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
