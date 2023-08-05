import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <Box
        sx={{
          bgcolor: 'background.default',
          color: 'text.primary',
          width: '100%',
          height: '100%',
        }}
      >
        <Box sx={{ width: '100%', height: '100%' }}>
          <Outlet />
        </Box>
      </Box>
    </>
  );
}
