/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import style from "../../assets/CSS/Admin/CouponeCard.module.css";
import { FaPercent } from "react-icons/fa";

export default function CouponeCard({ coupon }) {
  return (
    <div className={style.CouponeCard}>
      <div className={style.couponeInfo}>
        <div className={style.couponeDiscountContainer}>
          <p className={style.couponeDiscount}>{coupon.discount}</p>
          <FaPercent />
        </div>

        <p className={style.couponeCode}>{coupon.code}</p>
        <p className={style.couponeExpiry}>{coupon.expiry}</p>
      </div>

      <div className={style.couponeActions}>
        <Link
          className={style.couponeEdit}
          to={`/admin/coupons/${coupon.id}/edit`}
        >
          Edit
        </Link>
        <button className={style.couponeDelete}>Delete</button>
      </div>
    </div>
  );
}
