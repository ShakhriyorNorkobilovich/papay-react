import { Avatar, Box, Stack } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { SocketContext } from "../../context/socket";
import { ChatGreetMsg, ChatInfoMsg, ChatMessage } from "../../../types/others";
import { verifiedMemberData } from "../../apiServices/verify";
import {
  sweetErrorHandling,
  sweetFailureProvider,
} from "../../../lib/sweetAlert";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import { serverApi } from "../../../lib/config";
import { RippleBadge } from "../../MaterialTheme/styled";

const NewMessage = (data: any) => {
  if (data.new_message.mb_id === verifiedMemberData?._id) {
    return (
      <Box
        flexDirection={"row"}
        sx={{ display: "flex", m: "10px 0" }}
        alignItems={"flex-end"}
        justifyContent={"flex-end"}
      >
        <div className="msg_right">{data.new_message.msg}</div>
      </Box>
    );
  } else {
    return (
      <Box flexDirection={"row"} sx={{ display: "flex", m: "10px 0" }}>
        <Avatar
          src={`${serverApi}/${data.new_message.mb_image}`}
          alt={data.new_message.mb_nick}
        />
        <div className="msg_left">{data.new_message.msg}</div>
      </Box>
    );
  }
};
export function CommunityChats() {
  /**INITILIZATION**/
  const [messageList, setMessageList] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const socket = useContext(SocketContext);
  const textInput: any = useRef(null);
  useEffect(() => {
    socket.connect();
    socket?.on("connect", function () {
      console.log("CLIENT: connected");
    });

    socket?.on("newMsg", (new_message: ChatMessage) => {
      messageList.push(
        // @ts-ignore
        <NewMessage new_message={new_message} key={messageList.length} />
      );
      setMessageList([...messageList]);
    });

    socket?.on("greetMsg", (msg: ChatGreetMsg) => {
      messageList.push(
        // @ts-ignore
        <p style={{ textAlign: "center" }}>
          {msg.text}, dear {verifiedMemberData?.mb_nick ?? "guest"}
        </p>
      );
      setMessageList([...messageList]);
    });

    socket?.on("infoMsg", (msg: ChatInfoMsg) => {
      console.log("CLIENT: infoMsg");

      setOnlineUsers(msg.total);
    });
    return () => {
      socket.disconnect();
    };
  }, [socket]);
  // HANDLERS
  const getInputMessageHandler = useCallback(
    (e: any) => {
      const text = e.target.value;
      setMessage(text);
    },
    [message]
  );

  const sendMsgHandler = () => {
    try {
      if (!verifiedMemberData) {
        textInput.current.value = "";
        sweetFailureProvider("Please login first!", true);
        return false;
      }
      assert.ok(textInput.current.value, Definer.input_err3);
      textInput.current.value = "";
      const mb_image_url =
      verifiedMemberData?.mb_image ?? "/auth/default_uer.svg";
      socket.emit("createMsg", {
        msg: message,
        mb_id: verifiedMemberData?._id,
        mb_nick: verifiedMemberData?.mb_nick,
        mb_image: verifiedMemberData?.mb_image,
      });
      setMessage("");
    } catch (err) {
      console.log("sendMsgHandler, Error:", err);
      sweetErrorHandling(err).then();
    }
  };
  const getKeyHandler = (e: any) => {
    try {
      if (e.key == "Enter") {
        assert.ok(message, Definer.input_err3);
        sendMsgHandler();
      }
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };        
        return (
        <Stack className={"chat_frame"}>
            <Box className={"chat_top"}>
            <div style={{ marginRight: "20px" }}>Jonli Muloqot</div>
            <RippleBadge
            style={{
                position: "absolute",
                top: "25px",
                right: "55px",
                background: "none",
            }}
            badgeContent={onlineUsers}
            />

            </Box>
            <Box className={"chat_content"}>
                <Stack className={"chat_main"}>
                    <Box
                        flexDirection={"row"}
                        style={{ display: "flex" }}
                        sx={{ m: "10px 0px" }}
                    >
                    <div className={"msg_left"}>Bu yer jonli muloqot</div>
                    </Box>

                    {messageList}
                    
                    {/* <Box
                        flexDirection={"row"}
                        style={{ display: "flex" }}
                        alignItems={"flex-end"}
                        justifyContent={"flex-end"}
                        sx={{ m: "10px 0px" }}
                    >
                    <div className={"msg_right"}>Bu sizning habaringiz</div>
                    </Box> */}

                    {/* <Box
                        flexDirection={"row"}
                        style={{ display: "flex" }}
                        sx={{ m: "10px 0px" }}
                    >
                        <Avatar alt={"martin"} src={"/community/cute.girl.jpg"}/>
                        <div className={"msg_left"}>Bu yerda boshqalarni habari</div>
                    </Box> */}
                </Stack>
            </Box>
            <Box className={"chat_bott"}>
            <input
                ref={textInput}
                type={"text"}
                name={"message"}
                className={"msg_input"}
                placeholder={"Xabar jo'natish"}
                onChange={getInputMessageHandler}
                onKeyDown={getKeyHandler}
            />
            <button className={"send_msg_btn"} onClick={sendMsgHandler}>
                <SendIcon style={{ color: "#fff" }}/>
            </button>
            </Box>
        </Stack>
        );
    }
    