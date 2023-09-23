from langchain.embeddings import HuggingFaceEmbeddings
from llama_index import LangchainEmbedding


# embedding
embed_model = LangchainEmbedding(
  HuggingFaceEmbeddings(model_name="sentence-transformers/all-mpnet-base-v2")
)

dimension = embed_model.get_text_embedding("hello")

def embed(text):
    embeddings = []
    for i in text:
      section_embedding = embed_model.get_text_embedding(i)
      embeddings.append(section_embedding)
    return embeddings