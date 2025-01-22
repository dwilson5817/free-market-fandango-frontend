import LogoIcon from '@/assets/logo-icon.svg'
import { BookMarked, CircleDollarSign, CreditCard, HomeIcon, Menu, Wrench } from 'lucide-react'
import { Link, NavLink } from 'react-router'
import { useState } from 'react'
import { Button, buttonVariants } from '@/components/ui/button.tsx'
import { ModeToggle } from '@/components/mode-toggle.tsx'

const links = [
  {
    name: 'Home',
    to: '/',
    icon: <HomeIcon className="h-4 w-4" />,
  },
  {
    name: 'Card',
    to: '/card',
    icon: <CreditCard className="h-4 w-4" />,
  },
  {
    name: 'Stocks',
    to: '/stocks',
    icon: <CircleDollarSign className="h-4 w-4" />,
  },
  {
    name: 'Help',
    to: '/help',
    icon: <BookMarked className="h-4 w-4" />,
  },
]

export const NavigationBar = () => {
  const [ dropdownActive, setDropdownActive ] = useState(false)

  return (
    <nav className="md:h-16 border-b bg-muted/40 flex items-center">
      <div className="container w-full mx-auto px-4 lg:px-6 md:flex items-center gap-6">
        <div className="flex flex-grow my-3 md:my-0 items-center md:flex-initial">
          <Link to="/" className="flex flex-grow md:flex-initial gap-2">
            <img
              src={LogoIcon as string}
              className="h-6 w-6"
              alt="Free Market Fandango Logo"
            />

            <span className="font-bold">
            Free Market Fandango
          </span>
          </Link>
          <Button
            className="flex md:hidden"
            onClick={() => setDropdownActive(!dropdownActive)}
            variant="outline"
            size="icon"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        <div className={`${!dropdownActive && 'hidden'} block md:flex md:flex-1 md:gap-5 text-sm`}>
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.to}
              className={({ isActive }) =>
                isActive
                  ? 'flex items-center space-x-2 mb-2 md:mb-0 text-primary font-semibold transition-colors hover:text-primary'
                  : 'flex items-center space-x-2 mb-2 md:mb-0 text-muted-foreground font-semibold transition-colors hover:text-primary'
              }
            >
              {link.icon}

              <span>
                  {link.name}
                </span>
            </NavLink>
          ))}
        </div>
        <div className={`${!dropdownActive ? 'hidden' : 'flex'} mt-4 mb-3 md:my-0 md:flex flex-initial gap-1`}>
          <Link
            to="/admin"
            className={buttonVariants({
              variant: 'outline',
              size: 'icon',
            })}
          >
            <Wrench className="w-5 h-5" />
          </Link>
          <ModeToggle />
        </div>
      </div>
    </nav>
  )
}
