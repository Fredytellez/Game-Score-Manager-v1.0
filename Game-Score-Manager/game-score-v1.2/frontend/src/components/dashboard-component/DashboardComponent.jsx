"use client";
import { useRouter } from "next/navigation";
import React from "react";
import {
  Container,
  Image,
  Nav,
  Navbar,
  NavDropdown,
  Pagination,
  Stack,
  Table,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { logout } from "@/store/features/authSlice";
import { useDispatch } from "react-redux";
import ProfileImageComponent from "../profile-img-component/ProfileImageComponent";

const DashboardPageComponent = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const loginEmail = useSelector((state) => state.login.email);
  const registerEmail = useSelector((state) => state.register.username);
  const userEmail = loginEmail || registerEmail || "User Name";

  const handleLogout = () => {
    // logica para el cierre de sesion.
    dispatch(logout());
    router.push("/login");
  };

  const handleDashboardProfile = () => {
    router.push("dashboard/profile");
  };
  const handleDashboardScores = () => {
    router.push("dashboard/scores");
  };

  return (
    <div
      style={{
        minHeight: "100vh", // Asegura que el contenedor de la imagen cubra toda la pantalla
        backgroundImage: "url('/images/hero.jpg')",
        backgroundSize: "cover", // Hace que la imagen cubra todo el área del contenedor
        backgroundPosition: "center", // Centra la imagen
        backgroundAttachment: "fixed", // Fija la imagen al fondo cuando se hace scroll
      }}
    >
      <div>
        <Navbar
          expand="lg"
          data-bs-theme="dark"
          className="custom-navbar"
          style={{ backgroundColor: "rgba(39, 40, 67, 0.61)" }}
        >
          <Container>
            <Navbar.Brand href="dashboard">
              <span className="score-logo">Game Score Manager</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto text-color">
                <Nav.Link href="dashboard">Inicio</Nav.Link>
                <Nav.Link onClick={handleDashboardScores}>
                  Puntuaciones
                </Nav.Link>
                {/* Imagen de perfil */}
                {/* <ProfileImageComponent /> */}
                <NavDropdown title={userEmail} id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={handleDashboardProfile}>
                    Perfil
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Configuracion
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4" onClick={handleLogout}>
                    Cerrar sesion
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Container
          className="d-flex flex-column justify-content-center align-items-center"
          style={{
            minHeight: "100vh",
            paddingTop: "2rem",
            paddingBottom: "2rem",
          }}
        >
          <h2 style={{ fontWeight: "bold" }}>Administra tus puntuaciones</h2>
          <p>Crea el tablero según tus necesidades</p>
          <div className="d-flex gap-5 mt-5">
            <div
              style={{
                width: "300px",
                padding: "1.5rem",
                backgroundColor: "rgba(39, 40, 67, 0.61)",
                borderRadius: "8px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                textAlign: "center",
                cursor: "pointer",
              }}
              className="card"
            >
              <i
                className="fa-regular fa-pen-to-square"
                style={{
                  fontSize: "4rem",
                  color: "white",
                  paddingBottom: "2rem",
                }}
              ></i>
              <h5 style={{ fontWeight: "bold", color: "white" }}>
                Edita tus puntuaciones
              </h5>
              <p style={{ color: "white", fontSize: "0.875rem" }}>
                Clasificación simple basada en la puntuación de los Jugadores.
              </p>
            </div>
            <div
              style={{
                width: "300px",
                padding: "1.5rem",
                backgroundColor: "rgba(39, 40, 67, 0.61)",
                borderRadius: "8px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                textAlign: "center",
                cursor: "pointer",
              }}
              className="card"
            >
              <i
                className="fas fa-plus"
                style={{
                  fontSize: "4rem",
                  color: "white",
                  paddingBottom: "2rem",
                }}
              ></i>
              <h5 style={{ fontWeight: "bold", color: "white" }}>
                Agrega tus puntuaciones
              </h5>
              <p style={{ color: "white", fontSize: "0.875rem" }}>
                Clasificación simple basada en la puntuación de los Jugadores.
              </p>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default DashboardPageComponent;
/* export default withAuth(DashboardPage); */
