from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from app.resume_processor import process_resume  # import your processor

app = FastAPI(title="AI Resume Screening System")

# Allow CORS so frontend can communicate
origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "AI Resume Screening API Running"}

@app.post("/upload_resume/")
async def upload_resume(file: UploadFile = File(...)):
    """
    Upload a PDF resume and return:
    - Extracted skills
    - Score
    - Matched skills and match score
    """
    result = await process_resume(file)
    return {"result": result}
