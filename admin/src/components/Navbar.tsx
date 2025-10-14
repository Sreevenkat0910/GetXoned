import { memo } from 'react';
import { Search, Moon, Sun, LogOut, Settings, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Input } from "./ui/input";
import { useTheme } from "../contexts/ThemeContext";
import { mockAdminUser } from "../utils/mockData";

export const Navbar = memo(function Navbar() {
  const { theme, toggleTheme } = useTheme();

  const handleSignOut = () => {
    // Mock Clerk sign out
    console.log("Signing out...");
    alert("Sign out functionality would connect to Clerk's signOut() API");
  };

  return (
    <header className="sticky top-0 z-40 border-b bg-white/95 dark:bg-[#1a1a1a]/95 backdrop-blur-sm border-gray-200 dark:border-gray-800 transition-colors duration-200">
      <div className="flex h-14 sm:h-16 items-center gap-2 sm:gap-4 px-3 sm:px-6">
        {/* Logo - Hidden on mobile when sidebar is open */}
        <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#A00000] to-[#CC5500] flex items-center justify-center">
            <span className="text-white">A</span>
          </div>
          <span className="text-[#262930] dark:text-white hidden lg:inline-block">Admin Portal</span>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#404040] dark:text-gray-400" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-10 bg-[#EAE7E2] dark:bg-[#262930] border-0 h-9 sm:h-10"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-1 sm:gap-3 flex-shrink-0">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full h-9 w-9 sm:h-10 sm:w-10"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon className="w-4 h-4 sm:w-5 sm:h-5" />
            ) : (
              <Sun className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </Button>

          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 sm:h-10 rounded-full px-1 sm:px-2">
                <div className="flex items-center gap-2">
                  <Avatar className="h-7 w-7 sm:h-8 sm:w-8">
                    <AvatarImage src={mockAdminUser.imageUrl} alt={mockAdminUser.firstName} />
                    <AvatarFallback>{mockAdminUser.firstName[0]}</AvatarFallback>
                  </Avatar>
                  <div className="hidden lg:block text-left">
                    <p className="text-sm text-[#262930] dark:text-white">
                      {mockAdminUser.firstName} {mockAdminUser.lastName}
                    </p>
                    <p className="text-xs text-[#404040] dark:text-gray-400">
                      {mockAdminUser.email}
                    </p>
                  </div>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div>
                  <p>{mockAdminUser.firstName} {mockAdminUser.lastName}</p>
                  <p className="text-xs text-[#404040] dark:text-gray-400">{mockAdminUser.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut} className="text-[#A00000]">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
});
