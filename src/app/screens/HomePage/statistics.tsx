import { Box, Container, Stack } from '@mui/material';
import React from 'react';
import Marginer from '../../components/marginer';


export function Statistics() {
    return(
        <div className='static_frame'>
            <Container>
                <Stack 
                flexDirection={"row"} 
                justifyContent={"space-between"} 
                alignItems = {"center"}
                style={{height: "236px"}}
                >
                    <div className="personage_img_left"></div>

                    <Stack className='static_box'>
                        <Box className = "static_num">12</Box>
                        <Box className = "static_text">Restaurants</Box>
                    </Stack>
                    <Marginer direction='vertical' width = "2" height = "64" bg='#E3C08D'/>

                    <Stack className='static_box'>
                        <Box className = "static_num">8</Box>
                        <Box className = "static_text">Years Experience</Box>
                    </Stack>
                    <Marginer direction='vertical' width = "2" height = "64" bg='#E3C08D'/>

                    <Stack className='static_box'>
                        <Box className = "static_num">50+</Box>
                        <Box className = "static_text">Menu ovqatlar</Box>
                    </Stack>
                    <Marginer direction='vertical' width = "2" height = "64" bg='#E3C08D'/>

                    <Stack className='static_box'>
                        <Box className = "static_num">200+</Box>
                        <Box className = "static_text">Foydalanuvchilar</Box>
                    </Stack>
                    

                    <div className="personage_img_right"></div>

                </Stack>
            </Container>
        </div>
    );
}