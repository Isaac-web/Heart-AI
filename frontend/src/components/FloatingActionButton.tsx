import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";


const FloatingActionButton = () => {
  return (
    <>
      <Box className="fixed bottom-8 right-8">
        <Fab sx={{ backgroundColor: "#F74780" }} aria-label="add">
          <SmartToyOutlinedIcon sx={{ color: "white" }} />
        </Fab>
      </Box>
    </>
  );
};

export default FloatingActionButton;
