import React from 'react';
import {Box, Button, Container, Stack} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { AspectRatio, Card, CardOverflow, CssVarsProvider, IconButton, Link, Typography } from '@mui/joy';
import { Favorite, LocationOnRounded } from '@mui/icons-material';
import CallIcon from '@mui/icons-material/Call';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';


const order_list = Array.from (Array(8).keys());
console.log(order_list);

export function AllRestaurants(){
    return <div className='all_restaurant'>
        <Container>
            <Stack flexDirection={"column"} alignItems={"center"}>
                <Box className={'fil_search_box'}>
                    <Box className={'fil_box'}>
                        <a>Zo'r</a>
                        <a>Mashhur</a>
                        <a>Trendagi</a>
                        <a>Yangi</a>
                    </Box>
                    <Box className={'search_big_box'}>
                        <form className={'search_form'} action={""} method={""}>
                            <input 
                                type="search"
                                className={'searchInput'}
                                name={'resSearch'}
                                placeholder={'Qidiruv'} 
                            />
                            <Button
                                className={'button_search'}
                                variant = "contained"
                                endIcon = {<SearchIcon/>}
                            >
                                Izlash
                            </Button>
                        </form>
                    </Box>
                </Box>

                <Stack className={'all_res_box'}>
                    <CssVarsProvider>
                        {order_list.map(ele => {
                            return (
                                <Card
                            variant = "outlined"
                            sx={{
                                minHeight:410,
                                minWidth: 290,
                                mx: "17px",
                                my: "20px",
                            }}
                        >
                            <CardOverflow>
                                    <AspectRatio ratio="1">
                                        <img src={"/restaurant/burak.jpeg"} alt="" />
                                    </AspectRatio>
                                    <IconButton 
                                        aria-label='Like minimal photography'
                                        size='md'
                                        variant='solid'
                                        color='neutral'
                                        onClick={(e) => {
                                            e.stopPropagation();
                                        }}
                                        sx={{
                                            position:"absolute",
                                            zIndex: 2,
                                            borderRadius: "50%",
                                            right: "1rem",
                                            bottom: 0,
                                            transform: "translateY(50%)",
                                            color: "rgba(0,0,0,.4)",
                                        }}
                                    >
                                        <Favorite
                                        // @ts-ignore 
                                        style={{
                                            color: "white"
                                        }}/>
                                    </IconButton>
                            </CardOverflow>
                            <Typography level="h2" sx={{ fontSize: "md", mt:2 }}>
                                    Texas De Brasil Restaurant
                            </Typography>
                            <Typography level="title-sm" sx={{ mt: 0.5, mb: 2 }}>
                                    <Link
                                        href = ""
                                        startDecorator = {<LocationOnRoundedIcon/>}
                                        textColor="neutral.700"
                                    >
                                        Tashkent, Yunusabad 4-1
                                    </Link>
                            </Typography>
                            <Typography level="title-sm" sx={{ mt: 0.5, mb: 2 }}>
                                    <Link
                                        href = ""
                                        startDecorator = {<CallIcon/>}
                                        textColor="neutral.700"
                                    >
                                        +99890 1199891
                                    </Link>
                            </Typography>
                            <CardOverflow
                                    variant='soft'
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row", // Set flexDirection to "row"
                                        gap: 1.5,
                                        py: 1.5,
                                        px: "var(--Card-padding)",
                                        borderTop: "1px solid",
                                        borderColor: "neutral.outlinedBorder",
                                        bgcolor: "background.level1",
                                        alignItems: "center", // Vertically center the content
                                    }}
                                    >
                                        <Typography
                                            level="title-sm"
                                            sx={{
                                                fontWeight: "md",
                                                color: "text.secondary",
                                                alignItems: "center",
                                                display: "flex",
                                            }}
                                        >
                                            1000
                                            <VisibilityIcon sx={{fontSize: 20, marginLeft: "5px" }}/>
                                        </Typography>
                                        <Box sx={{width: 2, bgcolor: "divider", height: 20}}/>
                                        <Typography
                                            level="title-sm"
                                            sx={{
                                                fontWeight: "md",
                                                color: "text.secondary",
                                                alignItems: "center",
                                                display: "flex",
                                            }}
                                        >
                                            <div>50</div>
                                            <Favorite sx={{fontSize: 20, marginLeft: "5px"}}/>
                                        </Typography>
                            </CardOverflow>
                        </Card>
                            );
                        })}

                    </CssVarsProvider>
                </Stack>

                <Stack className={'bottom_box'}>
                    <img className={'line_img'} src={"restaurant/line_two.svg"} />
                    <Pagination
                        count={3}
                        page={1}
                        renderItem={(item) => (
                            <PaginationItem
                                components={{
                                    previous: ArrowBackIcon,
                                    next: ArrowForwardIcon,
                                }}
                                {...item}
                                color={'secondary'}
                            />
                        )}
                    />
                    <img className={'line_img_two'} src={"restaurant/line_two.svg"}  />
                </Stack>
            </Stack>
        </Container>
    </div>
}