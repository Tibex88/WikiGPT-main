import pinecone
from app.util.embed import embed_model, dimension

# create the index if it does not exist already
index_name = 'wiki'

# initialize connection to pinecone
pinecone.init(
    api_key= 'f0048841-1886-4d17-bffd-a5fe39c183a9',
    environment= 'asia-southeast1-gcp-free'
)

# connect to the index
pinecone_index = pinecone.Index(index_name)

def create_index():
  if index_name not in pinecone.list_indexes():
      pinecone.create_index(
          index_name,
          dimension=len(dimension),
          metric='cosine'
      )

def upsert_to_db(text, embeddings, namespace=None):
  if namespace == None:
    print('Cant update, there is no namespace value,namespace value is ',namespace)
    return False
  else:
    print("namespace",namespace)
    docs = []
    for idx, i in enumerate(text):
      docs.append((
            str(idx),
            embeddings[idx],
            {'text': i},
        ))
    pinecone_index.upsert(namespace=namespace,vectors = docs,batch_size=100, show_progress = True)
    return True
  
def get_data_from_db(query,namespace):
    embedded_query = embed_model.get_text_embedding(query)
    result = pinecone_index.query(embedded_query, top_k=20, namespace=namespace, includeMetadata=True)
    matches = []
    for i in result['matches']:
      if (i['score'] > 0.6):
        print(i.metadata['text'])
        matches.append(i.metadata['text'])
    return str(matches)
