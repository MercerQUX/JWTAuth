import { Routes, Route } from "react-router-dom";
import { AfterAuthContainer } from "../AfterAuth/AfterAuthContainer";
import { Auth } from "../Auth/Auth";
import { IndexContainer } from "../Index/IndexContainer";
import { Page404 } from "../Page404/Page404";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/afterauth" element={<AfterAuthContainer />} />
      <Route path="/index" element={<IndexContainer />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};
