from langchain_community.embeddings import FastEmbedEmbeddings
import time

print("Init FastEmbed...")
start = time.time()
embeddings = FastEmbedEmbeddings(model_name="BAAI/bge-small-en-v1.5") 
print(f"Init done in {time.time() - start:.2f}s")

print("Embedding hello world...")
start = time.time()
res = embeddings.embed_documents(["Hello world"])
print(f"Embed done in {time.time() - start:.2f}s")
print(f"Vector length: {len(res[0])}")
