import {
  Button,
  Grid,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import { Image } from "./types";
import UploadImagePopup from "./uploadImage/UploadImagePopup";
import EditImagePopup from "./editImage/EditImagePopup";
import { deleteImage } from "./imagesApi";

interface ImagesProps {
  images: Image[];
  setImages: React.Dispatch<React.SetStateAction<Image[]>>;
  setSelectedImage: React.Dispatch<React.SetStateAction<Image | undefined>>;
}

function Images(props: ImagesProps) {
  React.useEffect(() => {
  }, [props]);

  const handleSelectImage = (image: Image) => {
    props.setSelectedImage(image);
  };

  const handleEditImage = (image: Image) => {
    props.setImages(props.images.map(x => x.id === image.id ? image : x));
  };

  const handleDeleteImage = (image: Image) => {
    deleteImage({id: image.id});
    props.setImages(props.images.filter(x => x !== image));
    props.setSelectedImage(props.images[0]);
  };

  const onImageUploaded = (image: Image) => {
    props.setImages([...props.images, image]);
  }

  return (
    <>
      <Stack
        spacing={2}
        sx={{
          width: "100%",
          height: "100%",
          paddingTop: 2,
          paddingBottom: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="h3">Images</Typography>
        <Divider />

        <Stack
          justifyContent="space-between"
          sx={{
            paddingX: 3,
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          {props.images &&
            props.images.length > 0 &&
            props.images.map((image, index) => (
              <Grid key={`image_${index}`} container>
                <Grid item xs={1}>
                  <EditImagePopup {...{image: image, handleEditImage: handleEditImage}}></EditImagePopup>
                </Grid>
                <Grid item xs={10}>
                  <Button
                    variant="text"
                    onClick={() => handleSelectImage(image)}
                  >
                    {image.name}
                  </Button>
                </Grid>
                <Grid item xs={1}>
                  <IconButton
                    aria-label="close"
                    onClick={() => handleDeleteImage(image)}
                    sx={{
                      color: (theme) => theme.palette.grey[500],
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Grid>
              </Grid>
            ))}

          <div style={{ marginTop: "auto", marginBottom: "40px" }}>
            <UploadImagePopup {...{onImageUploaded: onImageUploaded}}></UploadImagePopup>
          </div>
        </Stack>
      </Stack>
    </>
  );
}

export default Images;
