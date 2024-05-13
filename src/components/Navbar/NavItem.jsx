import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

function NavItem({ to, children, currentPath }) {
  const isActive = currentPath === to;

  return (
    <li>
      <Link
        className={`font-semibold ${isActive ? 'text-white bg-blue-800 px-2 py-1 rounded' : ''}`}
        to={to}
      >
        {children}
      </Link>
    </li>
  );
}

NavItem.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  currentPath: PropTypes.string.isRequired
};

export default NavItem;