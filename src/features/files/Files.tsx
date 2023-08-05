import { Button, ButtonGroup, Divider, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { fetchFiles } from "./filesApi";
import { Image } from './types';

function Files() {
  const [files, setFiles] = useState<Image[]>([]);

  React.useEffect(() => {
    fetchFiles().then((res) => setFiles(res.files));
  }, []);

  return (
    <>
      <Stack spacing={2} sx={{
        width: '100%',
        height: '100%',
        paddingTop: 2,
        paddingBottom: 2,
        textAlign: 'center',
      }}>
        <Typography variant="h3">Files</Typography>
        <Divider />

        <Stack justifyContent="space-between" sx={{ paddingX: 3 }}>
          <ButtonGroup variant="text" orientation="vertical" aria-label="text button group">
              { files.length > 0 &&
                files.map((file, index) => (
                  <Button key={`file_${index}`}>{file.name}</Button>
                ))
              }
          </ButtonGroup>

          <Button>Upload a file</Button>
        </Stack>
      </Stack>
    </>
  );
}

export default Files;
