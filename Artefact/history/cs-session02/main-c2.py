import pandas as pd 
import matplotlib.pyplot as plt 
import numpy 
from pprint import pprint

kaggle_dataset = "Artefact/datasets/mh_screentime_kaggle.csv" # secondary research 
scifest_dataset = "Artefact/datasets/ty_scifest_revised.csv" # primary research

csv = pd.read_csv(kaggle_dataset)

def mins_to_hour(mins : int) -> float: 
    print(round(mins / 60, ndigits=1))

test = [] # just to count how many under 18s there is

for position, age in enumerate(csv["age"]):
    # ignoring older responses
    if age <= 18 and age >= 13: 
        
        age = age 
        gender = csv["gender"][position]
        phone_hours = mins_to_hour(csv["daily_screen_time_min"][position])
        


print(len(test))