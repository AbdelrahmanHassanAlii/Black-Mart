import InfoCard from "./InfoCard";

import style from "../../assets/CSS/Admin/HomeCards.module.css";

import { TbCategoryPlus } from "react-icons/tb";
import { AiOutlineProduct } from "react-icons/ai";
import { PiUsersThreeLight } from "react-icons/pi";
import { MdOutlineLocalShipping } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";

export default function HomeCards ()  {
    return(
        <div className={style.Cards}>
            <InfoCard icon={<PiUsersThreeLight />} iconColor={"#74C1ED"} name="Users" number="1000" color="#F0F9FF"/>
            <InfoCard icon={<TbCategoryPlus />} iconColor={"#EE95C5"} name="Categories" number="1000" color="#FEF6FB"/>
            <InfoCard icon={<AiOutlineProduct />} iconColor={"#F6C762"} name="Products" number="1000" color="#FEFBEC"/>.
            <InfoCard icon={<MdOutlineLocalShipping />} iconColor={"#74C1ED"} name="Orders" number="1000" color="#F0F9FF"/>
            {/* <InfoCard icon={<MdOutlineLocalShipping />} name="Delivery" number="1000" color="liner-gradient(180deg, #FEAF00 0%, #F8D442 100%)"/> */}
            {/* <InfoCard icon={<LuLogOut />} name="Logout" number="1000" color="#F0F9FF"/> */}

        </div>
    )
}