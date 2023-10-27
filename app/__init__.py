#flask
from flask_cors import CORS
from flask import Flask, request

#middleware
from middleware.article import desc_index_stats, init_article, answer, del_namespace
from util.relevantlink import scrape_google

app = Flask(__name__)

#allow all origins access
CORS(app, origins=['*'])

# get articles
@app.route("/articles", methods=['GET'])
def get_articles():
  namespaces = desc_index_stats()
  return namespaces

# query article
@app.route("/article", methods=['GET'])
def query_article():
    data = request.args
    query = data['query']
    namespace = data['namespace']
    if not query: return "No query provided"
    if not namespace: return "no namespace provided"
    print("query" ,query)
    print("namespace" ,namespace)
    
    ans = answer(query, namespace)
    links = scrape_google(ans)
    return [ans,links]

# initialize article
@app.route("/new article", methods=['POST'])
def POST_articles():
  title = request.form.get('title')
  namespaces = desc_index_stats()
  if title in namespaces: 
    print("already exists")
    return [True]
  else:
    print(f"Received title: {title}")
    # return True
    is_uploaded = init_article(title)
    if is_uploaded:
      namespaces = desc_index_stats()
      return namespaces
    else:
      return not (is_uploaded)

# delete article
@app.route("/article/<string:article>", methods=['DELETE'])
def del_article(article):
  del_namespace(article)
  namespaces = desc_index_stats()
  return namespaces

# test route
@app.route("/", methods=['GET'])
def test_page():
  return'''<form method="POST" action="/new article">
            <input type="text" name="title" value="article">
            <input type="submit" value="Submit">
            </form>
        '''
