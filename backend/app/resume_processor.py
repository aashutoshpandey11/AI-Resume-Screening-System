import pdfplumber
import spacy
from fastapi import UploadFile
from app.matcher import match_skills

nlp = spacy.load("en_core_web_sm")

async def process_resume(file: UploadFile):
    """
    Extract text from uploaded PDF, analyze skills, and match them.
    """
    content = ""
    with pdfplumber.open(file.file) as pdf:
        for page in pdf.pages:
            text = page.extract_text()
            if text:
                content += text + "\n"

    doc = nlp(content)
    extracted_skills = [ent.text for ent in doc.ents if ent.label_ in ["ORG", "SKILL", "PERSON"]]

    # Use matcher to compare with job skills
    match_result = match_skills(extracted_skills)

    return {
        "extracted_skills": extracted_skills,
        "score": min(len(extracted_skills) * 10, 100),
        "match_result": match_result
    }
