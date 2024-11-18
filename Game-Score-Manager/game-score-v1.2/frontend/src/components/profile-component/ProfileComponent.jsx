"use client";

import React from "react";
import {
  Button,
  Container,
  Form,
  Image,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import ProfileImageComponent from "../profile-img-component/ProfileImageComponent";
import { useDispatch } from "react-redux";
import { logout } from "@/store/features/authSlice";
import { useRouter } from "next/navigation";

const ProfileComponent = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const registerEmail = useSelector((state) => state.register.email);
  const registerUsername = useSelector((state) => state.register.username);
  const userEmail = registerUsername || "User Name";

  const handleLogout = () => {
    // logica para el cierre de sesion.
    dispatch(logout());
    router.push("/login");
  };

  const handleDashboardButton = () => {
    router.push("/dashboard");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: "url('/images/hero.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar
        expand="lg"
        data-bs-theme="dark"
        className="custom-navbar"
        style={{
          backgroundColor: "rgba(39, 40, 67, 0.61)",
          position: "fixed",
          width: "100%",
          zIndex: "1000",
        }}
      >
        {/* Contenedor interno del navbar */}
        <Container>
          <Navbar.Brand>
            <span className="score-logo">Game Score Manager</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto text-color">
              <Nav.Link onClick={handleDashboardButton}>Inicio</Nav.Link>
              <Nav.Link href="scores">Puntuaciones</Nav.Link>
              <NavDropdown title={userEmail} id="basic-nav-dropdown">
                <NavDropdown.Item href="#">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#">Configuracion</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Cerrar sesion
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Contenedor para la modificacion informacion de usuario */}
      <Container
        className="d-flex align-items-center justify-content-center text-center profile-container"
        style={{
          flex: 1,
          marginTop: "56px", // Altura del navbar
          padding: "20px",
        }}
      >
        {/* Componente para modificaion de la imagen de perfil */}
          <ProfileImageComponent/>
        {/* Contenedor para la edicion de informacion de usuario */}
        <Container
          className="profile-data-container"
          style={{
            backgroundColor: "rgba(39, 40, 67, 0.61)",
            padding: "20px",
            borderRadius: "8px",
            flex: "2",
          }}
        >
          <h4>Informacion de usuario</h4>
          <Form>
            <Form.Group controlId="formUsername">
              <Form.Label
                style={{
                  fontSize: "0.775rem",
                  textAlign: "left",
                  width: "100%",
                  margin: "8px 0 0 0",
                }}
              >
                Username
              </Form.Label>
              <Form.Control
                type="text"
                placeholder={registerUsername}
                disabled
                style={{ fontSize: "0.775rem" }}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label
                style={{
                  fontSize: "0.775rem",
                  textAlign: "left",
                  width: "100%",
                  margin: "8px 0 0 0",
                }}
              >
                Email
              </Form.Label>
              <Form.Control
                type="email"
                placeholder={registerEmail}
                disabled
                style={{ fontSize: "0.775rem" }}
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <p style={{ marginBottom: "0", marginTop: "20px" }}>
                Cambiar contreaseña
              </p>
              <Form.Label
                style={{
                  fontSize: "0.775rem",
                  textAlign: "left",
                  width: "100%",
                  margin: "6px 0 0 0",
                }}
              >
                Password
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                style={{ fontSize: "0.775rem" }}
              />
            </Form.Group>
            <Form.Group controlId="formConfirmPassword">
              <Form.Label
                style={{
                  fontSize: "0.775rem",
                  textAlign: "left",
                  width: "100%",
                  margin: "8px 0 0 0",
                }}
              >
                Confirm Password
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                style={{ fontSize: "0.775rem" }}
              />
            </Form.Group>
            <Container className="text-center mb-3 mt-3">
              <p>Vincula tu cuenta con:</p>
              <Button variant="danger" className="me-4">
                <i className="fab fa-google"></i> Google
              </Button>
              <Button variant="dark" className="ms-4">
                <i className="fab fa-github"></i> GitHub
              </Button>
            </Container>
            <Button
              variant="success"
              type="submit"
              style={{ marginTop: "20px", marginBottom: "10px" }}
              className="button-form"
            >
              Actualizar
            </Button>
          </Form>
        </Container>
      </Container>
    </div>
  );
};

export default ProfileComponent;
