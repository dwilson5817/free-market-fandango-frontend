import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import {
  ArrowLeft,
  Calendar,
  CreditCard,
  Gauge,
  LogOut,
} from 'lucide-react'
import { Link } from 'react-router'
import LogoIcon from '@/assets/logo-icon.svg'
import { useAuthentication } from '@/hooks/use-authentication.ts'

const data = {
  mainNavigation: [
    {
      title: 'Configuration',
      items: [
        {
          title: 'Dashboard',
          url: '/admin',
          icon: Gauge,
        },
        {
          title: 'Cards',
          url: '/admin/cards',
          icon: CreditCard,
        },
        {
          title: 'Events',
          url: '/admin/events',
          icon: Calendar,
        },
      ]
    },
  ],
}

export function AdminSidebar() {
  const { logout } = useAuthentication();

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <div className="flex items-center gap-1 p-2">
          <img
            src={LogoIcon}
            alt="Free Market Fandango logo"
            className="w-6"
          />
          <span className="font-bold">
            Admin
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to='/'>
                    <ArrowLeft />
                    <span>Leave</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {data.mainNavigation.map((section) => (
          <SidebarGroup>
            <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild size="sm">
                  <a onClick={() => logout()}>
                    <LogOut />
                    <span>Logout</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  )
}
