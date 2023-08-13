import Images from "../images/Images";
import Display from "../display/Display";
import { Box, Stack } from '@mui/material';
import React, { useState } from "react";
import { Image } from "../images/types";
import { fetchImages } from "../images/imagesApi";

function Viewer() {
  const MIN_HEIGHT = 'calc(100vh - 60px)';
  const MAX_HEIGHT = 'calc(100vh - 60px)';

  const [images, setImages] = useState<Image[]>([]);
  const [selectedImage, setSelectedImage] = useState<Image>();

  React.useEffect(() => {
    fetchImages()
      .then((res) => {
        setImages(res.images);
        setSelectedImage(res.images[0]);
      })
  }, []);

  React.useEffect(() => {

  }, [images])

  return (
    <>
      <Stack direction="row" spacing={2}
        sx={{
          margin: 2,
      }}>
        <Box sx={{
          width: '25%',
          height: MAX_HEIGHT,
          minHeight: MIN_HEIGHT,
          maxHeight: MAX_HEIGHT,
          borderRadius: 5,
          boxShadow: 10,
        }}>
          <Images {...{images: images, setImages: setImages, setSelectedImage: setSelectedImage}} />
        </Box>
        <Box sx={{
          width: '75%',
          height: MAX_HEIGHT,
          minHeight: MIN_HEIGHT,
          maxHeight: MAX_HEIGHT,
          borderRadius: 5,
          boxShadow: 10,
        }}>
          <Display {...{image: selectedImage}} />
        </Box>
      </Stack>
    </>
  );
}

export default Viewer;
