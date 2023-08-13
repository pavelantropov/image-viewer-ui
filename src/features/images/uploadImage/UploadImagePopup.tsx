import "../images.css";
import React, { useState } from "react";
import { uploadImage } from "../imagesApi";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { styled } from "@mui/material/styles";

const Input = styled("input")({
  display: "none",
});

interface UploadImagePopupProps {
  handleImageUploaded: Function;
}

function UploadImagePopup(props: UploadImagePopupProps) {
  const [name, setName] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [file, setFile] = useState<string | Blob>("");
  const [isUploadImagePopupShown, setUploadImagePopupShown] =
    useState<boolean>(false);
  const [hasNameError, setHasNameError] = useState<boolean>(false);
  const [hasFileError, setHasFileError] = useState<boolean>(false);

  const handleOpen = () => {
    setUploadImagePopupShown(true);
  };
  const handleDiscard = () => {
    setUploadImagePopupShown(false);
    setName(null);
    setDescription(null);
    setFile("");
    setHasNameError(false);
    setHasFileError(false);
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleChangeDescription = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };
  const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFile(e.target.files[0] || "");
  };

  const handleUploadImage = () => {
    let hasErrors = false;
    if (!name) {
      hasErrors = true;
      setHasNameError(true);
    }
    if (!file) {
      hasErrors = true;
      setHasFileError(true);
    }
    if (hasErrors) return;

    const formData = new FormData();
    formData.append("name", name!.trim());
    if (description) formData.append("description", description.trim());
    formData.append("content", file);

    uploadImage({ form: formData }).then((res) =>
      props.handleImageUploaded(res)
    );
    handleDiscard();
  };

  return (
    <>
      <Button onClick={handleOpen}>Upload an image</Button>
      <Dialog open={isUploadImagePopupShown} onClose={handleDiscard}>
        <DialogTitle sx={{ m: 0, p: 2 }}>
          <IconButton
            aria-label="close"
            onClick={handleDiscard}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ paddingX: 3, paddingY: 1 }}>
            <Stack spacing={1}>
              <label
                htmlFor="image_name"
                className={hasNameError ? "error-label" : ""}
              >
                Name:
              </label>
              <input id="image_name" type="text" onChange={handleChangeName} />
            </Stack>
            <Stack spacing={1}>
              <label htmlFor="image_description">Description:</label>
              <textarea
                id="image_description"
                rows={2}
                onChange={handleChangeDescription}
              />
            </Stack>
            <label
              htmlFor="image_file"
              className={hasFileError ? "error-label" : ""}
            >
              <Input
                id="image_file"
                accept="image/*"
                type="file"
                onInput={handleSelectFile}
              ></Input>
              <IconButton
                color={file === "" ? "primary" : "success"}
                component="span"
              >
                <PhotoCamera />
                &nbsp;Select a file
              </IconButton>
            </label>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleDiscard}>
            Discard
          </Button>
          <Button variant="contained" autoFocus onClick={handleUploadImage}>
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default UploadImagePopup;
