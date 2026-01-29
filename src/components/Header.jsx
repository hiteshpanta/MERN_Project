import { NavLink } from "react-router";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";
import DropDownProfile from "./DropDownProfile";

export default function Header() {
  const { user } = useSelector((state) => state.userSlice);

  return (
    <div className="bg-gray-200 px-5 flex justify-between  items-end py-2">
      <h1 className="text-[30px] font-bold ">Luxora</h1>


      {user ? <DropDownProfile user={user} /> : <div className="space-x-5">
        <NavLink to={'/login'}>
          <Button variant="link" className={'text-[16px]'}>Login</Button>
        </NavLink>
        <NavLink to={'/signup'}>
          <Button>Sign Up</Button>
        </NavLink>

      </div>}



    </div>
  )
}



