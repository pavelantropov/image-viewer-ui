import { Card, CardContent, CardMedia, Container, IconButton, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import RemoveIcon from '@mui/icons-material/Remove';
import React, { useState } from "react";
import { Image } from "../images/types";

interface DisplayProps {
  image?: Image;
}

function Display(props: DisplayProps) {
  const scaleStep = 20;
  const minScale = -80;

  const [image, setImage] = useState<Image | undefined>(props.image);
  const [adjustment, setAdjustment] = useState<number>(0);

  React.useEffect(() => {
    setImage(props.image);
    setAdjustment(0);
  }, [props]);

  const handleUpscaleImage = () => {
    setAdjustment(adjustment + scaleStep);
  };
  const handleDownscaleImage = () => {
    if (adjustment - scaleStep >= minScale) {
      setAdjustment(adjustment - scaleStep);
    }
  };
  const handleResetImageScale = () => {
    setAdjustment(0);
  };

  return (
    <>
      <Card
        sx={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
          textAlign: "center"
        }}
      >
        { image && (
          <>
            <CardContent>
              <Typography variant="h4">{image.name}</Typography>
            </CardContent>
            <Container sx={{ width: "90%", height: "80%", alignItems: "center", display: "flex", justifyContent: "center", justifyItems: "center" }}>
              <CardMedia
                component="img"
                image={`data:image/jpeg;base64,${image.content}`}
                title={image.name}
                alt={image.description}
                sx={{ width: `calc(100% + ${adjustment}%)`, height: `calc(100% + ${adjustment}%)`, objectFit: "contain" }}
              />
            </Container>
            <CardContent sx={{ pb: 0 }}>
              <Typography variant="subtitle1">{image.description}</Typography>
            </CardContent>
            <CardContent sx={{ pt: 0 }}>
              <IconButton
                aria-label="upscale"
                onClick={() => handleUpscaleImage()}
              >
                <AddIcon />
              </IconButton>
              <IconButton
                aria-label="downscale"
                onClick={() => handleDownscaleImage()}
              >
                <RemoveIcon />
              </IconButton>
              <IconButton
                aria-label="reset scale"
                onClick={() => handleResetImageScale()}
              >
                <AspectRatioIcon />
              </IconButton>
            </CardContent>
          </>
        )}
      </Card>
    </>
  );
}

export default Display;
