import React, { useEffect, useState } from 'react';
import{ Container, Stack, Box, Tabs } from "@mui/material";
import"../../../css/orders.css";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Order } from "../../../types/order";

import PausedOrders from "../../components/orders/pausedOrders";
import ProcessOrders from "../../components/orders/processOrders";
import FinishedOrders from "../../components/orders/finishedOrders";

// REDUX
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setFinishedOrders, setPausedOrders, setProcessOrders } from "./slice";
import OrderApiService from '../../apiServices/orderApiService';
import { Member } from '../../../types/user';


// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
    setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
    setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
    setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
  });



  export function OrdersPage(props: any) {
    /**INITIALIZATIONS**/
    const [value, setValue] = useState("1");
    const { setPausedOrders, setProcessOrders, setFinishedOrders } =
      actionDispatch(useDispatch());

      const verifiedMemberData: Member | null = props.verifiedMemberData;

      
      useEffect(() => {
        const orderService = new OrderApiService();
        orderService
          .getMyOrders("paused")
          .then((data) => setPausedOrders(data))
          .catch((err) => console.log(err));
        orderService
          .getMyOrders("process")
          .then((data) => setProcessOrders(data))
          .catch((err) => console.log(err));
        orderService
          .getMyOrders("finished")
          .then((data) => setFinishedOrders(data))
          .catch((err) => console.log(err));
      }, [
        props.orderRebuild
    ]);



    /**HANDLERS**/
    const handleChange = (event: any, newValue: string) => {
      setValue(newValue);
    };

    return(
        <div className='order_page'>
            <Container
                style={{display:"flex", flexDirection:"row"}}
                sx={{mt:"50px", mb:"50px"}}
            >
                <Stack className='order_left'>
                <TabContext value={value}>
                        <Box className='order_nav_frame'>
                            <Box sx={{borderBottom: 1, borderColor: "divider"}}>
                                <TabList
                                    onChange={handleChange}
                                    aria-label="basic tabs example"
                                    style={{display:"flex", justifyContent: "space-between"}}
                                >
                                   
                                        <Tab label="Buyurtmalarim" value={"1"}/>
                                        <Tab label="Jarayonda" value={"2"}/>
                                        <Tab label="Yakunlangan" value={"3"}/>
                        
                                </TabList>
                            </Box>
                        </Box>
                        <Stack className='order_main_content'>
                            <PausedOrders setOrderRebuild = {props.setOrderRebuild}/>
                            <ProcessOrders setOrderRebuild = {props.setOrderRebuild}/>
                            <FinishedOrders setOrderRebuild = {props.setOrderRebuild}/>
                        </Stack>
                    </TabContext>
                </Stack>

                <Stack className = {"order_right"}>
                    <Box className = {"order_info_box"}>
                        <Box
                            display={"flex"}
                            flexDirection={"column"}
                            alignItems={"center"}
                        >
                            <div className = {"order_user_img"}>
                                <img 
                                    src={verifiedMemberData?.mb_image}
                                    className = {"order_user_avatar"}  
                                />
                                <div className={"order_user_icon_box"}>
                                    <img
                                        src={"/icons/user_icon.svg"}
                                        alt="User Icon"
                                        className={"order_user_prof"}
                                    />
                                </div>
                            </div>
                            <span className = {"order_user_name"}>{verifiedMemberData?.mb_nick}</span>
                            <span className = {"order_user_prof"}>{verifiedMemberData?.mb_type ?? "Foydalanuvchi"}</span>
                        </Box>
                        <Box
                            style={{border: "1px solid #A1A1A1"}}
                            width={"100%"}
                            sx={{mt: "40px", mb: "8px"}}
                        ></Box>
                        <Box className = {"order_user_address"}>
                            <div style={{display: "flex"}}>
                                <LocationOnIcon/>
                            </div>
                            <div className = {"spec_address_txt"}>{verifiedMemberData?.mb_address ?? "manzil kiritilmagan"}</div>
                        </Box>
                    </Box>
                    <Box className={"order_info_box"} sx={{ mt: "15px" }}>
                        <input
                        type={"text"}
                        name={"card_number"}
                        placeholder={"Card number : 8600 0908 8090 7080"}
                        className={"card_input"}
                        />
                        <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                        >
                        <input
                            type={"text"}
                            name={"card_period"}
                            placeholder={"01 / 01"}
                            className={"card_half_input"}
                        />
                        <input
                            type={"text"}
                            name={"card_cvv"}
                            placeholder={"CVV : 010"}
                            className={"card_half_input"}
                        />
                        </div>
                        <input
                        type={"text"}
                        name={"card_creator"}
                        placeholder={"Khan"}
                        className={"card_input"}
                        />
                        <div className={"cards_box"}>
                        <img src={"/icons/western_card.svg"} />
                        <img src={"/icons/master_card.svg"} />
                        <img src={"/icons/paypal_card.svg"} />
                        <img src={"/icons/visa_card.svg"} />
                        </div>
                    </Box>
                </Stack>
            </Container>
        </div>
    );
}