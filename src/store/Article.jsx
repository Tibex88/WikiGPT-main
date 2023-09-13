import { create } from 'zustand'
// import articles from '../devData/articles'
// import indexes from '../api/pinecons'

var articles = [  

  {"name": "Artificial intelligence",
  "active":false
},
  {"name": "Machine learning",
  "active":false
},
  {"name": "Quantum computing",
  "active":true
},
  {"name": "Blockchain technology",
  "active":false
},
  {"name": "Space exploration",
  "active":false
},
  {"name": "Renewable energy sources",
  "active":false
},
  {"name": "Climate change mitigation",
  "active":false
},
  {"name": "History of ancient Rome",
  "active":false
},
  {"name": "Leonardo da Vinci",
  "active":false
},
  {"name": "Charles Darwin",
  "active":false
},
]


// articles.append(indexes)
const useArticleStore = create((set) => ({
  articles,
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
  }))

export default useArticleStore