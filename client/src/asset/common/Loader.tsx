import style from "../asset.module.sass"
import preloader from "../Loader.svg"

export const Loader = () => {
  return (
    <div>
      <img className={style.preloader} alt="preloader" src={preloader} />
    </div>
  );
};
