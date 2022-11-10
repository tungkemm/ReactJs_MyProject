import React from "react";
import { useRoutes } from "react-router-dom";
import Introduce from "../pages/Introduce/Introduce";
import HeaderApp from "../components/HeaderApp/HeaderApp";
import Home from "../pages/Home/Home";
import Project1 from "../pages/Project1/Project1";
import Project2 from "../pages/Project2/Project2";
import GoToIntroducePage from "../pages/GoToIntroducePage";
import Notfound from "../pages/NotFound/Notfound";

const RouterPage = () => {
  let Routes = useRoutes([
    {
      path: "/login",
      element: <Introduce />,
    },
    {
      path: "/",
      element: <HeaderApp />,
      children: [
        {
          path: "",
          element: <GoToIntroducePage />,
        },
        {
          path: "home",
          element: <Home />,
        },
        {
          path: "project1",
          element: <Project1 />,
        },
        {
          path: "project2",
          element: <Project2 />,
        },
      ],
    },
    {
      path: "*",
      element: <Notfound/>,
    },
  ]);

  return Routes;
};

export default RouterPage;
