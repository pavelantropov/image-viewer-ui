import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React, { useState } from "react";
import { Image } from "../images/types";

interface DisplayProps {
  image?: Image;
}

function Display(props: DisplayProps) {
  const [image, setImage] = useState<Image | undefined>(props.image);

  React.useEffect(() => {
    setImage(props.image);
  }, [props]);

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
            <CardMedia
              component="img"
              image={`data:image/jpeg;base64,${image.content}`}
              title={image.name}
              alt={image.description}
              sx={{ width: "100%", height: "80%", objectFit: "contain" }}
            />
            <CardContent>
              <Typography variant="subtitle1">{image.description}</Typography>
            </CardContent>
          </>
        )}
      </Card>
    </>
  );
}

export default Display;
