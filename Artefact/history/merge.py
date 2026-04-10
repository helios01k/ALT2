import pandas as pd

from scifest import students  # 2nd years (14) - primary
from kaggle import users      # 18yr olds - secondary

SAMPLE_SIZE = 100

scifest_df = pd.DataFrame(students).rename(columns={"phone_hours": "screen_hours"})
kaggle_df  = pd.DataFrame(users)

merged = pd.concat([
    scifest_df.sample(SAMPLE_SIZE),
    kaggle_df.sample(SAMPLE_SIZE),
])

merged = merged[["age", "gender", "screen_hours", "notifs", "addiction_score", "source"]]
merged.to_csv("Artefact/datasets/merge_dataset.csv", index=False)

csv = pd.read_csv("Artefact/datasets/merge_dataset.csv")

print(csv)