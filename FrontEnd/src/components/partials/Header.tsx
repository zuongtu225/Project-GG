import { IoMenu } from 'react-icons/io5';
import Notification from '../views/notification/notification';

interface HeaderProps {
  handleShowSidebar: () => void;
}

function Header(props: HeaderProps) {
  const handleClick = () => {
    props.handleShowSidebar();
  };

  return (
    <>
      <div className="header">
        <div className="header__menu" onClick={handleClick}>
          <IoMenu />
        </div>
        <h1 className="header__title">Rikkeisoft</h1>
        <div>
          <Notification />
        </div>
      </div>
    </>
  );
}

export default Header;
