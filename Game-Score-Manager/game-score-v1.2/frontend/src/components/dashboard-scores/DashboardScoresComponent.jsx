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

const DashboardScoresComponent = () => {
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
    router.push("profile");
  };
  const handleDashboardButton = () => {
    router.push("/dashboard");
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
                <Nav.Link onClick={handleDashboardButton}>Inicio</Nav.Link>
                <Nav.Link href="scores">Puntuaciones</Nav.Link>
                <Image
                  src="/images/img-profile.png"
                  rounded
                  className="profile-image"
                />
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
          style={{ minHeight: "100vh" }}
        >
          <Table striped bordered hover variant="dark" className="mb-4">
            <thead>
              <tr>
                <th>N</th>
                <th>Nombre de usuario</th>
                <th>Juego</th>
                <th>Puntuacion</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>5.000</td>
              </tr>
            </tbody>
          </Table>
          <Pagination className="pagination-dark">
            {/* <Pagination.First /> */}
            <Pagination.Prev />
            {/* <Pagination.Ellipsis /> */}
            <Pagination.Item>{1}</Pagination.Item>
            <Pagination.Item active>{2}</Pagination.Item>
            <Pagination.Item>{3}</Pagination.Item>
            {/* <Pagination.Ellipsis /> */}
            <Pagination.Next />
            {/* <Pagination.Last /> */}
          </Pagination>
        </Container>
      </div>
    </div>
  );
};

export default DashboardScoresComponent;
/* export default withAuth(DashboardPage); */
