from langchain.text_splitter import RecursiveCharacterTextSplitter


# text splitter
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size = 100,           # Usually chunk sizes are much larger than this
    chunk_overlap  = 20,        # Overlap is needed incase the text is split in odd places
    length_function = len,
)