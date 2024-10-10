/* eslint-disable react/prop-types */
import style from "../../assets/CSS/Admin/CouponeCard.module.css";
export default function CouponeCard({ couponeData }) {
  return (
    <div className={style.CouponeCard}>
      <p className={style.couponeName}>{couponeData.discount}</p>
      <p className={style.couponeCode}>{couponeData.code}</p>
      <p className={style.couponeCode}>{couponeData.expiry}</p>
    </div>
  );
}
