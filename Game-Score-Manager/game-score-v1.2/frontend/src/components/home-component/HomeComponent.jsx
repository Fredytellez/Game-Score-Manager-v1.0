"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";

const HomeComponent = () => {
  const router = useRouter();

  const handleRegisterButton = () => {
    router.push("/register");
  };
  const handleLoginButton = () => {
    router.push("/login");
  };

  return (
    <div
      className="bg-dark text-white"
      style={{
        backgroundImage: "url('/images/hero.jpg')",
        backgroundSize: "cover", // Hace que la imagen cubra todo el área del contenedor
        backgroundPosition: "center", // Centra la imagen
        backgroundAttachment: "fixed", // Fija la imagen al fondo cuando se hace scroll
      }}
    >
      <Navbar
        expand="lg"
        data-bs-theme="dark"
        className="custom-navbar"
        style={{ backgroundColor: "rgba(39, 40, 67, 0.61)" }}
      >
        <Container>
        <Navbar.Brand href="/"><span className="score-logo">Game Score Manager</span></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto navlink-title">
            <Nav.Link href="#scores">Puntuaciones</Nav.Link>
            <Nav.Link href="#about">Acerca de</Nav.Link>
          </Nav>
            <Nav className="ms-auto text-color">
              <Nav.Link onClick={handleLoginButton}>Inicia Sesion</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* <Navbar bg="dark" variant="dark" expand="lg" className="custom-navbar">
        <Container>
          <Navbar.Brand href="/"><span className="score-logo">Game Score Manager</span></Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#scores">Puntuaciones</Nav.Link>
            <Nav.Link href="#about">Acerca de</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link onClick={handleLoginButton}>Iniciar Sesión</Nav.Link>
          </Nav>
        </Container>
      </Navbar> */}

      <Container
        className="d-flex flex-column align-items-center justify-content-center text-center"
        style={{ minHeight: "100vh" }}
      >
        <h1 className="display-2 home-title">Crea y administra tus puntuaciones</h1>
        <p className="lead">
          Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
        </p>

        <div className="d-flex gap-3">
          <Button
            variant="outline-light"
            size="lg"
            onClick={handleRegisterButton}
            className="button-form"
          >
            Crea tu puntuación
          </Button>
          <Button variant="link" className="text-light">
            <span className="span-link">Más información</span>
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default HomeComponent;
