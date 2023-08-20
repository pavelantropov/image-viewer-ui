import "./App.css";
import { Routes, Route } from "react-router-dom";
import {
  ThemeProvider, //
  createTheme,
  useMediaQuery,
} from "@mui/material";
import Layout from "./features/layout/Layout";
import Viewer from "./features/viewer/Viewer";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = createTheme({
    palette: {
      mode: prefersDarkMode ? "dark" : "light",
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Viewer />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
