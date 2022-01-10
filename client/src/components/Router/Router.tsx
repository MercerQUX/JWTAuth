import { Routes, Route } from "react-router-dom";
import { AfterAuth } from "../AfterAuth/AfterAuth";
import { Auth } from "../Auth/Auth";
import { Index } from "../Index/Index";
import { Page404 } from "../Page404/Page404";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/afterauth" element={<AfterAuth />} />
      <Route path="/index" element={<Index />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};
