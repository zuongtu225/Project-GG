import { menuItem } from '../../utilities/item-sidebar';
import { NavLink } from 'react-router-dom';
function Sidebar() {
  return (
    <ul>
      {menuItem.map((item, index: number) => {
        return (
          <li key={index}>
            <NavLink to={`${item.path}`}>{item.title}</NavLink>
          </li>
        );
      })}
    </ul>
  );
}

export default Sidebar;
