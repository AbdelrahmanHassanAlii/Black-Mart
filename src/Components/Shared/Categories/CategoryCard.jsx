/* eslint-disable react/prop-types */
import style from "../../../assets/CSS/Shared/CategoryCard.module.css";
export default function CategoryCard({ image, name }) {
  return (
    <div className={style.categoryCard}>
      <img className={style.image} src={image} alt={name} />
      <p className={style.name}>{name}</p>
    </div>
  );
}
