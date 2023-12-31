import React from "react";
import { TabPanel } from "@mui/lab";
import moment from "moment";
import { Box, Button, Stack } from "@mui/material";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import { retrieveProcessOrders } from "../../screens/OrdersPage/selector";


// REDUX SELECTOR
const processOrdersRetriever = createSelector(
  retrieveProcessOrders,
  (processOrders) => ({
    processOrders,
  })
);

const pausedOrders = [
    [1, 2, 3],
    [1, 2, 3],
    [1, 2, 3],
];

export default function ProcessOrders(props: any) {

    // INITIALIZATION
     // const { processOrders } = useSelector(processOrdersRetriever);
     
    return (
        <TabPanel value={'2'}>
            <Stack>
                {pausedOrders?.map((order) => {
                    return (
                        <Box className={"order_main_box"} key={order[0]}>
                            <Box className={"order_box_scroll"}>
                                {order.map((item) => {
                                    const image_path = `/others/guruch.jpeg`;
                                    return (
                                        <Box className={"ordersName_price"} key={item}>
                                            <img src={image_path} className={"orderDishImage"} alt="dish" />
                                            <p className={"titleDish"}>Sandwich</p>
                                            <Box className={"priceBox"}>
                                                <p>$7</p>
                                                <img src={"/icons/Close.svg"} alt="Close" />
                                                <p>3</p>
                                                <img src={"/icons/Pause.svg"} alt="Pause" />
                                                <p style={{ marginLeft: "15px" }}>$21</p>
                                            </Box>
                                        </Box>
                                    );
                                })}
                            </Box>

                            <Box className={"total_price_box black_solid"}>
                                <Box className={"boxTotal"}>
                                <p>mahsulot narxi</p>
                                <p>$10</p>
                                <img src={"/icons/plus.svg"} style={{ marginLeft: "20px" }} />
                                <p>yetkazish xizmati</p>
                                <p>$5</p>
                                <img
                                    src={"/icons/pause.svg"}
                                    style={{ marginLeft: "20px" }}
                                />
                                <p>jami narx</p>
                                <p>$15</p>
                                </Box>
                                <Button
                                variant="contained"
                                color="secondary"
                                style={{
                                    borderRadius: "10px",
                                    boxShadow:
                                    "0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 4px 4px rgba(0, 0, 0, 0.25);",
                                }}
                                >
                                Bekor qilish
                                </Button>
                                <Button
                                variant="contained"
                                style={{
                                    background: "#0288D1",
                                    color: "#FFFFFF",
                                    borderRadius: "10px",
                                    boxShadow:
                                    "0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 4px 4px rgba(0, 0, 0, 0.25);",
                                }}
                                >
                                To'lash
                                </Button>
                            </Box>
                        </Box>
                    );
                })}
            </Stack>
        </TabPanel>
    );
}
