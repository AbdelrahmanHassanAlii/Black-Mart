import style from "../../../assets/CSS/Shared/Loading.module.css";
export default function Loading() {
  return (
    <div className={style.SpinnerContainer}>
      <div className={style.Spinner}></div>
      <div className={style.Loader}>
        <p>loading</p>
        <div className={style.Words}>
          <span className={style.Word}>posts</span>
          <span className={style.Word}>images</span>
          <span className={style.Word}>followers</span>
          <span className={style.Word}>hashtags</span>
          <span className={style.Word}>posts</span>
        </div>
      </div>
    </div>
  );
}
