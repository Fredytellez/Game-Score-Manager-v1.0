"use client"
import React, { useState } from "react";
import { Container, Button, Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/store/services/user.api";

const ProfileImageComponent = ({ style }) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const {
    data: profile,
    isLoading,
    isError,
  } = useGetProfileQuery(currentUser?.id ?? "");
  const [updateProfile] = useUpdateProfileMutation();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!selectedFile || !currentUser) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      await updateProfile({ userId: currentUser.id, formData }).unwrap();
      alert("imagen actualizada");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error al cargar la imagen");
    }
  };

  const profileImageSrc = profile
    ? `http://localhost:4000/api/v1/users/profile/${currentUser?.id}`
    : "/images/img-profile.png";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        src={profileImageSrc}
        rounded
        className="profile-image"
        alt="Profile"
        style={style}
      />
      <input
        type="file"
        onChange={handleFileChange}
        style={{
          marginTop: "1rem",
          fontSize: "0.575rem",
        }}
      />
      <Button
        className="button-form"
        style={{
          width: "80%",
          marginTop: "10px",
          marginBottom: "16px",
          padding: "0 4px",
          fontSize: "0.675rem",
        }}
        onClick={( handleFileUpload)}
      >
        Actualizar foto
      </Button>
      <p style={{ fontSize: "0.775rem" }}>
        El tamaño de la imagen debe tener un máximo de 2MB
      </p>
    </div>
  );
};

const ProfileContainer = () => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Container
      className="d-flex align-items-center justify-content-center text-center profile-container"
      style={{
        flex: 1,
        marginTop: "56px",
        padding: "20px",
      }}
    >
      <Container
        className="profile-img-container"
        style={{
          backgroundColor: "rgba(39, 40, 67, 0.61)",
          padding: "20px",
          borderRadius: "8px",
          marginRight: "20px",
          flex: "1",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isEditing ? (
          <ProfileImageComponent
            style={{
              width: "100px",
              height: "100px",
              objectFit: "cover",
              borderRadius: "50%", // Hace que la imagen sea circular
            }}
          />
        ) : (
          <div
            style={{
              width: "100px",
              height: "100px",
              margin: "20px 0 10px 0",
              paddingBottom: "0px",
              overflow: "hidden", // Asegura que la imagen no se desborde
              borderRadius: "50%", // Hace que el contenedor sea circular
            }}
          >
            <Image
              src="/images/img-profile.png"
              rounded
              className="profile-image"
              alt="Profile"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover", // Ajusta la imagen para que cubra el contenedor manteniendo su proporción
              }}
            />
          </div>
        )}

        <Button
          variant="secondary"
          style={{
            marginBottom: "20px",
            marginTop: "10px",
            padding: "4px",
            fontSize: "0.875rem",
          }}
          className="button-form"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Cancelar" : "Modificar foto"}
        </Button>
      </Container>
    </Container>
  );
};

export default ProfileContainer;
