import ExpHist from "./exp_hist";
import useArticleStore from "../store/Article";
import { useLoaderData } from "react-router-dom";

export default function Explore() {
  const {articles, setArticle} = useArticleStore((state)=>({articles: state.articles, setArticle: state.setArticle}))
  const list = useLoaderData()
  console.log({list})
  return (
    <ExpHist title='explore'/>
  )
}

export const articleLoader = async () => {
  console.log(1)
  const {articles, setArticle} = useArticleStore((state)=>({articles: state.articles, setArticle: state.setArticle}))

  const url = "http://127.0.0.1:5000"
  const res = await fetch("http://127.0.0.1:5000/articles")
  return res.json()
  // var config = {
  //   method: 'GET',
  //   url: `http://127.0.0.1:5000/articles`,
  //   // headers: { }
  // };

  // axios(config)
  // .then(function (response) {
  // console.log(data);
  // data = JSON.stringify(data.data);
  // setArticle(data)
  // return data
  // })
  // .catch(function (error) {
  //   console.log(error);
  // });

}