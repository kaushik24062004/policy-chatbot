from fastapi import FastAPI, Request
from pydantic import BaseModel
from transformers import pipeline
import fitz  # PyMuPDF for PDF processing

app = FastAPI()

# Initialize the question-answering model
qa_pipeline = pipeline("question-answering")

class QARequest(BaseModel):
    question: str
    document: str

@app.post("/api/qa")
async def qa(request: QARequest):
    result = qa_pipeline(question=request.question, context=request.document)
    return {"answer": result['answer']}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5001)
