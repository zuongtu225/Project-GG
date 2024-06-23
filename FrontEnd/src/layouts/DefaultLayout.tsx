import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Header from '../components/partials/Header';
import Footer from '../components/partials/Footer';
import Sidebar from '../components/partials/Sidebar';
import { useState } from 'react';
import './DefaultLayout.scss';

function DefaultLayout() {
  const [isShowSidebarMobile, setIsShowSidebarMobile] = useState<boolean>(false);
  const handleShowSidebar = (): void => {
    setIsShowSidebarMobile(!isShowSidebarMobile);
  };

  return (
    <Container>
      <Header handleShowSidebar={handleShowSidebar} />
      <div>
        <Container>
          <Row>
            <Col xs={3} className={isShowSidebarMobile ? `sidebar-mobile` : `sidebar`}>
              <Sidebar />
            </Col>
            <Col xs={9} className="outlet">
              <Outlet />
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </Container>
  );
}

export default DefaultLayout;
