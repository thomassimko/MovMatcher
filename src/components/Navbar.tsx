import React from 'react';
import {
  DashboardRounded,
  DoubleArrowRounded,
  SearchRounded,
  Settings,
} from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { NavbarLink } from './NavbarLink';

export const Navbar: React.FC = () => {
  return (
    <>
      <nav className="navbar w-16 fixed bg-gray-800 shadow h-full">
        <ul className="flex flex-col">
          <li
            className="nav-logo flex text-gray-300 cursor-pointer items-center px-4 py-5 bg-gray-900 uppercase font-bold"
            style={{ letterSpacing: '0.3ch' }}
          >
            <Link to="/" className="m-0 flex items-center">
              <span className="nav-link-text text-sm whitespace-nowrap">
                Movie Matcher
              </span>
              <DoubleArrowRounded />
            </Link>
          </li>
          <NavbarLink
            text="Dashboard"
            icon={<DashboardRounded />}
            active
            href="/"
          />
          <NavbarLink
            text="Search"
            icon={<SearchRounded />}
            active={false}
            href="/search"
          />
          <NavbarLink text="Settings" icon={<Settings />} href="/settings" />
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
