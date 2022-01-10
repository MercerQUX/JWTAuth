import { Router } from "./components/Router/Router";
import style from "./main.module.sass";



function App() {
  return <div className={style.main_container}>
    <Router/>
  </div>;
}

export default App;
