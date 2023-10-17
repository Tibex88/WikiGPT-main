import ExpHist from "./exp_hist";
import useArticleStore from "../store/Article";
import { useLoaderData } from "react-router-dom";

export default function Explore() {
  const { articles, setArticle } = useArticleStore((state) => ({
    articles: state.articles,
    setArticle: state.setArticle,
  }));
  const list = useLoaderData();
  console.log({ list });
  return <ExpHist title="explore" articles={articles} />;
}

export const articleLoader = async () => {
  console.log(1);
  const { articles, setArticle } = useArticleStore((state) => ({
    articles: state.articles,
    setArticle: state.setArticle,
  }));

  const url = "http://127.0.0.1:5000";
  const res = await fetch("http://127.0.0.1:5000/articles");
  return res.json();

};
