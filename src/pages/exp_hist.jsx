import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import wiki from "wikipedia";
import Header from "../components/Header";
import {
  Search,
  Button,
  ConversationList,
  Conversation,
  Avatar,
} from "@chatscope/chat-ui-kit-react";

function ExpHist({ title, articles }) {
  const [searchString, setSearchString] = useState("");
  const [searchedArticle, setSearchedArticle] = useState(articles);

  async function searchArticle(event) {
    if (event.code === "Enter") {
      try {
        const page = await wiki.page(searchString);
        const newArticle = { name: page.title };

        articles.unshift(newArticle);
        // Update state without mutating the original arrays
        setSearchedArticle((prevSearchedArticles) => {
          if (prevSearchedArticles[0] == newArticle) {
            setSearchString("");
            return prevSearchedArticles;
          }

          if (prevSearchedArticles.length == 1) {
            setSearchString("");
            return [...articles];
          }

          return [newArticle, ...prevSearchedArticles];
        });
      } catch (error) {
        setSearchedArticle((prevSearchedArticles) => {
          return [{ name: "No Articles Found With The Name: " + searchString }];
        });
      }
    }
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
              <NavLink to={`/chat/${article.name}`}>
                <Conversation style={{ marginTop: "8px" }} key={index}>
                  <Conversation.Content>{article.name}</Conversation.Content>
                  <Button>
                    <Avatar src="/src/assets/icons/arrow-icon.png" />
                  </Button>
                </Conversation>
              </NavLink>
            );
          })}
        </ConversationList>
      </div>
    </div>
  );
}

export default ExpHist;
