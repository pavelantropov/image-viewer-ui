import Files from "../files/Files";
import Display from "../display/Display";
import { Box, Stack } from '@mui/material';

function Viewer() {
  const MIN_HEIGHT = 'calc(100vh - 32px)';
  const MAX_HEIGHT = 'calc(100vh - 32px)';

  return (
    <>
      <Stack direction="row" spacing={2}
        sx={{
          margin: 2,
      }}>
        <Box sx={{
          width: '25%',
          height: '100%',
          minHeight: MIN_HEIGHT,
          maxHeight: MAX_HEIGHT,
          borderRadius: 5,
          boxShadow: 10,
        }}>
          <Files />
        </Box>
        <Box sx={{
          width: '75%',
          height: '100%',
          minHeight: MIN_HEIGHT,
          maxHeight: MAX_HEIGHT,
          borderRadius: 5,
          boxShadow: 10,
        }}>
          <Display />
        </Box>
      </Stack>
    </>
  );
}

export default Viewer;
