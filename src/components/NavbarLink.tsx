import React, { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

export interface ISidebarLinkProps {
  text: string;
  icon: JSX.Element;
  notificationCount?: number;
  href: string;
}

export const NavbarLink: FC<ISidebarLinkProps> = ({
  text,
  icon,
  notificationCount,
  href,
}) => {
  const location = useLocation();
  const active = location.pathname === href;
  const activeClass = active ? 'text-gray-300' : 'text-gray-600';

  return (
    <li
      className={`${activeClass} nav-link flex hover:text-gray-500 cursor-pointer items-center px-4 py-3 hover:bg-gray-900 w-full`}
    >
      <Link to={href} className="m-0 flex items-center">
        {icon}
        <span className="nav-link-text text-sm">{text}</span>
        {notificationCount && (
          <div className="py-1 px-3 bg-gray-700 rounded text-gray-500 flex items-center justify-center text-xs">
            {notificationCount}
          </div>
        )}
      </Link>
    </li>
  );
};
