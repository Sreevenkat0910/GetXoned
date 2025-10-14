import { 
  LayoutDashboard, 
  Package, 
  Layers, 
  Star,
  ShoppingCart,
  BarChart3, 
  Settings,
  ChevronRight
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";

interface AppSidebarProps {
  activeView: string;
  onNavigate: (view: string) => void;
}

const menuItems = [
  {
    title: "Dashboard Overview",
    icon: LayoutDashboard,
    view: "dashboard"
  },
  {
    title: "Products Management",
    icon: Package,
    view: "products"
  },
  {
    title: "Capsules Management",
    icon: Layers,
    view: "capsules"
  },
  {
    title: "Featured Items",
    icon: Star,
    view: "featured"
  },
  {
    title: "Orders Management",
    icon: ShoppingCart,
    view: "orders"
  },
  {
    title: "Analytics",
    icon: BarChart3,
    view: "analytics"
  },
  {
    title: "Settings",
    icon: Settings,
    view: "settings"
  }
];

export function AppSidebar({ activeView, onNavigate }: AppSidebarProps) {
  return (
    <Sidebar className="border-r bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-gray-800">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-[#404040] dark:text-gray-400">
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = activeView === item.view;
                return (
                  <SidebarMenuItem key={item.view}>
                    <SidebarMenuButton
                      onClick={() => onNavigate(item.view)}
                      isActive={isActive}
                      className={`
                        group transition-all
                        ${isActive 
                          ? 'bg-[#A00000] text-white hover:bg-[#A00000] hover:text-white' 
                          : 'hover:bg-[#EAE7E2] dark:hover:bg-[#262930]'
                        }
                      `}
                    >
                      <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-[#404040] dark:text-gray-400'}`} />
                      <span className={isActive ? 'text-white' : ''}>{item.title}</span>
                      {isActive && (
                        <ChevronRight className="ml-auto w-4 h-4 text-white" />
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
