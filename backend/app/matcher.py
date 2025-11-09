# matcher.py

# Example skill set for matching
JOB_SKILLS = [
    "Python", "Java", "C++", "Machine Learning", "Deep Learning",
    "Data Analysis", "SQL", "AI", "NLP", "React", "FastAPI"
]

def match_skills(extracted_skills):
    """
    Match extracted skills from resume with predefined job skills.
    Returns matched skills and percentage score.
    """
    matched = [skill for skill in extracted_skills if skill in JOB_SKILLS]
    
    # Simple match score calculation
    score = 0
    if JOB_SKILLS:
        score = round((len(matched) / len(JOB_SKILLS)) * 100, 2)
    
    return {"matched_skills": matched, "match_score": score}
