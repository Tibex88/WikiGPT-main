import together

#api
from app.api.wikipedia_api import get_wikipedia_article
from app.api.together_api import model_name, llm

#utils
from app.util.text_splitter import text_splitter
from app.util.embed import embed

#db
from app.db.pinecone import pinecone_index,upsert_to_db, get_data_from_db

#prompt
from app.util.prompt_manip import get_prompt,format_prompt,format_response


def init_article(title):
    # check if no title is present
     article = get_wikipedia_article(title)
     text = text_splitter.split_text(article)
     embeddings = embed(text)
     is_uploaded = upsert_to_db(text, embeddings,namespace=title)
     if is_uploaded: return is_uploaded
     else: return is_uploaded

def desc_index_stats():
  stats = pinecone_index.describe_index_stats()
  nm = stats.namespaces
  return list(nm)

def del_namespace(namespace=None):
  pinecone_index.delete( delete_all=True, namespace=namespace)

# Define a function that runs the model
def answer(query,namespace=''):
    context = get_data_from_db(query,namespace)

    prompt = format_prompt(query, context)
    
    prompt_template = get_prompt(prompt)
    
    # together.Models.start(model_name)
    
    output = llm(prompt_template)
    
    # together.Models.stop(model_name)
    
    return output

# # list_indexes()
# del_namespace()
# desc_index_stats()

