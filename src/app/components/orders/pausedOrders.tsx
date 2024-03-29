import React from "react";
import { TabPanel } from "@mui/lab";
import moment from "moment";
import { Box, Button, Stack } from "@mui/material";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import { retrievePausedOrders } from "../../screens/OrdersPage/selector";
import { Product } from "../../../types/product";
import { serverApi } from "../../../lib/config";
import { sweetErrorHandling, sweetFailureProvider } from "../../../lib/sweetAlert";
import OrderApiService from "../../apiServices/orderApiService";
import { verifiedMemberData } from "../../apiServices/verify";


// REDUX SELECTOR
const pausedOrdersRetriever = createSelector(
  retrievePausedOrders,
  (pausedOrders) => ({
    pausedOrders,
  })
);


export default function PausedOrders(props: any) {

    // INITIALIZATION
    const { pausedOrders } = useSelector(pausedOrdersRetriever);

    // HANDLERS
  const deleteOrderHandler = async (e: any) => {
    try {
      const order_id = e.target.value;
      const data = { order_id: order_id, order_status: "DELETED" };
      if (!verifiedMemberData) {
        sweetFailureProvider("Please login first", true);
      }
      let confirmation = window.confirm(
        "Buyurtmani bekor qilishni xohlaysizmi?"
      );
      if (confirmation) {
        const orderService = new OrderApiService();
        await orderService.updateOrderStatus(data);
        props.setOrderRebuild(new Date());
      }
    } catch (err) {
      console.log("deleteOrderHandler, ERROR:", err);
      sweetErrorHandling(err).then();
    }
  };
  const processOrderHandler = async (e: any) => {
    try {
      const order_id = e.target.value;
      const data = { order_id: order_id, order_status: "PROCESS" };
      if (!verifiedMemberData) {
        sweetFailureProvider("Please login first", true);
      }
      let confirmation = window.confirm("Buyurtmani to'lashni tasdiqlaysizmi?");
      if (confirmation) {
        const orderService = new OrderApiService();
        await orderService.updateOrderStatus(data);
        props.setOrderRebuild(new Date());
      }
    } catch (err) {
      console.log("processOrderHandler, ERROR:", err);
      sweetErrorHandling(err).then();
    }
  };

    return (
        <TabPanel value={'1'}>
            <Stack>
                {pausedOrders?.map((order) => {
                    return (
                        <Box className={"order_main_box"} 
                            // key={order[0]}
                        >
                            <Box className="order_box_scroll">
                                {order.order_items.map((item) => {
                                    const product: Product = order.product_data.filter(
                                        (ele) => ele._id === item.product_id
                                    )[0];
                                    const image_path = `${serverApi}/${product.product_images[0]}`;
                                    return (
                                        <Box className="ordersName_price">
                                        <img src={image_path} className="orderDishImage" />
                                        <p className="titleDish">{product.product_name}</p>
                                        <Box className="priceBox">
                                        <p>$ {item.item_price}</p>
                                        <img
                                            style={{ margin: "0 10px" }}
                                            src="/icons/Close.svg"
                                         />
                                        <p>{item.item_quantity}</p>
                                        <img
                                            style={{ margin: "0 10px" }}
                                            src="/icons/Pause.svg"
                                        />
                                        <p>$ {item.item_quantity * item.item_price}</p>
                                        </Box>
                                    </Box>
                                    );
                                })}
                            </Box>

                            <Box className={"total_price_box black_solid"}>
                                <Box className={"boxTotal"}>
                                <p>mahsulot narxi</p>
                                <p>${order.order_total_amount - order.order_delivery_cost}</p>
                                <img src={"/icons/plus.svg"} style={{ marginLeft: "20px" }} />
                                <p>yetkazish xizmati</p>
                                <p>${order.order_delivery_cost}</p>
                                <img
                                    src={"/icons/pause.svg"}
                                    style={{ marginLeft: "20px" }}
                                />
                                <p>jami narx</p>
                                <p>${order.order_total_amount}</p>
                                </Box>
                                <Button
                                value={order._id}
                                onClick={deleteOrderHandler}
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
                                value={order._id}
                                onClick={processOrderHandler}
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
