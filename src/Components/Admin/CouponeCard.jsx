/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import style from "../../assets/CSS/Admin/CouponeCard.module.css";
import { FaPercent } from "react-icons/fa";
import { extractDate } from "../../Helper/Funcation/extractDate";
import { getNowDate } from "../../Helper/Funcation/getNowDate";
import { GrValidate } from "react-icons/gr";
import { FaCalendarXmark } from "react-icons/fa6";
import { RxUpdate } from "react-icons/rx";
import { MdDelete } from "react-icons/md";

export default function CouponeCard({ coupon }) {
  return (
    <div className={style.CouponeCard}>
      <div className={style.couponeInfo}>
        <div className={style.couponeDiscountContainer}>
          <p className={style.couponeDiscount}>{coupon.discount}</p>
          <FaPercent />
        </div>

        <p className={style.couponeCode}>
          {" "}
          <span>Code: </span>
          {coupon.code}
        </p>
        <p className={style.couponeExpiry}>
          {getNowDate() > coupon.expiry ? (
            <span className={style.couponeDate}>
              <span>Ending: {extractDate(coupon.expiry)}</span>
              <span className={style.couponeExpired}>
                Expired <FaCalendarXmark />{" "}
              </span>
            </span>
          ) : (
            <span className={style.couponeDate}>
              <span>Ending: {extractDate(coupon.expiry)}</span>
              <span className={style.couponeValid}>
                Valid <GrValidate />
              </span>
            </span>
          )}
        </p>
      </div>

      <div className={style.couponeActions}>
        <Link
          className={style.couponeUpdate}
          to={`/admin/coupons/edit/${coupon._id}`}
        >
          Update
          <RxUpdate />
        </Link>
        <button className={style.couponeDelete}>
          Delete <MdDelete />{" "}
        </button>
      </div>
    </div>
  );
}
