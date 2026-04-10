// cors fix for non local server

// plan 
const PLAN = `
# Screen Time & Usage Addiction - Investigation & Plan
**Word Count:**

---

## Introduction

**Question :** Does digital dependency (*addiction*) differ between secondary school students (*aged 14*) and older students (*aged 18*), and do factors such as daily notification count and screen time correlate with higher addiction scores?

**Hypothesis :** Both student groups will show addiction scores that correlate with their notification count and screen time hours, however students in the older age group (*aged 18*) will exhibit significantly higher addiction scores than younger students (*aged 14*).

**Rationale :** Notifications act as a trigger that draws users back to their phone, and higher screen time naturally follows. Both are indicators of addiction. The reason older students (*aged 18*) are expected to score higher on addiction is due to greater personal freedom, fewer parental restrictions, and increased social and academic pressures that drive phone usage.

---

## Research & Evidence
> There is **clickable links** to the reference/source of the datasets & research, hence you will need an internet connection to actually view them.

**Why did we choose this topic? :** There are technologies that are patented specifically to target anyone on staying addicted to their phone. For instance the most common one ([US Patent - US9583142B1](https://patents.google.com/patent/US9583142B1/en)) used by TikTok aims on actively keeping their users on the platform as long as possible. With the rise of technologies like this (*not just from TikTok*) it stands as a good reason to study whether these impacts through simple factors such as screen time usage and notification counts are actually imposing addiction on different age groups.

**Datasets**
- Primary Dataset ([TY Scifest Screen Time Study](https://forms.office.com/Pages/AnalysisPage.aspx?AnalyzerToken=xogOYJ46HWZMSIDheUkJElGRnqyzORiL&id=AOgqoYW4302xGWi-ynfwdQe2JMli0AJHgnLeWgjzuSNUMENSSlo1VzFSQzcwQVhPUExHUUpBNVBaWC4u)) - 250 responses survey that was performed in transition year at our school to study screen time and its effect on addiction and behaviour
- Secondary Dataset ([Smartphone Usage and Addiction Analysis Dataset](https://www.kaggle.com/datasets/zahranusratt/smartphone-usage-and-addiction-analysis-dataset/)) - 7500 response (non-synthethic) survey found on Kaggle that also focuses on screen time and its effects on addiction and behaviour

---

## Team

**Adam Bell :** Main programmer, data analysis and conclusions and assistant report writeup  
**Nathaniel Norton Silva :**  Main report writeup, data analysis and conclusions and researcher  
**Taras Turchyn :**  Main Researcher, assistant programmer and data analysis and conclusions
`;


// design
const DESIGN = `
# Screen Time & Usage Addiction - Design 
**Word Count:**
> Tip: You can click on images to expand them and see them better

---

## Main Flowchart
![flowchart](assets/flowchart_main.png)

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

## Flowchart Analysis (What is the addiction score compute function?
Both datasets follow a different way of concluding whether the user is addicted or not through the **"addiction score compute function"**, where we basically sum up all the data points and convert them into a numerical integer so that both datasets can be on the same level with one another. (*Further reasoning on this will be explained in implementation*)

**Scifest :** In the actual survey we selected 11 behavioural questions (*that are related to addiction*) such as **"How often do you check your phone or device out of habit, even when you are not expecting anything?"**, with responses such as: **Never / Rarely / Sometimes / Often / Always**, we would then map these to integers by setting them equal to, for example: **Never = 0 | Always = 4**. If there is 11 questions and the max points per question is 4, therefor the max possible addiction points is 44. However, we want a scale that is baselined with the main dataset and is also more simple so we normalise the points accordingly through this formula below. 

Where points-u = the total amount of points the user got from the 11 questions  
Where questions = the total amount of questions we check (*11*)  
Where max-p = the total max amount of points PER question you can get (*4*)  
Where max-r = the total max range we want both datasets to be measured in (*7*)  

![latex_formula](assets/latex_scifest_formula.png)

**Kaggle :** This is much more of a simpler one. We just did the same process above where we mapped each response to an integer but however since we only tracked 3 different records the max possible responses was 7, hence not needing for the result to be normalised.
`;

// test
const TESTING = `

# Screen Time & Usage Addiction - Implementation 

**Word Count:**

> Code versions can be found in the codebase. Navigate to: Artefact/history/ (The *.py files not in a cs-session folder are the most recent and actively used ones)

---

## Diary Entries
*Most of these are informal and a way for us to keep track of progress*
 
**CS-SESSION #1 (/cs-session01) - Adam B**     
We didnt really do much to be honest we just got initial code setup alongside the report website working. I decided to use Tailwind (as I plan to use this in the actual project in 6th year - it makes CSS so much easier and is a industry standard thing now) Anyhow, on coding terms what we got done today as a team is basically just ideating the general topic of what we want to study about (screentime) however finding a suitable dataset on kaggle has been quite hard. Due to this issue we started working with a dataset that we as a team decided would be cool to include (my own one from TY), I wasn't 100% with pandas and reading documentation during class would waste time so I resorted to the old school CSV way. One major issue is UTF-8's formatting seen in LINE:51 making me replace unwanted text, thats something I need to be alert about. 

**CS-SESSION #2 (/cs-session02) - Adam B**     
Alright so first of all we finally got a dataset! (Thanks to Nathaniel) and we also got a relevant hypothesis (screen time & addiction - thanks to Taras). I didn't really work much on the scifest python file as a good chunk of it was done but I decided to start working on main.py however it is very like small as I wanted to see how much people within 13-18 age bracket we had. I also taught Nathaniel & Taras how to use MARKDOWN (.md files) as this is like the basis of how the report will work so they can easily write up the report and we can edit it together which I also implemented (pretty cool actually, thought it wouldn't work especially with the school's OIDE internet policy) 

**CS-SESSION #3 (no code was done during CS#3) - Nathaniel & Adam B**      
We found out like just this morning that the dataset we've been using is entirely AI-generated and syntethic. If we were going to combine this with primary data from the scifest we wanted something actually real and not some AI stuff. It was sneaky because it was not mentioned in the description, rather the community posts had actually said its AI generated. 

**CS-SESSION #4 (/cs-session03) - Adam B**     
Although I don't have the source control for this, we went through like 4 other CSV datasets and each time I would do the pre-process stuff like getting the data rows , doing age check, etc. The problem is like they all don't really have a good way of merging so were kinda stuck and its the final week till easter holidays, however the due date is on the 10th so no panic. I think we finally got a working one, however to drift the issues away for a bit I decided to work on scifest.py and just add the notification handler function 

*No logs for /cs-session04*     

**CS-SESSION #6 (/) (most recent files) - Adam B**     
Learning matplotlib genuinely reminds me of turtle because the logic is usually linear and its like where you edit the UI to plot what you want, just like how you would with turtle. Even the code resembles turtle. Anyhow, I've been working with Nathaniel on the report were doing it together. Taras (I forgot to mention that I had invited him to the github repo few weeks back) has been looking at the code and just helping out overall. 

## Decision reasoning (Why did we use Markdown for the report?)
HTML can become very overwhelming when writing the report and as a team we decided to use Markdown as it was basically just raw text but more fancy and we could easily convert it into HTML using a render.js from one of the many packages online out there. We also thought it would be fun to learn as a team and would make adding new changes etc throughout the project much more simpler. (On a side note: Adam also emailed the SEC to confirm that this is allowed in the real LCCS project a few months back and it is allowed alongside with Tailwind CSS)

## Decision reasoning (Why use two datasets?)
We wanted to compare between two different age groups as finding results on a general sample population would be interesting, but however finding whether there is a difference or not between two varying sample populations (differed by the age) would allow us to form more interesting conclusions. 

## Decision reasoning (Why did we use the addiction score compute?)
This was quite genuinely our biggest problem that we had to find a way to deal with. Both datasets were completely different but followed a relevant topic and in theory both of them lead to the same result of concluding whether a user has an addiction or not. From inspiration to how AI models work we decided to convert words into numbers and do some maths. This would allow us to compute a score and easily slot it into matplotlib and make some charts. 

## Decision reasoning (Why did we sample 100 of each dataset?)
We were limited on numbers especially with the primary dataset so in order for us to find a common amount we just did 100 (as 2nd years had the highest response count of 100+), we would select these randomly using python to ensure fairness and that the sample cannot have any bias involved. 

---

## Code previews
Here is some previews of the old code and current code we have, although you cant see all of it due to the large codebase you can view the files manually.

![image](assets/Code_kcrsxStoxR.png)
![image](assets/Code_lBASiyi2HL.png)
![image](assets/Code_VNfu4F9FCq.png)
`;


// evals
const EVAL = `
# Evaluation

*Content coming soon...*
`;


// extra
const EXTRAS = `
# Extra Information

*Content coming soon...*
`;


// mapper
const PAGE_CONTENT = {
    "plan.md": PLAN,
    "design.md": DESIGN,
    "testing.md": TESTING,
    "eval.md": EVAL,
    "extras.md": EXTRAS
};
