import { AppBar, Switch, Toolbar , Typography } from "@mui/material";

interface Props{
    idDarkMode:boolean,
    onThemeChange:()=> void
}

export default function Header({idDarkMode,onThemeChange}:Props){
    return (
        <AppBar>
            <Toolbar>
                <Typography variant="h5"> React Store</Typography>
                <Switch checked={idDarkMode} onChange={onThemeChange} />
            </Toolbar>
        </AppBar>
    )
}