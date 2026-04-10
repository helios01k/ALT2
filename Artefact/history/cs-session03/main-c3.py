import pandas as pd 
import matplotlib.pyplot as plt 
import numpy 
from pprint import pprint

kaggle_dataset = "Artefact/datasets/kaggle_screentime.csv" # secondary research 
scifest_dataset = "Artefact/datasets/ty_scifest_revised.csv" # primary research

csv = pd.read_csv(kaggle_dataset)

test_count = []

for position, age in enumerate(csv["age"]):
    if age <= 18 and age >= 13:
        age = age
        gender = csv["gender"][position]
        screen_hours = csv["daily_screen_time_hours"][position]
        sleep_hours = csv["sleep_hours"][position]
        social_hours = csv["social_media_hours"][position]
        gaming_hours = csv["gaming_hours"][position]
        work_study_hours = csv["work_study_hours"][position]
        notifs = csv["notifications_per_day"][position]
        addiction_level = csv["addiction_level"][position]

        test_count.append(age)

print(test_count)