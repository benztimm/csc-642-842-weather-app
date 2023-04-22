import React from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import ScrollAnimation from "./scrollanimation";

function Trip() {
    
  
    return (
        <React.Fragment>
        <CssBaseline />

        <ScrollAnimation>
            <Container fixed>
                <Box sx={{ bgcolor: '#000000', height: '150vh' }} />
            </Container>
        </ScrollAnimation>

        <ScrollAnimation>
            <Container fixed>
                <Box sx={{ bgcolor: '#af00ff', height: '150vh' }} />
            </Container>
        </ScrollAnimation>

        <ScrollAnimation>
            <Container fixed>
                <Box sx={{ bgcolor: '#6739d4', height: '150vh' }} />
            </Container>
        </ScrollAnimation>

    </React.Fragment>
    );
  }
  export default Trip;