import { create } from "zustand";
import axios from "axios";
import { fetchArticles } from "./Article";

// import articles from '../devData/articles'
// import indexes from '../api/pinecons'
// require('dotenv').config();

let articles = await fetchArticles();

var messages = {};

for (let n of articles) {
  messages[n.name] = [
    {
      message: "Hello, I'm WikiGPT! Ask me anything about this article!",
      sentTime: "just now",
      sender: "WikiGPT",
    },
  ];
}


export function addMessage(articlename, message) {
  if (!messages.hasOwnProperty(articlename)) {
    messages[articlename] = [
      {
        message: "Hello, I'm WikiGPT! Ask me anything about this article!",
        sentTime: "just now",
        sender: "WikiGPT",
      },
    ];
    return;
  }
  if (message == "first") return;
  messages[articlename].push(message);
}

// const url = "http://127.0.0.1:5000"

// var config = {
//   method: 'get',
//   url: `${url}/articles`,
//   // headers: { }
// };

// axios(config)
// .then(function (response) {
//   data = JSON.stringify(response.data);
//   console.log(JSON.stringify(response.data));
//   articles = data
// })
// .catch(function (error) {
//   console.log(error);
// });

// articles.append(indexes)
const useMessageStore = create((set) => ({
  messages,
  addMessage: (articlename, message) =>
    set((state) => {
      if (!state.messages.hasOwnProperty(articlename)) {
        state.messages[articlename] = [
          {
            message: "Hello, I'm WikiGPT! Ask me anything about this article!",
            sentTime: "just now",
            sender: "WikiGPT",
          },
        ];
        return;
      }
      if (message == "first") return;
      state.messages[articlename].push(message);
    }),
  //   setMessage : (title) => set((state) => ({articles:title })),
  //   toggleArticle: (idx) => set((state) => (
  //   {
  //     articles:
  //   state.articles.map((article, index) => {
  //     if (idx === index) {
  //   console.log(state.articles)
  //     return article.active:true ;
  //   } else {
  //     return  article.active = false ;
  //   }
  //   })
  //   }
  //   ))
}));

export default useMessageStore;
