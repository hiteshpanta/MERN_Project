import { useSelector } from "react-redux";
import OrderList from "../orders/OrderList";
import UpdateUser from "./UpdateUser";

export default function UserProfile() {
  const { user } = useSelector((state) => state.userSlice);
  return (
    <div className="grid grid-cols-[1fr_1.5fr]">

      <div>
        <UpdateUser user={user} />

      </div>
      <OrderList user={user} />


    </div>
  )
}
