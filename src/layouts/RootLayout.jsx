import { Outlet, NavLink, useLoaderData } from "react-router-dom";

import { useState, useEffect } from "react";

import {
  MessageSeparator,
  InfoButton,
  AttachmentButton,
  Search,
  ConversationHeader,
  Avatar,
  SendButton,
  MainContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
  Sidebar,
  ConversationList,
  Conversation,
  Button,
} from "@chatscope/chat-ui-kit-react";

//axios
import axios from "axios";

//store
import useSideBarStore from "../store/Sidebar.jsx";

//components
import SideBarActions from "../components/SideBarActions";
import Setting from "../components/Setting";
import SocialLinks from "../components/SocialLinks";
import Error from "../components/Error.jsx";

//data
// import articles from "../devData/articles.jsx";
import useArticleStore from "../store/Article.jsx";

//animation
import { motion, useAnimation } from "framer-motion";

export default function RootLayout() {
  const { articles, intialize } = useArticleStore((state) => ({
    articles: state.articles,
    intialize: state.intialize,
  }));

  const temp = useLoaderData();

  const currentDate = new Date(); // Create a Date object with the current date and time
  const isoDateString = currentDate.toISOString().split("T")[0];

  /// custom mouse
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });
  const [cursorVariant, setCursorVariant] = useState("default");
  // const [showSideBar, setShowSideBar] = useState(true)

  useEffect(() => {
    // intialize();
    // console.log({ articles },'use sate');
    console.log(temp);
  }, [articles]);

  useEffect(() => {
    // async function fetchdata(){
    //   await intialize();
    //   console.log({ articles }, 'her e alse');
    // }
    // fetchdata()
    // const mouseMove = (e) => {
    //   setMousePosition({
    //     x: e.clientX,
    //     y: e.clientY,
    //   });
    // };
    // window.addEventListener("mousemove", mouseMove);
    // return () => {
    //   window.removeEventListener("mousemove", mouseMove);
    // };
  }, []);

  // const variants = {
  //   default: {
  //     x: mousePosition.x - 16,
  //     y: mousePosition.y - 16,
  //   },
  //   text: {
  //     // height: 150,
  //     // width: 150,
  //     // x: mousePosition.x - 75,
  //     // y: mousePosition.y - 75,
  //     // backgroundColor: "yellow",
  //     // mixBlendMode: "difference"
  //   }
  // }

  // const textEnter = () => setCursorVariant("text");
  // const textLeave = () => setCursorVariant("default");
  const { sidebar, toggleSidebar } = useSideBarStore((state) => ({
    sidebar: state.sidebar,
    toggleSidebar: state.toggleSidebar,
  }));

  const mainControls = useAnimation();

  useEffect(() => {
    if (!sidebar) {
      mainControls.start("hidden");
      console.log(sidebar);
    } else {
      mainControls.start("visible");
    }
  }, [sidebar]);

  return (
    <>
      <Error />
      <MainContainer>
        {/* {sidebar?  */}
        <motion.div
          variants={{
            visible: { width: "320px" },
            hidden: { width: 0 },
          }}
          initial="visible"
          animate={mainControls}
          className={"scrollbar-container cs-sidebar cs-sidebar--left"}
        >
          {/* sidebar actions */}
          <div
            className="nav"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <NavLink to="/chat">
              <SideBarActions
                src={"/src/assets/icons/add-icon.png"}
                title={"new chat"}
              />
            </NavLink>

            <NavLink to="explore">
              <SideBarActions
                src={"/src/assets/icons/explore-icon.png"}
                title={"explore"}
              />
            </NavLink>
            {/* <NavLink to='/'>  */}

            <SideBarActions
              clicked={toggleSidebar}
              src={"/src/assets/icons/sidepanel-icon.png"}
              title={"side-panel"}
            />
            {/* </NavLink> */}
          </div>
          {/* search bar */}
          <Search className="m0" placeholder="Search" />

          {/* conversation list */}
          <ConversationList>
            {// conversations
            temp.map((article, index) => (
              <>
                {/* //   <MessageSeparator style={{marginBottom :'1em'}} content={isoDateString}  as={Conversation}/> */}

                <NavLink to={`/chat/${article.title}`}>
                  <Conversation
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                    key={index}
                    active={false}
                  >
                    <Conversation.Content>{article.title}</Conversation.Content>
                    <Conversation.Operations visible>
                      {/*
          {/* operations */}
                      <Button
                        title="mark as favorite"
                        icon={
                          <Avatar
                            onClick={() => alert("favourite clicked")}
                            style={{
                              width: "10px",
                              height: "10px",
                              filter: "grayscale(100%)",
                            }}
                            src="/SRC/assets/icons/star.png"
                          />
                        }
                      />
                      <Avatar
                        onClick={() => alert("delete clicked")}
                        title="delete conversation"
                        style={{ width: "10px", height: "10px" }}
                        src="/SRC/assets/icons/delete-icon.png"
                      />
                      {/* <Button onClick={() => alert('edit clicked')} title="edit name" icon={<Avatar style={{width:'10px',height:'10px'}} src="/SRC/assets/icons/hand-with-pen-icon.png" />} /> */}
                    </Conversation.Operations>
                  </Conversation>
                </NavLink>
              </>
            ))}
          </ConversationList>

          {/* setttings */}
          <div className="setting_bar">
            <NavLink to="history">
              <Setting
                title="history"
                src="/src/assets/icons/history-icon.png"
              />
            </NavLink>

            <NavLink to="settings">
              <Setting
                title="settings"
                src="/src/assets/icons/settings-icon.png"
              />
            </NavLink>

            {/* <NavLink to='profile'>
        <Setting title='profile' src='/src/assets/icons/history-icon.png' />
        </NavLink> */}

            {/* <Setting /> */}
            <SocialLinks />
          </div>
        </motion.div>

        <Outlet />
      </MainContainer>
    </>
  );
}

export async function conversationloader() {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "http://127.0.0.1:5000//articles",
    headers: {},
  };

  let val = await axios
    .request(config)
    .then((response) => {
      let article = [];
      for (let i = 0; i < response.data.length; i++) {
        const name = response.data[i];
        article.push({ title: name, active: false });
      }

      return article;
    })
    .catch((error) => {
      console.log(error);
    });
  console.log(val, "val her");
  return val;
}
