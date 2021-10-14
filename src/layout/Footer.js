import React from 'react';
import {Container, Row, Col} from 'reactstrap';


const Footer = () => {
  return (
    <Container
      fluid
      tag="footer"
      className="text-center bg-info text-white text-uppercase fixed-bottom p-3"
    >
      CHIHEMPAT Github search App with Firebase
    </Container>
  );
}

export default Footer;