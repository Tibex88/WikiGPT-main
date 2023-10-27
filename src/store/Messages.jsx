import { create } from "zustand";
import axios from "axios";
import { fetchArticles } from "./Article";

let articles = await fetchArticles();

var messages = {};

if (articles){
  for (let n of articles) {
    messages[n.name] = [
      {
        message: ["Hello, I'm WikiGPT! Ask me anything about this article!", []],
        sentTime: "just now",
        sender: "WikiGPT",
      },
    ];
  }
}

export function addMessage(articlename, message) {
  if (!messages.hasOwnProperty(articlename)) {
    messages[articlename] = [
      {
        message: [
          "Hello, I'm WikiGPT! Ask me anything about this article!",
          [],
        ],
        sentTime: "just now",
        sender: "WikiGPT",
      },
    ];
    return;
  }
  if (message == "first") return;
  messages[articlename].push(message);
}

const useMessageStore = create((set) => ({
  messages,
  addMessage: (articlename, message) =>
    set((state) => {
      if (!state.messages.hasOwnProperty(articlename)) {
        state.messages[articlename] = [
          {
            message: [
              "Hello, I'm WikiGPT! Ask me anything about this article!",
              ,
              [],
            ],
            sentTime: "just now",
            sender: "WikiGPT",
          },
        ];
        return;
      }
      if (message == "first") return;
      state.messages[articlename].push(message);
    }),
}));

export default useMessageStore;
