import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Pagination,
  PaginationItem,
  Stack,
} from "@mui/material";
import Button from "@mui/material/Button";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { MemberPosts } from "./memberPosts";
import { MemberFollowers } from "./memberFollowers";
import { MemberFollowing } from "./memberFollowing";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TViewer from "../../components/tuiEditor/TViewer";
import { Member } from "../../../types/user";
import { BoArticle, SearchMemberArticlesObj } from "../../../types/boArticle";
import { useHistory } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import assert from "assert";
import { Definer } from "../../../lib/Definer";



// REDUX
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import {
  retrieveChosenMember,
  retrieveChosenMemberBoArticles,
  retrieveChosenSingleBoArticle,
} from "./selector";
import {
  setChosenMember,
  setChosenMemberBoArticles,
  setChosenSingleBoArticle,
} from "./slice";
import MemberApiService from "../../apiServices/memberApiService";
import CommunityApiService from "../../apiServices/communityApiService";
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";
import FollowApiService from "../../apiServices/followApiService";
import { verifiedMemberData } from "../../apiServices/verify";

// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setChosenMember: (data: Member) => dispatch(setChosenMember(data)),
  setChosenMemberBoArticles: (data: BoArticle[]) =>
    dispatch(setChosenMemberBoArticles(data)),
  setChosenSingleBoArticle: (data: BoArticle) =>
    dispatch(setChosenSingleBoArticle(data)),
});
// REDUX SELECTOR
const chosenMemberRetriever = createSelector(
  retrieveChosenMember,
  (chosenMember) => ({
    chosenMember,
  })
);
const chosenSingleBoArticleRetriever = createSelector(
  retrieveChosenSingleBoArticle,
  (chosenSingleBoArticle) => ({
    chosenSingleBoArticle,
  })
);
const chosenMemberBoArticleRetriever = createSelector(
  retrieveChosenMemberBoArticles,
  (chosenMemberBoArticles) => ({
    chosenMemberBoArticles,
  })
);



export function VisitOtherPage(props: any) {
    /** INITIALIZATIONS **/
    
    const [articleRebuild, setArticleRebuild] = useState<Date>(new Date());
    const [followeRebuild, setFollowRebuild] = useState<Date>(new Date());
    const { chosen_mb_id, chosen_art_id } = props;
    const history = useHistory();



    const {
      setChosenMember,
      setChosenMemberBoArticles,
      setChosenSingleBoArticle,
    } = actionDispatch(useDispatch());
    const { chosenMember } = useSelector(chosenMemberRetriever);
    const { chosenMemberBoArticles } = useSelector(
      chosenMemberBoArticleRetriever
    );
    const { chosenSingleBoArticle } = useSelector(chosenSingleBoArticleRetriever);
    const [value, setValue] = useState("1");

    const [memberArticleSearchObj, seMemberArticleSearchObj] =
    useState<SearchMemberArticlesObj>({
      mb_id: chosen_mb_id,
      page: 1,
      limit: 4,
    });

    



    useEffect(() => {      
      if (chosen_mb_id === verifiedMemberData?._id) {
        history.push("/member-page");
      }
      const communityService = new CommunityApiService();
      if (chosen_art_id) {
        communityService
          .getChosenArticle(chosen_art_id)
          .then((data) => {
            setChosenSingleBoArticle(data);
            setValue("4");
          })
          .catch((err) => console.log(err));
      }
      communityService
        .getMemberCommunityArticles(memberArticleSearchObj)
        .then((data) => setChosenMemberBoArticles(data))
        .catch((err) => console.log(err));
    }, [memberArticleSearchObj, chosen_mb_id, articleRebuild]);
    
    


    useEffect(() => {
      if (chosen_mb_id === verifiedMemberData?._id) {
        history.push("/member-page");
      }
      const memberService = new MemberApiService();
  
      memberService
        .getChosenMember(memberArticleSearchObj.mb_id)
        .then((data) => setChosenMember(data))
        .catch((err) => console.log(err));
    }, [verifiedMemberData, chosen_mb_id, followeRebuild]);
  
  
    /** HANDLERS **/
    const handleChange = (event: any, newValue: string) => {
      setValue(newValue);
    };



    const renderChosenArticleHandler = async (art_id: string) => {
      try {
        const communityService = new CommunityApiService();
        communityService
          .getChosenArticle(art_id)
          .then((data) => {
            setChosenSingleBoArticle(data);
            setValue("4");
          })
          .catch((err) => console.log(err));
      } catch (err: any) {
        console.log(err);
        sweetErrorHandling(err).then();
      }
    };
    const handlePaginationChange = (event: any, value: number) => {
      memberArticleSearchObj.page = value;
      seMemberArticleSearchObj({ ...memberArticleSearchObj });
    };
  
    const subscribeHandler = async (e: any) => {
      try {
        assert.ok(verifiedMemberData, Definer.auth_err1);
        const followService = new FollowApiService();
        await followService.subscribe(e.target.value);
        await sweetTopSmallSuccessAlert("subscribed successfully", 700, false);
        setFollowRebuild(new Date());
      } catch (err: any) {
        console.log(err);
        sweetErrorHandling(err).then();
      }
    };
  
    const unsubscribeHandler = async (e: any) => {
      try {
        assert.ok(verifiedMemberData, Definer.auth_err1);
        const followService = new FollowApiService();
        await followService.unsubscribe(e.target.value);
        await sweetTopSmallSuccessAlert("unsubscribed successfully", 700, false);
        setFollowRebuild(new Date());
      } catch (err: any) {
        console.log(err);
        sweetErrorHandling(err).then();
      }
    };
    console.log("////////////", chosenMember?.mb_image);






  return (
    <div className={"my_page"}>
      <Container maxWidth="lg" sx={{ mt: "50px", mb: "50px" }}>
        <Stack className={"my_page_frame"}>
          <TabContext value={value}>
            <Stack className={"my_page_left"}>
              <Box display={"flex"} flexDirection={"column"}>
                <TabPanel value={"1"}>
                  <Box className={"menu_name"}>Maqolalar</Box>
                  <Box className={"menu_content"}>
                    <MemberPosts
                    chosenMemberBoArticles = {chosenMemberBoArticles}
                    renderChosenArticleHandler = {renderChosenArticleHandler}
                    setArticleRebuild = {setArticleRebuild}/>
                  

                  <Stack
                      sx={{ my: "40px" }}
                      direction={"row"}
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      <Box className="bottom_box">
                        <Pagination
                          count={
                            memberArticleSearchObj.page >= 3
                              ? memberArticleSearchObj.page + 1
                              : 3
                          }
                          page={memberArticleSearchObj.page}
                          renderItem={(item) => (
                            <PaginationItem
                              components={{
                                previous: ArrowBackIcon,
                                next: ArrowForwardIcon,
                              }}
                              {...item}
                              color="secondary"
                            />
                          )}
                          onChange={handlePaginationChange}
                        />
                      </Box>
                    </Stack>


                  </Box>
                </TabPanel>
                <TabPanel value={"2"}>
                  <Box className={"menu_name"}>Followers</Box>
                  <Box className={"menu_content"}>
                    <MemberFollowers 
                    actions_enabled={false}
                    followeRebuild = {followeRebuild}
                    setFollowRebuild = {setFollowRebuild}
                    mb_id = {chosen_mb_id}/>
                  </Box>
                </TabPanel>

                <TabPanel value={"3"}>
                  <Box className={"menu_name"}>Following</Box>
                  <Box className={"menu_content"}>
                    <MemberFollowing 
                    actions_enabled={false}
                    followeRebuild = {followeRebuild}
                    setFollowRebuild = {setFollowRebuild}
                    mb_id = {chosen_mb_id}/>
                  </Box>
                </TabPanel>

                <TabPanel value={"4"}>
                  <Box className={"menu_name"}>Tanlangan Maqola</Box>
                  <Box className={"menu_content"}>
                    <TViewer chosenSingleBoArticle= {chosenSingleBoArticle}/>
                  </Box>
                </TabPanel>
              </Box>
            </Stack>

            <Stack className={"my_page_right"}>
              <Box className={"order_info_box"}>
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  alignItems={"center"}
                >
                  <div className={"order_user_img"}>
                    <img
                      src={"/auth/default_user.svg"}
                      className={"order_user_avatar"}
                    />
                    <div className={"order_user_icon_box"}>
                      <img src={"/icons/user_icon.svg"} />
                    </div>
                  </div>
                  <span className={"order_user_name"}>
                    {chosenMember?.mb_nick}
                  </span>
                  <span className={"order_user_prof"}>
                    {chosenMember?.mb_type}
                  </span>
                </Box>
                <Box className={"user_media_box"}>
                  <FacebookIcon />
                  <InstagramIcon />
                  <TelegramIcon />
                  <YouTubeIcon />
                </Box>
                <Box className={"user_media_box"}>
                  <p className={"follows"}>
                    Followers: {chosenMember?.mb_subscriber_cnt}
                  </p>
                  <p className={"follows"}>
                    Followings: {chosenMember?.mb_follow_cnt}
                  </p>
                </Box>
                <p className={"user_desc"}>
                {chosenMember?.mb_description ??
                    "Qo'shimcha ma'lumot kiritilmagan"}
                </p>

                <Box
                  display={"flex"}
                  justifyContent={"flex-end"}
                  sx={{ mt: "10px" }}
                >
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    {chosenMember?.me_followed &&
                      chosenMember.me_followed[0]?.my_following? (
                      <Tab
                        style={{ flexDirection: "column" }}
                        value={"4"}
                        component={() => (
                          <Button
                          style={{ background: "rgba(247, 9, 9, 0.72)" }}
                          variant="contained"
                          value={chosenMember?._id}
                          onClick={unsubscribeHandler}
                          >
                            BEKOR QILISH
                          </Button>
                        )}
                      />
                     ) : (
                      <Tab
                        style={{ flexDirection: "column" }}
                        value={"4"}
                        component={() => (
                          <Button
                          value={chosenMember?._id}
                          onClick={subscribeHandler}
                          style={{ background: "#30945e" }}
                          variant="contained"
                          >
                            FOLLOW QILISH
                          </Button>
                        )}
                      />
                    )}
                  </TabList>
                </Box>
              </Box>

              <Box className={"my_page_menu"}>
                <TabList
                  orientation="vertical"
                  variant="scrollable"
                  // value={value}
                  onChange={handleChange}
                  aria-label="Vertical tabs example"
                  sx={{ borderRight: 1, borderColor: "divider", width: "95%" }}
                >
                  <Tab
                    style={{ flexDirection: "column" }}
                    value={"1"}
                    component={() => (
                      <div className={`menu_box`} onClick={() => setValue("1")}>
                        <img src={"/icons/user_icon.svg"} />
                        <span>Maqolalarim</span>
                      </div>
                    )}
                  />
                  <Tab
                    style={{ flexDirection: "column" }}
                    value={"2"}
                    component={() => (
                      <div className={`menu_box`} onClick={() => setValue("2")}>
                        <img src={"/icons/user_icon.svg"} />
                        <span>Followers</span>
                      </div>
                    )}
                  />
                  <Tab
                    style={{ flexDirection: "column" }}
                    value={"3"}
                    component={() => (
                      <div className={`menu_box`} onClick={() => setValue("3")}>
                        <img src={"/icons/user_icon.svg"} />
                        <span>Following</span>
                      </div>
                    )}
                  />
                </TabList>
              </Box>
            </Stack>
          </TabContext>
        </Stack>
      </Container>
    </div>
  );
}
