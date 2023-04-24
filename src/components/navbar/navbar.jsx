import * as React from 'react';
import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Logo from './static/logo.png';
import SettingsIcon from '@mui/icons-material/Settings';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { Link } from 'react-router-dom';

const pages = ['Weather', 'Trip', 'Map'];

function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [unit, setUnit] = useState("Celsius");
    const [setting, setSetting] = useState("TA2");
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    useEffect(() => {
        const storedUnit = sessionStorage.getItem("unit");
        if (storedUnit) {
            setUnit(storedUnit);
        }else{
            sessionStorage.setItem("unit", "Celsius");
            setUnit("Celsius")
        }
        const storedSetting = sessionStorage.getItem("setting");
        if (storedSetting) {
            setSetting(storedSetting);
        }else{
            sessionStorage.setItem("setting", "TA2");
            setSetting("TA2")
        }
    }, [unit,setting]);

    const handleUnitChange = (event) => {
        const newUnit = event.target.value;
        setUnit(newUnit);
        sessionStorage.setItem("unit", newUnit);
    };

    const handleSettingChange = (event) => {
        const newSetting = event.target.value;
        setSetting(newSetting);
        sessionStorage.setItem("setting", newSetting);
    };

    return (
        <AppBar position="fixed">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <img src={Logo} alt="altimg"width={30} height={30} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.2rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Group name
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography 
                                    component={Link}
                                    style={{ textDecoration: 'none', color: 'inherit' }}
                                    to={`/${page.toLowerCase()}`}
                                    textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Group name
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                                href={`/${page.toLowerCase()}`}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                                <Button 
                                variant='contained' 
                                onClick={handleOpenUserMenu}
                                style={{backgroundColor:"white",color:"#1976d2",fontWeight: 'bold'}}
                                startIcon={
                                <SettingsIcon 
                                    fontSize='inherit'
                                    color='primary'
                                    style={{fontSize:"30px",paddingLeft:"10px"}}/>
                                }>
                                    
                                </Button>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <FormControl sx={{ m: 1, minWidth: 120,display:"flex",flexDirection:"column" }} style={{ backgroundColor: "white" }}>
                                <InputLabel id="demo-simple-select-helper-label" style={{ backgroundColor: "white" }}>Unit</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={unit}
                                    label="Unit"
                                    onChange={handleUnitChange}
                                >
                                    <MenuItem value={"Celsius"}>Celsius</MenuItem>
                                    <MenuItem value={"Fahrenheit"}>Fahrenheit</MenuItem>

                                </Select>
                            </FormControl>
                            <FormControl sx={{ m: 1, minWidth: 120 }} style={{ backgroundColor: "white" }}>
                                <InputLabel id="demo-simple-select-helper-label" style={{ backgroundColor: "white" }}>Map Setting</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={setting}
                                    label="Map Setting"
                                    onChange={handleSettingChange}
                                >
                                    <MenuItem value={"TA2"}>Air Temperature</MenuItem>
                                    <MenuItem value={"CL"}>Clouds</MenuItem>
                                    <MenuItem value={"PA0"}>Precipitation</MenuItem>
                                    <MenuItem value={"PAR0"}>Rain</MenuItem>
                                    <MenuItem value={"PAS0"}>Snow</MenuItem>
                                    <MenuItem value={"APM"}>Pressure</MenuItem>
                                    <MenuItem value={"HRD0"}>Humidity</MenuItem>
                                    <MenuItem value={"WND"}>Wind speed</MenuItem>
                                    <MenuItem value={"TS0"}>Soil temperature</MenuItem>
                                </Select>
                            </FormControl>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;