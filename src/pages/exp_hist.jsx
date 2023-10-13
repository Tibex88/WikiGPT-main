import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import wiki from "wikipedia";
import Header from "../components/Header";
import {
  Search,
  Button,
  ConversationList,
  Conversation,
  Avatar,
} from "@chatscope/chat-ui-kit-react";
import useArticleStore from "../store/Article";

function ExpHist({ title }) {
  const { articles, setArticle } = useArticleStore((state) => ({
    articles: state.articles,
    setArticle: state.setArticle,
  }));

  const [searchString, setSearchString] = useState("");
  const [searchedArticle, setSearchedArticle] = useState([]);

  const navigate = useNavigate();

  async function searchArticle(event) {
    if (event.code === "Enter") {
      try {
        const page = await wiki.search(searchString);
        setSearchedArticle(page.results);
      } catch (error) {
        setSearchedArticle((prevSearchedArticles) => {
          return [{ name: "No Articles Found With The Name: " + searchString }];
        });
      }
    }
  }

  async function intialize(event) {
    console.log("object", articles);
    const title = event.target.innerText;
    // articles.push({ title, active: false });
    setArticle(title);
    console.log("about to go");
    navigate("/chat/" + title);
  }

  return (
    <div className="page">
      <Header name={title} />
      <div className="page__wrapper">
        <Search
          className="input__search"
          placeholder="Search"
          onChange={(str) => setSearchString(str)}
          onKeyDown={searchArticle}
        />

        <ConversationList className="list">
          {searchedArticle.map((article, index) => {
            return (
              <Conversation
                onClick={(event) => {
                  intialize(event);
                }}
                style={{ marginTop: "8px" }}
                key={index}
              >
                <Conversation.Content>{article.title}</Conversation.Content>
                <Button>
                  <Avatar src="/src/assets/icons/arrow-icon.png" />
                </Button>
              </Conversation>
            );
          })}
        </ConversationList>
      </div>
    </div>
  );
}

export default ExpHist;
