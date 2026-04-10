import csv # migrate from pandas, as pandas isnt useful for usecase 
from pprint import pprint

LIKERT_QUESTIONS = [
    "How frequently do you find it hard to stop using your device when needed?",
    "How often do you check your phone or device out of habit, even when you are not expecting anything?",
    "How often do you use your phone during group activities or social events?",
    "How often do you feel the need to check your phone immediately after receiving a notification?",
    "How often do you use your phone as a distraction during moments of boredom or waiting?",
    "How often do you find yourself multitasking with your phone",
    "How often do you feel frustrated or anxious if you cannot check your phone for an extended period?",
    "In the past month, how often has your screen time made you feel worse about yourself?",
    "How often do you use your phone as a way to escape from negative emotions",
    "How often do you feel guilty about spending too much time on your phone?",
    "How often do you feel a sense of loneliness despite frequent digital interactions?",
]

LIKERT_MAP = {
    "Never": 0,
    "Rarely": 1,
    "Sometimes": 2,
    "Often": 3,
    "Always": 4,
}

MAX_LIKERT_SCORE = len(LIKERT_QUESTIONS) * 4  # (11 x 4) = 44

def gender_check(gender: str) -> str:
    if gender == "Prefer not to say":
        return "Other"
    return gender.strip()

def hour_to_float(hour: str) -> float:
    match hour.strip():
        case "Less than 1 hour": return 1.0
        case "1-2 hours": return 1.5
        case "3-4 hours": return 3.5
        case "5-6 hours": return 5.5
        case "7-8 hours": return 7.5
        case "9-10 hours": return 9.5
        case "More than 10 hours": return 10.0
        case "I don't use any other device": return 0.0
        case _:
            print(f"missing hour -> {hour}")
            return None

# no longer being used
def year_to_age(year: str) -> int:
    match year.strip():
        case "1st Year": return 13
        case "2nd Year": return 14
        case "3rd Year": return 15
        case "4th Year (Transition Year)": return 16
        case "5th Year": return 17
        case "6th Year (incl: LCVP)": return 18
        case _: return None

def notifs_to_int(notif: str) -> int:
    match notif.strip():
        # had to fix this because of excel exports, reminder to never microsoft for data collection (view c3 version for detail)
        case "Less than 50 notifications" | "Less than 50notifications": return 25
        case "50-100 notifications" | "50-100notifications": return 75
        case "101-200 notifications" | "101-200notifications": return 150
        case "201-300 notifications" | "201-300notifications": return 250
        case "301-400 notifications" | "301-400notifications": return 350
        case "More than 400 notifications": return 400
        case "I don't know": return 0
        case _:
            print(f"missing notif -> {notif}")
            return None

def compute_addiction_score(row: list, likert_cols: list) -> int:
    total = sum(LIKERT_MAP[row[i]] for i in likert_cols if row[i] in LIKERT_MAP)
    if total == 0:
        return None # everyone set to never
    # as mentioned in kaggle, max is set to 7 only in score
    return round((total / MAX_LIKERT_SCORE) * 7)

students = []

# utf-8 issue fixed from similiar porblem found on stackoverflow (microsoft thing)
with open("Artefact/datasets/ty_scifest_screentime.csv", "r", encoding="utf-8-sig") as f:
    reader = csv.reader(f) # wrap
    headers = next(reader) # r2 start

    likert_cols = [
        col_index for col_index, col_name in enumerate(headers)
        if any(question.lower() in col_name.lower() for question in LIKERT_QUESTIONS)
    ]

    for row in reader:
        row = [cell.replace("\xa0", "").strip() for cell in row] # weird encoding fix for \xa0

        if row[2] != "2nd Year":
            continue

        students.append({
            "age": 14,
            "gender": gender_check(row[1]),
            "phone_hours": hour_to_float(row[5]),
            "notifs": notifs_to_int(row[12]),
            "addiction_score": compute_addiction_score(row, likert_cols),
            "source": "scifest"
        })


pprint(students)