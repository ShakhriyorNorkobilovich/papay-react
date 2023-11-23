import React from 'react';
import {Box, Container, Stack} from "@mui/material";
import {Swiper, SwiperSlide} from 'swiper/react';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Marginer from "../../components/marginer";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
// Update the import statements for swiper CSS files
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import { FreeMode, Navigation, Thumbs } from 'swiper';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import Checkbox from '@mui/material/Checkbox';

const chosen_list = Array.from(Array(8).keys());

export function ChosenDish(){
    const label = { inputProps: { "aria-label": "Checkbox demo" } };

    return (<div className='chosen_dish_page'>
            <Container className='dish_container'>
                <Stack className='chosen_dish_slider'>
                    <Swiper
                        className='dish_swiper'
                        loop={true}
                        spaceBetween={10}
                        navigation={true}
                        // thumbs={{ swiper: thumbsSwiper}}
                        modules={[FreeMode, Navigation, Thumbs]}
                    >
                        {chosen_list.map((ele) =>{
                            const image_path = `/others/guruch.jpeg`;
                            return (
                                <SwiperSlide>
                                    <img 
                                        style={{width: "100%", height:"100%"}} 
                                        src={image_path} 
                                    />
                                </SwiperSlide>
                            );
                        } )}
                    </Swiper>
                    <Swiper
                        className={'little_swiper'}
                        slidesPerView={3}
                        centeredSlides={false}
                        spaceBetween={30}
                    >
                       {chosen_list.map((ele) =>{
                            const image_path = `/others/guruch.jpeg`;
                            return (
                                <SwiperSlide>
                                    <img 
                                        style={{width: "100%", height:"100%"}} 
                                        src={image_path} 
                                    />
                                </SwiperSlide>
                            );
                        } )}
                    </Swiper>
                </Stack>
                <Stack className={'chosen_dish_info_container'}>
                    <Box className='chosen_dish_info_box'>
                        <strong className={"dish_txt"}>Sweet Sandvich</strong>
                        <span className={"resto_name"}>Texas De Brazil</span>
                        <Box className={"rating_box"}>
                            <Rating className={'stars'} name='half-rating' defaultValue={3.5} precision={0.5}/>
                            <div className={"evaluation_box"}>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        marginRight: "20px",
                                    }}
                                >
                                    <Checkbox
                                        {...label}
                                        icon={<FavoriteBorder/>}
                                        checkedIcon={<Favorite style={{ color: "red"}}/>}
                                        // @ts-ignore
                                        checked={false}
                                    />
                                    <span>98 ta</span>
                                </div>
                                <div style={{display: "flex", alignItems: "center"}}>
                                    <RemoveRedEyeIcon sx={{mr: "10px"}}/>
                                    <span>1000 ta</span>
                                </div>
                            </div>
                        </Box>
                        <p className={'dish_desc_info'}>
                            Many desktop publishing packages and web page editors now use Lorem 
                            Ipsum as their default model text, and a search for 'lorem ipsum' 
                            will uncover many web sites still in their infancy.
                        </p>
                        <Marginer       
                            direction='horizontal'
                            height='1'
                            width='100%'
                            bg='#000000'
                        />
                        <div className={'dish_price_box'}>
                            <span>Narx:</span>
                            <span>$11</span>
                        </div>
                        <div className={'button_box'}>
                            <Button variant='contained'>Savatga qo'shish</Button>
                        </div>
                    </Box>
                </Stack>
            </Container>
        </div>
    );
}