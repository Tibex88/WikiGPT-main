import React from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import wiki from "wikipedia";

// import  wiki from 'wikipedia';
import axios from "axios";

//store
import useErrorStore from "../store/Error";

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
  Sidebar,
  Avatar,
  Button,
} from "@chatscope/chat-ui-kit-react";
import Header from "../components/Header";

//animation
import { AnimatePresence, delay, motion, useAnimation } from "framer-motion";

import data from "../devData/data";
import { useLocation, useParams } from "react-router-dom";
import CustomContent from "../components/CustomContent";
import SideBarActions from "../components/SideBarActions";

function ChatPage() {
  var url = "http://127.0.0.1:5000";

  const customHeaders = { "ngrok-skip-browser-warning": true };

  const { id } = useParams();

  const { error, isError, setError, removeError } = useErrorStore((state) => ({
    error: state.error,
    isError: state.isError,
    setError: state.setError,
    removeError: state.removeError,
  }));

  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm WikiGPT! Ask me anything about this article!",
      sentTime: "just now",
      sender: "WikiGPT",
    },
  ]);

  const [summary, setSummary] = useState("");
  const [reference, setReference] = useState("");
  const [media, setMedia] = useState("");

  const [loading, setLoading] = useState(true);

  const [isTyping, setIsTyping] = useState(false);

  const [leftSiidebar, setLeftSideBar] = useState(false);

  const mainControls = useAnimation();

  const panelControls = useAnimation();

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: "outgoing",
      sender: "user",
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);
    // console.log(message)
    setIsTyping(true);
    await processMessage(newMessages);
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

  async function processMessage(newMessages) {
    // messages is an array of messages

    axios({
      method: "get",
      url: `${url}/article`,
      headers: customHeaders,
      params: {
        query: newMessages[newMessages.length - 1].message,
        namespace: id,
      },
    })
      .then((response) => {
        // let sample = `The historical city center refers to the oldest part of a city, typically located within the original walls or fortifications. It is an area that has been inhabited for centuries and has played a significant role in the city's history. The historical city center is often characterized by narrow streets, old buildings, and historic landmarks such as churches, palaces, and monuments.

        // The historical city center has been shaped by different epochs of the city's long history, with each era leaving its mark on the architecture, culture, and layout of the area. For example, medieval cities often had narrow, winding streets and closely-packed buildings, while Renaissance cities were characterized by grand squares and ornate palaces.

        // The historical city center is often considered the heart of a city, and it is where many of the city's most important landmarks and cultural institutions are located. It is also an area that is often associated with a city's identity and heritage, and it is a popular destination for tourists who want to experience the city's history and culture.

        // In many cases, the historical city center has been preserved and restored to maintain its original character, and it is often a place of great beauty and charm. However, it can also be a place of conflict, as modern development and urban planning can sometimes clash with the desire to preserve the city's historical heritage.

        // Overall, the historical city center is a unique and important part of a city's fabric, and it is a place that offers a glimpse into the city's rich history and cultural heritage.`

        setTimeout(() => {
          setMessages([
            ...newMessages,
            {
              message: response.data,
              // message: sample,
              sendTime: Date.now(),
              sender: "WikiGPT",
            },
          ]);
        }, 2000);

        console.log(messages);
        setIsTyping(false);
      })
      .catch((error) => {
        setError({ content: error.message, title: error.name });

        // setMessages([...newMessages, {
        //   message: JSON.stringify(error),
        //   sender: "WikiGPT"
        // }]);
        setIsTyping(false);
        // console.log("Error",error.message, error.code, error.config);
      });
  }

  const toggleLeftSidebar = (e) => {
    setLeftSideBar(!leftSiidebar);
  };

  const copy = (e) => {
    alert("copy clicked");
  };

  const del = () => {
    alert("delete clicked");
  };

  // useEffect(()=>{
  //   setTimeout(setMessages(data), 100000)
  //   setLoading(false)

  // }
  // , [])

  useEffect(() => {
    getSummary(id);
  }, [id, messages]);

  useEffect(() => {
    if (!leftSiidebar) {
      mainControls.start("hidden");
      console.log(leftSiidebar);
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
        >
          {id ? (
            messages.map((message, i) => (
              <Message
                style={{ display: "flex", flexDirection: "row" }}
                className="drop_shadow"
                key={i}
                model={message}
              >
                <div as={Message.Footer}>
                  {/* <Avatar onClick={() => copy()} style={{width:'2px',height:'2x'}} src="/SRC/assets/icons/copy-icon.png" /> 
           <Avatar onClick={() => del()} style={{width:'2px',height:'2px'}} src="/SRC/assets/icons/delete-icon.png" />  */}
                </div>
              </Message>
            ))
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
          />
        </MessageList>
      </ChatContainer>

      <AnimatePresence>
        {id ? (
          <motion.div
            variants={{
              visible: { display: "block" },
              hidden: { display: "none" },
            }}
            initial="visible"
            animate={mainControls}
            style={{ overflowY: "scroll" }}
            className={"scrollbar-container cs-sidebar cs-sidebar--right"}
          >
            <SideBarActions
              clicked={toggleLeftSidebar}
              as={"Avatar"}
              src={"/src/assets/icons/cancel-icon.png"}
              title={"side-panel"}
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

// import React from "react";
// import { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";

// import wiki from "wikipedia";
// import axios from "axios";

// //store
// import useErrorStore from "../store/Error";
// import useMessageStore from "../store/Messages";

// //components
// import {
//   ExpansionPanel,
//   ConversationHeader,
//   MessageList,
//   Message,
//   MessageInput,
//   ChatContainer,
//   InfoButton,
//   TypingIndicator,
//   Sidebar,
//   Avatar,
//   Button,
// } from "@chatscope/chat-ui-kit-react";
// import Header from "../components/Header";

// //animation
// import { AnimatePresence, delay, motion, useAnimation } from "framer-motion";

// import data from "../devData/data";
// import { useLocation, useParams } from "react-router-dom";
// import CustomContent from "../components/CustomContent";
// import SideBarActions from "../components/SideBarActions";

// function ChatPage() {
//   var url = "http://127.0.0.1:5000";

//   const customHeaders = { "ngrok-skip-browser-warning": true };

//   const { id } = useParams();

//   const { error, isError, setError, removeError } = useErrorStore((state) => ({
//     error: state.error,
//     isError: state.isError,
//     setError: state.setError,
//     removeError: state.removeError,
//   }));

//   const { messages, addMessage } = useMessageStore((state) => ({
//     messages: state.messages,
//     addMessage: state.addMessage,
//   }));

//   // const [messages, setMessages] = useState([
//   //   {
//   //     message: "Hello, I'm WikiGPT! Ask me anything about this article!",
//   //     sentTime: "just now",
//   //     sender: "WikiGPT",
//   //   },
//   // ]);

//   const [summary, setSummary] = useState("");
//   const [reference, setReference] = useState("");
//   const [media, setMedia] = useState("");
//   const [newMessages, setNewMessage] = useState([]);

//   const [loading, setLoading] = useState(true);

//   const [isTyping, setIsTyping] = useState(false);

//   const [leftSiidebar, setLeftSideBar] = useState(false);

//   const mainControls = useAnimation();

//   const panelControls = useAnimation();

//   const handleSend = async (message) => {
//     const newMessage = {
//       message,
//       direction: "outgoing",
//       sender: "user",
//     };
//     console.log(messages, addMessage);
//     addMessage(id, newMessage);

//     setNewMessage([...messages[id]]);

//     // console.log(message)
//     setIsTyping(true);
//     // await processMessage(newMessages);
//   };

//   async function getSummary(name) {
//     try {
//       let pageObject = {};
//       const page = await wiki.page(name);
//       setSummary((await page.summary()).extract);
//       setMedia((await page.media()).items);

//       var ref = await page.references();
//       const limitedref = [];

//       for (let i = 0; i < Math.min(10, ref.length); i++) {
//         limitedref.push(ref[i]);
//       }

//       const temp = await page.categories();
//       setReference(limitedref);
//       console.log(page, temp);
//     } catch (error) {
//       console.log(error);
//       //=> Typeof wikiError
//     }
//   }

//   // getSummary(id)
//   async function processMessage(newMessages) {
//     console.log(newMessages, "her");
//     // messages is an array of messages

//     axios({
//       method: "get",
//       url: `${url}/article`,
//       headers: customHeaders,
//       params: {
//         query: newMessages[newMessages.length - 1].message,
//         namespace: id,
//       },
//     })
//       .then((response) => {
//         // let sample = `The historical city center refers to the oldest part of a city, typically located within the original walls or fortifications. It is an area that has been inhabited for centuries and has played a significant role in the city's history. The historical city center is often characterized by narrow streets, old buildings, and historic landmarks such as churches, palaces, and monuments.

//         // The historical city center has been shaped by different epochs of the city's long history, with each era leaving its mark on the architecture, culture, and layout of the area. For example, medieval cities often had narrow, winding streets and closely-packed buildings, while Renaissance cities were characterized by grand squares and ornate palaces.

//         // The historical city center is often considered the heart of a city, and it is where many of the city's most important landmarks and cultural institutions are located. It is also an area that is often associated with a city's identity and heritage, and it is a popular destination for tourists who want to experience the city's history and culture.

//         // In many cases, the historical city center has been preserved and restored to maintain its original character, and it is often a place of great beauty and charm. However, it can also be a place of conflict, as modern development and urban planning can sometimes clash with the desire to preserve the city's historical heritage.

//         // Overall, the historical city center is a unique and important part of a city's fabric, and it is a place that offers a glimpse into the city's rich history and cultural heritage.`

//         setTimeout(() => {
//           setNewMessage([
//             ...newMessages,
//             {
//               message: response.data,
//               // message: sample,
//               sendTime: Date.now(),
//               sender: "WikiGPT",
//             },
//           ]);
//         }, 2000);

//         setIsTyping(false);
//       })
//       .catch((error) => {
//         setError({ content: error.message, title: error.name });

//         // setMessages([...newMessages, {
//         //   message: JSON.stringify(error),
//         //   sender: "WikiGPT"
//         // }]);
//         setIsTyping(false);
//         // console.log("Error",error.message, error.code, error.config);
//       });
//   }

//   const toggleLeftSidebar = (e) => {
//     setLeftSideBar(!leftSiidebar);
//   };

//   const copy = (e) => {
//     alert("copy clicked");
//   };

//   const del = () => {
//     alert("delete clicked");
//   };

//   useEffect(() => {
//     console.log(messages, "here", id);
//     setNewMessage(messages[id]);
//     getSummary(id);
//   }, [id, messages]);

//   useEffect(() => {
//     if (!leftSiidebar) {
//       mainControls.start("hidden");
//       // console.log(leftSiidebar)
//     } else {
//       mainControls.start("visible");
//     }
//   }, [leftSiidebar]);

//   return (
//     <>
//       <ChatContainer>
//         {/* header */}
//         <Header as={ConversationHeader} name={id}>
//           <InfoButton
//             onClick={() => setLeftSideBar(!leftSiidebar)}
//             title="Help"
//           />
//         </Header>
//         {/* end of header */}

//         {/* message list */}
//         <MessageList
//           loadingMorePosition="bottom"
//           // loading = {loading}
//           typingIndicator={
//             isTyping ? <TypingIndicator content="WikiGPT is typing" /> : null
//           }
//           scrollBehavior="smooth"
//         >
//           {id ? (
//             newMessages.map((message, i) => (
//               <Message
//                 style={{ display: "flex", flexDirection: "row" }}
//                 className="drop_shadow"
//                 key={i}
//                 model={message}
//               >
//                 <div as={Message.Footer}>
//                   {/* <Avatar onClick={() => copy()} style={{width:'2px',height:'2x'}} src="/SRC/assets/icons/copy-icon.png" />
//            <Avatar onClick={() => del()} style={{width:'2px',height:'2px'}} src="/SRC/assets/icons/delete-icon.png" />  */}
//                 </div>
//               </Message>
//             ))
//           ) : (
//             <MessageList.Content
//               className="custom__content"
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 justifyContent: "center",
//                 height: "100%",
//                 textAlign: "center",
//                 fontSize: "1.2em",
//               }}
//             >
//               <CustomContent />
//             </MessageList.Content>
//           )}
//           <MessageInput
//             className="drop_shadow input__search"
//             onSend={handleSend}
//           />
//         </MessageList>
//       </ChatContainer>

//       <AnimatePresence>
//         {id ? (
//           <motion.div
//             variants={{
//               visible: { display: "block" },
//               hidden: { display: "none" },
//             }}
//             initial="visible"
//             animate={mainControls}
//             style={{ overflowY: "scroll" }}
//             className={"scrollbar-container cs-sidebar cs-sidebar--right"}
//           >
//             <SideBarActions
//               clicked={toggleLeftSidebar}
//               as={"Avatar"}
//               src={"/src/assets/icons/cancel-icon.png"}
//               title={"side-panel"}
//             />

//             <ExpansionPanel
//               style={{ backgroundColor: "#ff7051" }}
//               open
//               title="SUMMARY"
//             >
//               {/* remove transitions if necessary, not working */}
//               {summary ? <p> {summary} </p> : <p>No content</p>}
//             </ExpansionPanel>

//             <ExpansionPanel title="MEDIA">
//               {media ? (
//                 media.map((med, index) => {
//                   {
//                     if (med.srcset) {
//                       return (
//                         <a href={med.srcset[0].src} download target="_blank">
//                           <img
//                             src={med.srcset[0].src}
//                             alt={med.title}
//                             srcset={med.srcset}
//                             width="200"
//                           />
//                         </a>
//                       );
//                     }
//                   }
//                 })
//               ) : (
//                 <p>NO Media</p>
//               )}
//             </ExpansionPanel>

//             <ExpansionPanel title="REFERENCES">
//               <ul>
//                 {reference ? (
//                   reference.map((ref, index) => {
//                     return (
//                       <li>
//                         <a href={ref} target="_blank">
//                           {ref}
//                         </a>
//                       </li>
//                     );
//                   })
//                 ) : (
//                   <p>NO Reference</p>
//                 )}
//               </ul>
//             </ExpansionPanel>

//             {/* <ExpansionPanel title="SECTIONS">
//             </ExpansionPanel>

//             <ExpansionPanel title="OPTIONS">
//             </ExpansionPanel> */}
//           </motion.div>
//         ) : (
//           <></>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }

// export default ChatPage;
