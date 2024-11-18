import { useInputHook } from "@/app/hooks/input-hooks";
import validationHook from "@/app/hooks/validation-hook";
import { setToken } from "@/store/features/authSlice";
import {
  setPassword,
  setEmail,
  setUserName,
} from "@/store/features/registerSlice";
import { useRegisterUserMutation } from "@/store/services/user.api";
import { useRouter } from "next/navigation";
import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";

const RegisterComponent = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { errors, validate } = validationHook();
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  // Datos de los inputs
  const {
    value: valueUserName,
    bind: bindUserName,
    reset: resetUserName,
  } = useInputHook();
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
  const {
    value: valueConfirmPassword,
    bind: bindConfirmPassword,
    reset: resetConfirmPassword,
  } = useInputHook();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const fields = {
      username: valueUserName,
      email: valueEmail,
      password: valuePassword,
      confirmPassword: valueConfirmPassword,
    };
    if (!validate(fields)) {
      return;
    }

    try {
      const data = await registerUser({
        username: valueUserName,
        email: valueEmail,
        password: valuePassword,
      }).unwrap();
      console.log(data);

      localStorage.setItem("token", data.token);
      dispatch(setToken(data.token));
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      if (error.originalStatus === 404) {
        alert("The endpoint was not found. Please check the URL.");
      } else {
        alert("Error al registrar el usuario: " + error.data || error.message);
      }
    }

    dispatch(setUserName(valueUserName));
    dispatch(setEmail(valueEmail));
    dispatch(setPassword(valuePassword));
    router.push("/dashboard");
  };

  const handleLoginButton = () => {
    router.push("/login");
  };
  const handleHomeButton = () => {
    router.push("/");
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center p-0 custom-register-form"
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
          <Navbar.Brand href="home"><span className="score-logo">Game Score Manager</span></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto text-color">
              <Nav.Link onClick={handleHomeButton}>Inicio</Nav.Link>
              <Nav.Link onClick={handleLoginButton}>Inicia Sesion</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Form
        style={{
          backgroundColor: "rgba(39, 40, 67, 0.61)", // Fondo blanco semi-transparente para el formulario
          padding: "0 20px 0 20px",
          borderRadius: "8px",
          maxWidth: "400px", // Limitar el ancho del formulario para pantallas grandes
          width: "100%", // El formulario debe ocupar todo el ancho disponible
          marginTop: "40px", // Espaciado superior para que no esté pegado al navbar
        }}
        onSubmit={handleSubmit}
        className="responsive-form"
      >
        <h1 className="text-center pt-2">Crea una cuenta</h1>
        <Form.Group className="mb-2" controlId="formGroupUsername">
          <Form.Label className="mb-1" style={{ fontSize: "0.875rem" }}>Nombre de usuario</Form.Label>
          <Form.Control style={{ fontSize: "0.875rem" }}
            type="text"
            placeholder="Ingresa tu usuario"
            isInvalid={!!errors.username}
            required
            {...bindUserName}
          />
          <Form.Control.Feedback type="invalid">
            {errors.username}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-2" controlId="formGroupEmail">
          <Form.Label className="mb-1" style={{ fontSize: "0.875rem" }}>Email</Form.Label>
          <Form.Control style={{ fontSize: "0.875rem" }}
            type="email"
            placeholder="Ingresa un email"
            required
            {...bindEmail}
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="formGroupPassword">
          <Form.Label className="mb-1" style={{ fontSize: "0.875rem" }}>Contraseña</Form.Label>
          <Form.Control style={{ fontSize: "0.875rem" }}
            type="password"
            placeholder="contraseña"
            isInvalid={!!errors.password}
            required
            {...bindPassword}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupConfirmPassword">
          <Form.Label className="mb-1" style={{ fontSize: "0.875rem" }}>Confirma tu contraseña</Form.Label>
          <Form.Control style={{ fontSize: "0.875rem" }}
            type="password"
            placeholder="confirmar contraseña"
            isInvalid={!!errors.confirmPassword}
            required
            {...bindConfirmPassword}
          />
          <Form.Control.Feedback type="invalid">
            {errors.confirmPassword}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100 mb-3 button-form">
          Registro
        </Button>

        <Container className="text-center mb-3">
          <p>O Regístrate con:</p>
          <Button variant="danger" className="me-4">
            <i className="fab fa-google"></i> Google
          </Button>
          <Button variant="dark" className="ms-4">
            <i className="fab fa-github"></i> GitHub
          </Button>
        </Container>

        <Container className="text-center">
          <p>
            ¿Ya tienes una cuenta?
            <Button variant="link" onClick={handleLoginButton}>
              <span className="span-link">Inicia sesión.</span>
            </Button>
          </p>
        </Container>
      </Form>
    </div>
  );
};

export default RegisterComponent;
