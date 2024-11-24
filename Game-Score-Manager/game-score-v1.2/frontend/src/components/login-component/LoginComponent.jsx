"use client"
import { useInputHook } from "@/app/hooks/input-hooks";
import { setUserEmail, setUsername } from "@/store/features/usernameSlice";
import { useLoginUserMutation } from "@/store/services/user.api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Nav } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";

const LoginComponent = () => {
  const [loginUser, { isUpdating }] = useLoginUserMutation();
  const dispatch = useDispatch();
  const router = useRouter();
  const [error, setError] = useState(null);

  const {
    value: valueEmail,
    bind: bindEmail,
    reset: resetEmail,
  } = useInputHook();
  const {
    value: valuePassword,
    bind: bindPassword,
    reset: resetPassword,
  } = useInputHook();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      const data = await loginUser({
        email: valueEmail,
        password: valuePassword,
      }).unwrap();
      console.log("Login exitoso:", data);
      resetEmail();
      resetPassword();
      dispatch(setUsername(data.user.username));
      dispatch(setUserEmail(data.user.email))
      router.push("dashboard");
    } catch (error) {
      console.error("Error en el login:", error);
      if (error.status === 401) {
        setError("Correo o contraseña no coinciden.");
      } else {
        setError("Ha ocurrido un error. Por favor intentalo de nuevo.");
      }
    }
  };

  const handleRegisterButton = (event) => {
    event.preventDefault();
    router.push("/register");
  };

  const handleRessetPassword = (event) => {
    event.preventDefault();
    router.push("/login/reset-password");
  };

  const handleHomeButton = (event) => {
    event.preventDefault();
    router.push("/");
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center p-0"
      style={{
        minHeight: "100vh", // Asegura que el contenedor de la imagen cubra toda la pantalla
        backgroundImage: "url('/images/hero.jpg')",
        backgroundSize: "cover", // Hace que la imagen cubra todo el área del contenedor
        backgroundPosition: "center", // Centra la imagen
        backgroundAttachment: "fixed", // Fija la imagen al fondo cuando se hace scroll
        display: "flex", // Usamos flexbox para centrar
        flexDirection: "column", // Para apilar los elementos verticalmente
        justifyContent: "center", // Centra los elementos verticalmente
        alignItems: "center", // Centra los elementos horizontalmente
        padding: "0 15px", // Padding para asegurar que los elementos no toquen los bordes
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
              <Nav.Link onClick={handleHomeButton}>Inicio</Nav.Link>
              <Nav.Link onClick={handleRegisterButton} className="nav-link">
                Registrate
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Form
        style={{
          backgroundColor: "rgba(39, 40, 67, 0.61)", // Fondo blanco semi-transparente para el formulario
          padding: "20px",
          borderRadius: "8px",
          maxWidth: "400px", // Limitar el ancho del formulario para pantallas grandes
          width: "100%", // El formulario debe ocupar todo el ancho disponible
          marginTop: "30px", // Espaciado superior para que no esté pegado al navbar
        }}
        onSubmit={handleSubmit}
      >
        <h1 className="text-center">Inicia Sesion</h1>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Correo</Form.Label>
          <Form.Control
            style={{ fontSize: "0.875rem" }}
            type="email"
            placeholder="Ingresa tu email"
            required
            {...bindEmail}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            style={{ fontSize: "0.875rem" }}
            type="password"
            placeholder="Contraseña"
            required
            {...bindPassword}
            isInvalid={!!error}
          />
          <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
          <div className="text-end mt-1">
            <Button
              variant="link"
              onClick={handleRessetPassword}
              className="p-0 text-dark"
              style={{ fontSize: "0.875rem" }}
            >
              <span className="span-link">¿Olvidaste tu contraseña?</span>
            </Button>
          </div>
        </Form.Group>
        <Button
          /* variant="primary" */
          type="submit"
          style={{ width: "100%" }}
          className="mb-3 button-form"
        >
          Ingresar
        </Button>
        <Container className="text-center mb-5">
          <p>O ingresa con:</p>
          <Button variant="danger" className="me-4">
            <i className="fab fa-google"></i> Google
          </Button>
          <Button variant="dark" className="ms-4">
            <i className="fab fa-github"></i> GitHub
          </Button>
        </Container>
        <Container className="text-center">
          <p>
            ¿No tienes una cuenta?{" "}
            <Button variant="link" onClick={handleRegisterButton}>
              <span className="span-link">registrate aquí.</span>
            </Button>
          </p>
        </Container>
      </Form>
    </div>
  );
};

export default LoginComponent;
