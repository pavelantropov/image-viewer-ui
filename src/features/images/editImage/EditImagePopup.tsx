import "../images.css";
import React, { useState } from "react";
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
import EditIcon from "@mui/icons-material/Edit";
import { Image } from "../types";

interface EditImagePopupProps {
  image: Image;
  handleEditImage: Function;
}

function EditImagePopup(props: EditImagePopupProps) {
  const [image, setImage] = useState<Image>(props.image);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isEditImagePopupShown, setEditImagePopupShown] =
    useState<boolean>(false);
  const [hasNameError, setHasNameError] = useState<boolean>(false);

  React.useEffect(() => {
    copyValuesFromProps();
  }, [props]);

  const copyValuesFromProps = () => {
    setImage(props.image);
    setName(props.image.name || "");
    setDescription(props.image.description || "");
  };

  const handleOpen = () => {
    setEditImagePopupShown(true);
  };
  const handleDiscard = () => {
    setHasNameError(false);
    copyValuesFromProps();
    setEditImagePopupShown(false);
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleChangeDescription = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  }

  const handleEditImage = () => {
    let hasErrors = false;
    if (!name) {
      hasErrors = true;
      setHasNameError(true);
    }
    if (hasErrors) return;

    let updatedImage = image;
    updatedImage.name = name;
    updatedImage.description = description;
    setImage(updatedImage);
    props.handleEditImage(image);

    handleDiscard();
  };

  return (
    <>
      <IconButton
        aria-label="edit"
        onClick={handleOpen}
        sx={{
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <EditIcon />
      </IconButton>
      <Dialog open={isEditImagePopupShown} onClose={handleDiscard}>
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
              <input id="image_name" type="text" value={name} onChange={handleChangeName} />
            </Stack>
            <Stack spacing={1}>
              <label htmlFor="image_description">Description:</label>
              <textarea
                id="image_description"
                rows={2}
                value={description || ""}
                onChange={handleChangeDescription}
              />
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleDiscard}>
            Discard
          </Button>
          <Button variant="contained" autoFocus onClick={handleEditImage}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EditImagePopup;
