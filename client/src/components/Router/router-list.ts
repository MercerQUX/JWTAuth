import { IndexContainer } from "../Index/IndexContainer";
import { Page404 } from "../Page404/Page404";
import { AfterAuthContainer } from "./../AfterAuth/AfterAuthContainer";
import { Auth } from "./../Auth/Auth";
interface IDataList {
  key: number;
  path: string;
  JSX: React.FC<{}>;
}

export const routerList: Array<IDataList> = [
  { key: 1, path: "/", JSX: Auth },
  { key: 2, path: "/auth", JSX: Auth },
  { key: 3, path: "/afterauth", JSX: AfterAuthContainer },
  { key: 4, path: "/index", JSX: IndexContainer },
  { key: 5, path: "*", JSX: Page404 },
];
