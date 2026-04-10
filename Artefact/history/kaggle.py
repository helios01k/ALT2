import pandas as pd
from pprint import pprint

kaggle_dataset = "Artefact/datasets/kaggle_screentime.csv"

STRESS_MAP = {"Low": 1, "Medium": 2, "High": 3}
ADDICTION_MAP = {"None": 0, "Mild": 1, "Moderate": 2, "Severe": 3}

def compute_addiction_score(stress: str, academic_impact: str, addiction: str) -> int:
    # stress:           1-3
    # academic_impact   0-1
    # addiction_level   0-3
    # total:            0-7 (max on both scales should be set at like 7 only on both primary/second)
    # 2nd arg -> default 0 on .get
    stress = STRESS_MAP.get(stress, 0)
    academic = 1 if academic_impact == "Yes" else 0
    addiction = ADDICTION_MAP.get(addiction, 0)
    return stress + academic + addiction

csv = pd.read_csv(kaggle_dataset)

users = []

for position, age in enumerate(csv["age"]):
    # dataset actually only has the youngest age group of 18 but ill still keep ts logic here
    if 13 <= age <= 18:
        users.append({
            "age": int(age),
            "gender": csv["gender"][position].strip(),
            "screen_hours": csv["daily_screen_time_hours"][position],
            "notifs": csv["notifications_per_day"][position],
            "addiction_score": compute_addiction_score(
                csv["stress_level"][position],
                csv["academic_work_impact"][position],
                csv["addiction_level"][position],
            ),
            "source": "kaggle"
        })