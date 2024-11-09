"use client";
import {
  UserIcon,
  Cog6ToothIcon,
  BellIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "@/components/ThemeContext";

export default function SidebarButtonGroup() {
  const { theme, toggleTheme } = useTheme();
  const styles = "p-2 hover:bg-gray-700 rounded-full h-6 w-6 text-white";

  return (
    <div className="flex text-secondary justify-around items-center mt-auto py-4 border-t border-white-700">
      <button onClick={toggleTheme} aria-label="Toggle Theme">
        {theme === "light" ? (
          <MoonIcon className={styles} />
        ) : (
          <SunIcon className={styles} />
        )}
      </button>
      <button aria-label="Settings" className="">
        <Cog6ToothIcon className="h-6 w-6 text-white" />
      </button>
      <button
        aria-label="Notifications"
        className="p-2 hover:bg-gray-700 rounded-full"
      >
        <BellIcon className="h-6 w-6 text-white" />
      </button>
      <button
        aria-label="Profile"
        className="p-2 hover:bg-gray-700 rounded-full"
      >
        <UserIcon className="h-6 w-6 text-white" />
      </button>
    </div>
  );
}
