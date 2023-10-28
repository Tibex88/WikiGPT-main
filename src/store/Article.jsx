import { create } from "zustand";
import axios from "axios";
// import articles from '../devData/articles'
// import indexes from '../api/pinecons'
// require('dotenv').config();

var url = process.env.URL;

export async function addArticle(title) {
  let data = new FormData();
  data.append("title", title);
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url:`${url}/new article`,
    headers: {},
    data: data,
  };

  const val = await axios
    .request(config)
    .then((response) => {
      return response.data;
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

const useArticleStore = create((set) => ({
  articles,
  loaidngArticles:false,
  toggleLoading : () => set((state) => ({loaidngArticles:!(state.loaidngArticles) })),

}));



export default useArticleStore;
