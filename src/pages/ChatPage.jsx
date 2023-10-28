import React from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import wiki from "wikipedia";
import axios from "axios";

//store
import useErrorStore from "../store/Error";
import useMessageStore, { addMessage } from "../store/Messages";

//components
import {
  ExpansionPanel,
  ConversationHeader,
  MessageList,
  Message,
  MessageInput,
  ChatContainer,
  InfoButton,
  TypingIndicator,
  // Linkify,
  Sidebar,
  Avatar,
  Button,
} from "@chatscope/chat-ui-kit-react";
import Linkify from "react-linkify";
import Header from "../components/Header";

//animation
import { AnimatePresence, delay, motion, useAnimation } from "framer-motion";

import data from "../devData/data";
import { useLocation, useParams } from "react-router-dom";
import CustomContent from "../components/CustomContent";
import SideBarActions from "../components/SideBarActions";

function ChatPage() {
  // var url = "http://127.0.0.1:5000";
  var url = "https://app-3byj.onrender.com";
  // var url = process.env.URL;
  console.log(url)
  
  const customHeaders = { "ngrok-skip-browser-warning": true };

  const { id } = useParams();

  const { error, isError, setError, removeError } = useErrorStore((state) => ({
    error: state.error,
    isError: state.isError,
    setError: state.setError,
    removeError: state.removeError,
  }));

  const { messages } = useMessageStore((state) => ({
    messages: state.messages,
  }));

  // const [messages, setMessages] = useState([
  //   {
  //     message: "Hello, I'm WikiGPT! Ask me anything about this article!",
  //     sentTime: "just now",
  //     sender: "WikiGPT",
  //   },
  // ]);

  addMessage(id, "first");

  const [summary, setSummary] = useState("");
  const [reference, setReference] = useState("");
  const [media, setMedia] = useState("");
  const [loading, setLoading] = useState(true);

  const [isTyping, setIsTyping] = useState(false);

  const [leftSiidebar, setLeftSideBar] = useState(false);

  const mainControls = useAnimation();

  const panelControls = useAnimation();

  const [currentChatMessage, setCurrentMessage] = useState([]);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: "outgoing",
      sender: "user",
    };
    console.log(messages, addMessage);
    addMessage(id, newMessage);

    setCurrentMessage(messages[id]);

    // console.log(message)
    setIsTyping(true);
    await processMessage(currentChatMessage);
  };

  async function getSummary(name) {
    try {
      let pageObject = {};
      const page = await wiki.page(name);
      setSummary((await page.summary()).extract);
      setMedia((await page.media()).items);

      var ref = await page.references();
      const limitedref = [];

      for (let i = 0; i < Math.min(10, ref.length); i++) {
        limitedref.push(ref[i]);
      }

      const temp = await page.categories();
      setReference(limitedref);
      console.log(page, temp);
    } catch (error) {
      console.log(error);
      //=> Typeof wikiError
    }
  }

  // getSummary(id)
  async function processMessage(currentChatMessage) {
    console.log(currentChatMessage, "her");
    // messages is an array of messages

    axios({
      method: "get",
      url: `${url}/article`,
      headers: customHeaders,
      params: {
        query: currentChatMessage[currentChatMessage.length - 1].message,
        namespace: id,
      },
    })
      .then((response) => {
        console.log(response.data);
        const links = response.data[1];
        addMessage(id, { message: response.data, sender: "WikiGPT" });
        setCurrentMessage(messages[id]);
        setIsTyping(false);
      })
      .catch((error) => {
        setError({ content: error.message, title: error.name });
        setIsTyping(false);
      });
  }

  const toggleLeftSidebar = (e) => {
    setLeftSideBar(!leftSiidebar);
  };

  const copy = (e) => {
    alert("copy clicked");
  };

  const del = (evt) => {
    alert("delete clicked");
  };

  useEffect(() => {
    // console.log(messages, "here", id);
    setCurrentMessage(messages[id]);
    getSummary(id);
  }, [id, messages]);

  useEffect(() => {
    if (!leftSiidebar) {
      mainControls.start("hidden");
      // console.log(leftSiidebar)
    } else {
      mainControls.start("visible");
    }
  }, [leftSiidebar]);

  return (
    <>
      <ChatContainer>
        {/* header */}
        <Header as={ConversationHeader} name={id}>
          <InfoButton
            onClick={() => setLeftSideBar(!leftSiidebar)}
            title="Help"
          />
        </Header>
        {/* end of header */}

        {/* message list */}
        <MessageList
          loadingMorePosition="bottom"
          // loading = {loading}
          typingIndicator={
            isTyping ? <TypingIndicator content="WikiGPT is typing" /> : null
          }
          scrollBehavior="smooth"
          // style={{zIndex:"2"}}
        >
          {id ? (
            currentChatMessage.map((message, i) =>
              message.sender == "WikiGPT" ? (
                <Message
                  style={{ display: "flex", flexDirection: "row" }}
                  className=""
                  key={i}
                  model={{
                    // message: message.message,
                    sender: message.sender,
                    direction: message.direction,
                  }}
                >
                  <Message.CustomContent>
                    {message.message[0]}

                    {message.message[1].length <= 0 ? (
                      <p></p>
                    ) : (
                      <>
                        <p style={{ color: "#0f1c2a" }}>
                          {"     "}
                          Extra Reference Links
                        </p>
                        {message.message[1].map((link, index) => {
                          return (
                            <ul style={{ paddingLeft: "15px" }}>
                              <li style={{ color: "#a28351" }}>
                                <a
                                  target="blank"
                                  rel="noopener"
                                  href={link.link}
                                  key={index}
                                >
                                  {link.title + " - " + link.text}
                                </a>
                              </li>
                            </ul>
                          );
                        })}
                      </>
                    )}
                  </Message.CustomContent>
                  {/* <div as={Message.Footer}>
                  <Avatar onClick={() => copy()} style={{width:'2px',height:'2x'}} src="/SRC/assets/icons/copy-icon.png" /> 
           <Avatar onClick={() => del()} style={{width:'2px',height:'2px'}} src="/SRC/assets/icons/delete-icon.png" /> 
                </div> */}
                </Message>
              ) : (
                <Message
                  style={{ display: "flex", flexDirection: "row" }}
                  className=""
                  key={i}
                  model={{
                    message: message.message,
                    sender: message.sender,
                    direction: message.direction,
                  }}
                >
                  {/* <div as={Message.Footer}>
                  <Avatar onClick={() => copy()} style={{width:'2px',height:'2x'}} src="/SRC/assets/icons/copy-icon.png" /> 
           <Avatar onClick={() => del()} style={{width:'2px',height:'2px'}} src="/SRC/assets/icons/delete-icon.png" /> 
                </div> */}
                </Message>
              )
            )
          ) : (
            <MessageList.Content
              className="custom__content"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                height: "100%",
                textAlign: "center",
                fontSize: "1.2em",
                
              }}
            >
              <CustomContent />
            </MessageList.Content>
          )}
          <MessageInput
            className="drop_shadow input__search"
            onSend={handleSend}
            sendButton={false}
            style={{zIndex:"2"}}
          />
        </MessageList>
      </ChatContainer>

      <AnimatePresence >
        {id ? (
          <motion.div
            variants={{
              visible: { display: "block" },
              hidden: { display: "none" },
            }}
            initial="visible"
            animate={mainControls}
            style={{ overflowY: "scroll" }}
            className={"scrollbar-container  cs-sidebar cs-sidebar--right"}
          >
            <SideBarActions
              clicked={toggleLeftSidebar}
              as={"Avatar"}
              src={"/src/assets/icons2/cancel.png"}
              title={"side-panel"}
              className="rotate"
            />

            <ExpansionPanel
              style={{ backgroundColor: "#ff7051" }}
              open
              title="SUMMARY"
            >
              {/* remove transitions if necessary, not working */}
              {summary ? <p> {summary} </p> : <p>No content</p>}
            </ExpansionPanel>

            <ExpansionPanel title="MEDIA">
              {media ? (
                media.map((med, index) => {
                  {
                    if (med.srcset) {
                      return (
                        <a href={med.srcset[0].src} download target="_blank">
                          <img
                            src={med.srcset[0].src}
                            alt={med.title}
                            srcset={med.srcset}
                            width="200"
                          />
                        </a>
                      );
                    }
                  }
                })
              ) : (
                <p>NO Media</p>
              )}
            </ExpansionPanel>

            <ExpansionPanel title="REFERENCES">
              <ul>
                {reference ? (
                  reference.map((ref, index) => {
                    return (
                      <li>
                        <a href={ref} target="_blank">
                          {ref}
                        </a>
                      </li>
                    );
                  })
                ) : (
                  <p>NO Reference</p>
                )}
              </ul>
            </ExpansionPanel>

            {/* <ExpansionPanel title="SECTIONS">
            </ExpansionPanel>

            <ExpansionPanel title="OPTIONS">
            </ExpansionPanel> */}
          </motion.div>
        ) : (
          <></>
        )}
      </AnimatePresence>
    </>
  );
}

export default ChatPage;
