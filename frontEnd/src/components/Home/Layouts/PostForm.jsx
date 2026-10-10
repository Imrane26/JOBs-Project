import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

export default function PostForm({ onClose }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({ title: "", content: "", image: "" });
  const token = sessionStorage.getItem("loginData");
  const userData = JSON.parse(sessionStorage.getItem("userData"));

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
    let newErrors = { title: "", content: "", image: "" };

    if (title.trim() === "") {
      newErrors.title = "Le titre est requis.";
      valid = false;
    }

    if (content.trim() === "") {
      newErrors.content = "Le contenu est requis.";
      valid = false;
    }

    if (!image) {
      newErrors.image = "L'image est requise.";
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      const formData = new FormData();
      formData.append("titre", title);
      formData.append("contenu", content);
      formData.append("imagePath", image);
      formData.append("auteur", userData.id_user);

      try {
        const response = await axios.post(
          "http://localhost:3000/api/publication",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Publication created successfully!", response.data);
        onClose();
      } catch (error) {
        console.error("Error creating publication:", error);
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <Overlay>
      <FormContainer>
        <CloseButton onClick={onClose}>x</CloseButton>
        <form onSubmit={handleSubmit}>
          <ProfileSection>
            {userData.profilePath ==="../imgs/download.jpeg" ? (
              <ProfileImage src={`${userData.profilePath}` } alt="User Profile" />
            ) : (
              <ProfileImage src="../imgs/download.jpeg" alt="No Profile" />
            )}
            <ProfileName>{`${userData.nom} ${userData.prenom}` }</ProfileName>
          </ProfileSection>
          <h2>Créer une publication</h2>
          <FormLabel htmlFor="title">Titre</FormLabel>
          <Input
            id="title"
            type="text"
            placeholder="Titre"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && <ErrorMessage>{errors.title}</ErrorMessage>}
          <FormLabel htmlFor="content">Contenu</FormLabel>
          <TextArea
            id="content"
            placeholder="Contenu"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          {errors.content && <ErrorMessage>{errors.content}</ErrorMessage>}
          <FormLabel htmlFor="image">Image</FormLabel>
          <FileInputContainer>
            <FileInputLabel htmlFor="image">Choisir une image</FileInputLabel>
            <HiddenFileInput
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <ImagePreview src={imagePreview} alt="Image Preview" />
            )}
          </FileInputContainer>
          {errors.image && <ErrorMessage>{errors.image}</ErrorMessage>}
          <SubmitButton type="submit">Publier</SubmitButton>
        </form>
      </FormContainer>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.div`
  background: white;
  padding: 30px;
  border-radius: 10px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const CloseButton = styled.button`
  background-color: #9f9f9f;
  color: white;
  border: none;
  font-size: 16px;
  cursor: pointer;
  position: absolute;
  top: 16px;
  right: 16px;
  padding: 8px 12px;
  border-radius: 4px;
  &:hover {
    background: #797979;
    color: white;
  }
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
`;

const ProfileName = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const FormLabel = styled.label`
  display: block;
  margin: 10px 0 5px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  height: 100px;
`;

const FileInputContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const FileInputLabel = styled.label`
  background: #d9d9d9;
  color: #393939;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;

  &:hover {
    background: #838383;
    color: white;
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const ImagePreview = styled.img`
  margin-top: 10px;
  max-width: 100%;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const SubmitButton = styled.button`
  background: #16db65;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  font-size: 16px;

  &:hover {
    background: #10a74d;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  margin-bottom: 10px;
`;
