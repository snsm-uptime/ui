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
  const iconStyles = "h-6 w-6";
  const buttonStyles = "hov-circle on-z1";

  return (
    <div className="flex justify-around items-center mt-auto py-4 border-t border-[var(--bg-z0)]">
      <button
        className={buttonStyles}
        onClick={toggleTheme}
        aria-label="Toggle Theme"
      >
        {theme === "light" ? (
          <MoonIcon className={iconStyles} />
        ) : (
          <SunIcon className={iconStyles} />
        )}
      </button>
      <button aria-label="Settings" className={buttonStyles}>
        <Cog6ToothIcon className={iconStyles} />
      </button>
      <button aria-label="Notifications" className={buttonStyles}>
        <BellIcon className={iconStyles} />
      </button>
      <button aria-label="Profile" className={buttonStyles}>
        <UserIcon className={iconStyles} />
      </button>
    </div>
  );
}
