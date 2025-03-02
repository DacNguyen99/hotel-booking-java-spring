import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import Header from "./Header";
import {
  FaClock,
  FaCocktail,
  FaParking,
  FaSnowflake,
  FaTshirt,
  FaUtensils,
  FaWifi,
} from "react-icons/fa";

const HotelService = () => {
  return (
    <Container className="mb-2">
      <Header title={"Our Services"} />

      <Row>
        <h4 className="text-center">
          Services at <span className="hotel-color">Del Luna </span>Hotel
          <div className="gap-2">
            <FaClock /> - 24/7 Front Desk
          </div>
        </h4>
      </Row>
      <hr />
      <Row xs={1} md={2} lg={3} className="g-4 mt-2">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title className="hotel-color">
                <FaWifi /> Wifi
              </Card.Title>

              <Card.Text>
                Stay connected with high-speed internet access.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card>
            <Card.Body>
              <Card.Title className="hotel-color">
                <FaUtensils /> Breakfast
              </Card.Title>

              <Card.Text>
                Enjoy our free breakfast service, including coffee, smoothies,
                and fruits.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card>
            <Card.Body>
              <Card.Title className="hotel-color">
                <FaTshirt /> Laundry
              </Card.Title>

              <Card.Text>
                Keep your clothes clean and fresh with our state-of-the-art
                laundry machine.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card>
            <Card.Body>
              <Card.Title className="hotel-color">
                <FaCocktail /> Mini-Bar
              </Card.Title>

              <Card.Text>
                Enjoy a selection of cocktails and beverages.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card>
            <Card.Body>
              <Card.Title className="hotel-color">
                <FaParking /> Parking
              </Card.Title>

              <Card.Text>
                Park your car at our convenient parking lot.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card>
            <Card.Body>
              <Card.Title className="hotel-color">
                <FaSnowflake /> Air-conditioning
              </Card.Title>

              <Card.Text>
                Keep your home comfortable with our state-of-the-art
                air-conditioning system.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HotelService;
