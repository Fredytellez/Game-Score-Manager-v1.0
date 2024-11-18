import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Nav,
  Navbar,
  Row,
} from "react-bootstrap";

const ResetPasswordComponent = () => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(15);
  const handleResetPassword = (event) => {
    event.preventDefault();
    let timeLeft = 15;

    const countdownInterval = setInterval(() => {
      if (timeLeft > 1) {
        timeLeft -= 1;
        setCountdown(timeLeft);
      } else {
        clearInterval(countdownInterval);
        router.push("/login");
      }
    }, 1000);
  };

  const handleLoginButton = () => {
    router.push("/login");
  };

  return (
    <div
      style={{
        minHeight: "100vh", // Asegura que el contenedor cubra toda la pantalla
        backgroundImage: "url('/images/hero.jpg')",
        backgroundSize: "cover", // Hace que la imagen cubra todo el área del contenedor
        backgroundPosition: "center", // Centra la imagen
        backgroundAttachment: "fixed", // Fija la imagen al fondo cuando se hace scroll
        display: "flex", // Para centrar el contenido
        justifyContent: "center", // Centra horizontalmente
        alignItems: "center", // Centra verticalmente
        overflow: "hidden", // Elimina el scroll
      }}
    >
      <Navbar
        expand="lg"
        data-bs-theme="dark"
        className="custom-navbar"
        style={{ backgroundColor: "rgba(39, 40, 67, 0.61)" }}
      >
        <Container>
          <Navbar.Brand href="/">
            <span className="score-logo">Game Score Manager</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto text-color">
              <Nav.Link onClick={handleLoginButton}>Regresar</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container
        className="border rounded d-flex justify-content-center align-items-center"
        style={{
          height: "80vh",
          width: "80vh",
          backgroundColor: "rgba(39, 40, 67, 0.61)",
        }}
        onSubmit={handleResetPassword}
      >
        <Form style={{ height: "40vh", width: "60vh" }}>
          <h2 className="text-center mb-4">Ingresa tu usuario o email</h2>
          {countdown < 15 && (
            <div className="reset-password-message">
              <span>
                Si tu usuario o email coinciden con nuestra base de
                datos, recibirás un correo electrónico para reestablecer tu contraseña.
              </span>
              <p>Seras redirigido al inicio en: <span>{countdown}</span> segundos</p>
            </div>
          )}
          <Form.Group className="mb-3 mt-3" controlId="formGroupEmail">
            <Form.Label>Usuario / Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingresa usuario o email"
              required
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            style={{ width: "100%" }}
            className="mb-3 mt-3 button-form"
          >
            Restaurar
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default ResetPasswordComponent;
