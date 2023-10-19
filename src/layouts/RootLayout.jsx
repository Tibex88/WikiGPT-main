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
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };
    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
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

  function deleteArticle(name) {
    articles = articles.filter((title, i) => {
      return title.name !== name;
    });
    console.log(articles);
  }

  // const textEnter = () => setCursorVariant("text");
  // const textLeave = () => setCursorVariant("default");
  const { sidebar, toggleSidebar } = useSideBarStore((state) => ({
    sidebar: state.sidebar,
    toggleSidebar: state.toggleSidebar,
  }));
  let { articles, loaidngArticles } = useArticleStore((state) => ({
    articles: state.articles,
    loaidngArticles: state.loaidngArticles,
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
                src={"/src/assets/icons2/plus.png"}
                title={"new chat"}
              />
            </NavLink>

            <NavLink to="explore">
              <SideBarActions
                src={"/src/assets/icons2/compassnorth.png"}
                title={"explore"}
              />
            </NavLink>
            {/* <NavLink to='/'>  */}

            <SideBarActions
              clicked={toggleSidebar}
              src={"/src/assets/icons2/showrightsidepanel.png"}
              title={"side-panel"}
            />
            {/* </NavLink> */}
          </div>
          {/* search bar */}
          <Search className="m0" placeholder="Search" />

          {/* conversation list */}
          <ConversationList loading={loaidngArticles}>
            {// conversations
            articles.map((article, index) => (
              <>
                {/* //   <MessageSeparator style={{marginBottom :'1em'}} content={isoDateString}  as={Conversation}/> */}

                <NavLink to={`/chat/${article.name}`}>
                  <Conversation
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                    key={index}
                    active={false}
                  >
                    <Conversation.Content>
                      {" "}
                      {article.name}{" "}
                    </Conversation.Content>
                    <Conversation.Operations visible>
                      {/*
          {/* operations */}
                      {/* <Button title="mark as favorite" icon={<Avatar onClick={() => alert('favourite clicked')} style={{width:'10px',height:'10px', filter: 'grayscale(100%)'}} src="/src/assets/icons2/star.png" />} /> */}
                      <Avatar
                        onClick={(event) => deleteArticle(article.name)}
                        title="delete Article"
                        style={{ width: "5px", height: "5px" }}
                        src="/SRC/assets/icons2/delete.png"
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
              <Setting title="history" src="/src/assets/icons2/history64.png" />
            </NavLink>

            <NavLink to="settings">
              <Setting title="settings" src="/src/assets/icons2/setting.png" />
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
