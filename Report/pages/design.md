# Screen Time & Usage Addiction - Design 
**Word Count: 696**

## Main Flowchart
![flowchart](assets/flowchart_main.png)
> Tip: You can click on images to expand them and see them better

## Flowchart Analysis (What are we actually doing?)
We are getting two data sources (*both primary and secondary researched datasets - one from the internet and a primary one done by Adam B*), and we are only taking out the important information that we need from both datasets so that we can then merge them together into one dataset. However a main problem with this is the fact some data entries are not the same with one another, hence we have to essentially **"pre-process"** or **"clean"** them before they can merge together. (*otherwise, the data would be all messy and mixed up*)

## Flowchart Analysis (What is defined as an edge case?)
In the primary dataset (*scifest*), we are given information that is mainly in a string format and hence we need to convert this to a float, integer or some usable format that is on the same level as the secondary dataset (*kaggle*). However sometimes we can get edge cases *(where the entry is invalid, or is not expected, or we just don't know what to do with it*), so we handle these cases accordingly so that we dont get null or "None" entries on the merged dataset. 

A few examples of this edge case can be found on this table below here: 

| Type | Edge case | Outcome |
|----------|:--------:|---------:|
| Missing Data     | Missing   | Return Error on IDE    |
| Unexpected Data     | "I don't know"     | 0     |

**Unexpected data :** When working with the primary dataset, the multichoice questions also included the choice of "I don't know" or "Prefer not to say" and putting this into the merged dataset would make it not usable. To counteract this, we just accounted for these edgecases and responded accordingly (*seen in outcome on the table above*)

## Flowchart Analysis (What is the student object?)
As we mentioned previously, we are only looking for what we need within the two datasets. We would define a list in both code files as **"students"** and would create a dictionary for each student including the relevant information, with these two lists (*from scifest & kaggle*) we would then just merge them together into a working CSV file through pandas.

The actual specification sheet (*specs*) for the student object is this: 
\`\`\`python
students : list[dict] = []

# student object which would be appended into students
student_object : dict = {
    "age" : int,
    "gender" : str,
    "screen_hours" : float, 
    "notifs" : int, 
    "addiction_score" : int,
    "source" : str
}
\`\`\`

By looking at the specifications you can cross-check with the flowchart and see what we do behind the scenes to define each of the data entries within the student_object (*which we'll discuss the main one, the addiction score compute next*)

## Flowchart Analysis (What is the addiction score compute function?)
Both datasets follow a different way of concluding whether the user is addicted or not through the **"addiction score compute function"**, where we basically sum up all the data points and convert them into a numerical integer so that both datasets can be on the same level with one another. (*Further reasoning on this will be explained in implementation*)

**Scifest :** In the actual survey we selected 11 behavioural questions (*that are related to addiction*) such as **"How often do you check your phone or device out of habit, even when you are not expecting anything?"**, with responses such as: **Never / Rarely / Sometimes / Often / Always**, we would then map these to integers by setting them equal to, for example: **Never = 0 | Always = 4**. If there is 11 questions and the max points per question is 4, therefor the max possible addiction points is 44. However, we want a scale that is baselined with the main dataset and is also more simple so we normalise the points accordingly through this formula below. 

Where points-u = the total amount of points the user got from the 11 questions  
Where questions = the total amount of questions we check (*11*)  
Where max-p = the total max amount of points PER question you can get (*4*)  
Where max-r = the total max range we want both datasets to be measured in (*7*)  

![latex_formula](assets/latex_scifest_formula.png)

**Kaggle :** This is much more of a simpler one. We just did the same process above where we mapped each response to an integer but however since we only tracked 3 different records the max possible responses was 7, hence not needing for the result to be normalised.