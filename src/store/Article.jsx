import { create } from "zustand";
import axios from "axios";
// import articles from '../devData/articles'
// import indexes from '../api/pinecons'
// require('dotenv').config();

export async function addArticle(title) {
  let data = new FormData();
  data.append("title", title);
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://127.0.0.1:5000//new article",
    headers: {},
    data: data,
  };

  const val = await axios
    .request(config)
    .then((response) => {
      return response.data;
      // console.log("done");
    })
    .catch((error) => {
      console.log(error);
    });

    return val;
}



export async function fetchArticles() {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "http://127.0.0.1:5000//articles",
    headers: {},
  };

  let val = await axios
    .request(config)
    .then((response) => {
      let article = [];
      for (let i = 0; i < response.data.length; i++) {
        const name = response.data[i];
        article.push({  name, active: false });
      }

      return article;
    })
    .catch((error) => {
      console.log(error);
    });
  console.log(val, 'val her');
  return val;

  // return [];
}

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

articles = await fetchArticles()
console.log(articles, 'art');


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
const useArticleStore = create((set) => ({
  articles,
  
  // setArticle : (title) => set((state) => ({articles:title })),
  // toggleArticle: (idx) => set((state) => (
  // {
  //   articles:
  // state.articles.map((article, index) => {
  //   if (idx === index) {
  // console.log(state.articles)
  //   return article.active:true ;
  // } else {
  //   return  article.active = false ;
  // }
  // })
  // }
  // ))
}));



export default useArticleStore;
