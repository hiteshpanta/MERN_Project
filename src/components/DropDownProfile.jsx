import { UserIcon, LogOutIcon, ShoppingCart, LayoutDashboard, } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useDispatch } from 'react-redux';
import { removeUser } from '../features/user/userSlice';
import { useNavigate } from 'react-router';

const userItems = [
  {
    icon: UserIcon,
    property: 'Profile'
  },
  {
    icon: ShoppingCart,
    property: 'Cart'
  },
  {
    icon: LogOutIcon,
    property: 'Sign Out'
  }
];

const adminItems = [
  {
    icon: UserIcon,
    property: 'Profile'
  },
  {
    icon: LayoutDashboard,
    property: 'admin-panel'
  },
  {
    icon: LogOutIcon,
    property: 'Sign Out'
  }
];




export default function DropDownProfile({ user }) {
  const dispatch = useDispatch();
  const listItems = user.role === 'user' ? userItems : adminItems;
  const nav = useNavigate();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='secondary' size='icon' className='overflow-hidden rounded-full'>
          <img src='https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png' alt='Hallie Richards' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuGroup>
          {listItems.map((item, index) => (
            <DropdownMenuItem

              onClick={() => {

                switch (item.property) {
                  case 'Sign Out':
                    dispatch(removeUser());
                    break;
                  case 'Cart':
                    nav('/checkout');
                    break;
                  case 'Profile':
                    nav('/profile');
                    break;

                  case 'admin-panel':
                    nav('/admin-panel');
                    break;

                }
              }}
              key={index}>

              <item.icon />
              <span className='text-popover-foreground'>{item.property}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
