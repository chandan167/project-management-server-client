import { Box, IconButton } from "@mui/material";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import themeSignal from "../logic/theme.logic";

export default function ThemeToggle() {
    return (
        <Box
          sx={{
            padding: '5px',
            position: 'absolute',
            right: 10,
            top: 0
          }}
        >
          <ThemeToggleButton />
        </Box>
      );
}


export function ThemeToggleButton(){
  return <IconButton sx={{ ml: 1 }} onClick={themeSignal.toggleTheme} color="inherit">
  {themeSignal.getTheme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
</IconButton>
}