import { Routes, Route } from "react-router-dom";
import { routerList } from "./router-list";

export const Router = () => {
  return (
    <Routes>
      {routerList.map((route) => (
        <Route key={route.key} path={route.path} element={<route.JSX />} />
      ))}
    </Routes>
  );
};
