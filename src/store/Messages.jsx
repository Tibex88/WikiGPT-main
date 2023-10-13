import { create } from "zustand";
import axios from "axios";

// import articles from '../devData/articles'
// import indexes from '../api/pinecons'
// require('dotenv').config();

let articles = [
  { name: "USS Marmora (1862)", active: false },
  { name: "Machine learning", active: false },
  { name: "Quantum computing", active: true },
  { name: "Blockchain", active: false },
  { name: "Space exploration", active: false },
  { name: "Renewable energy", active: false },
  { name: "Climate change mitigation", active: false },
  { name: "History of Rome", active: false },
  { name: "Interstate 90", active: false },
  { name: "Space exploration", active: false },
];

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
      if (!state.messages.hasOwnProperty(articlename))
        state.messages[articlename] = []
        state.messages[articlename].push({
          message: "Hello, I'm WikiGPT! Ask me anything about this article!",
          sentTime: "just now",
          sender: "WikiGPT",
        });

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
