// cors fix for non local server

// plan 
const PLAN = `
# Screen Time & Usage Addiction - Investigation & Plan
**Word Count: 335**

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
**Word Count: 696**
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

**Word Count: 1049**

> Code versions can be found in the codebase. Navigate to: Artefact/history/ (The *.py files not in a cs-session folder are the most recent and actively used ones)

---

## Codebase Analysis Report
The codebase follows the exact approach outlined by the LCCS requirements for ALT projects, however although the outline is being followed, there is some further explaining required in order to provide further understanding of the codebase. (*Obviously we will not explain every single file, but give a good enough descripition of the codebase itself*)

\`\`\`k
/root
├── .vscode/                 (local ide settings)
├── Artefact/               (the actual code/project)
│   ├── datasets/           (where csv files are saved)
│   ├── history/            (files used to make everything work)
│   └── main.py             (diagrams - matplotlib)
├── Report/                 (where the report is stored)
│   ├── assets/             (just images)
│   ├── bundles/            (external helper files)
│   ├── pages/              (markdown debugging + live server patch)
│   └── index.html          (main)
├── .gitignore              (git source control)
└── tailwind.config.js      (for tailwind intellisense)
\`\`\`

---

## Decision reasoning (Why did we use Markdown for the report?)
HTML can become very overwhelming when writing the report and as a team we decided to use Markdown as it was basically just raw text but more fancy and we could easily convert it into HTML using a render.js from one of the many packages online out there. We also thought it would be fun to learn as a team and would make adding new changes etc throughout the project much more simpler. (On a side note: Adam also emailed the SEC to confirm that this is allowed in the real LCCS project a few months back and it is allowed alongside with Tailwind CSS)

## Decision reasoning (Why use two datasets?)
We wanted to compare between two different age groups as finding results on a general sample population would be interesting, but however finding whether there is a difference or not between two varying sample populations (differed by the age) would allow us to form more interesting conclusions.

## Decision reasoning (Why did we use the addiction score compute?)
This was quite genuinely our biggest problem that we had to find a way to deal with. Both datasets were completely different but followed a relevant topic and in theory both of them lead to the same result of concluding whether a user has an addiction or not. From inspiration to how AI models work we decided to convert words into numbers and do some maths. This would allow us to compute a score and easily slot it into matplotlib and make some charts.

## Decision reasoning (Why did we sample 100 of each dataset?)
We were limited on numbers especially with the primary dataset so in order for us to find a common amount we just did 100 (as 2nd years had the highest response count of 100+), we would select these randomly using python to ensure fairness and that the sample cannot have any bias involved.

---

## Diary Entries
*Most of these are informal (hence don't expect the best of grammar here) and a way for us to keep track of progress*

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
`;


// evals
const EVAL = `
# Screen Time & Usage Addiction - Evaluation

**Word Count: 1597**

---

## Initial Design for Analysis
Before we actually get to the results we must discuss the graphs that we actually prepared, you can find the source code for these graphs in \`main.py\` (*which is found in Artefact/ and is not in the history folder)*

|  Type | Name | Purpose |
|----------|:--------:|---------:|
| Bar-chart     | Average Comparisons   | To compare the average measured variables between both age groups    |
| Grouped bar-chart     | Mean Addiction Score per notifications     | To compare the mean addiction score between both age groups whilst grouped based on the amount of notifications     |
| Histogram     | Addiction Score Distribution     | To identify the distribution of addiction between both age groups    |
| Grouped bar-chart     | Screen Time Comparison     | To compare the daily screen time between both age groups     |
| CDF Line chart     | Cumulative % by Addiction Score      | To compare how both age groups differ in the addiction score through accumulation     |
| Grouped bar-chart     | Mean Addiction score per screen time band     | To compare the mean addiction score between both age groups whilst grouped based on the amount of screen hours   |

- **Average Comparisons :** This allow us to directly compare the measured variables (*screen hours, daily notifications and addiction score*) between both age groups
- **Mean Addiction Score per notification band :** This allows us to determine whether there is a correlation between addiction (*using the addiction score*) and the amount of daily notifications whilst comparing between both age groups
- **Addiction Score Distribution :** This allows us to determine between both of the age groups where they mainly lie within the addiction score and where they are clustered
- **Screen Time Comparison :** This allows us to (*in a more derived way from average comparisons*) to investigate screen hours side by side between both age groups
- **Cumulative % by Addiction Score :** This allows us to see where each group has the most precentage in the addiction score whilst also showing where they accumulate
- **Mean Addiction score per screen time band :** This allows us to determine whether there is a correlation between addiction (*using the addiction score*) and the amount of screen hours whilst comparing both age groups

## Results
![results](assets/POWERPNT_E6SEPN4NjW.png)

> Just as a reminder: (**Question** **:** Does digital dependency (*addiction*) differ between secondary school students (*aged 14*) and older students (*aged 18*), and do factors such as daily notification count and screen time correlate with higher addiction scores?)
> Just as a reminder:  (**Hypothesis** **:** Both student groups will show addiction scores that correlate with their notification count and screen time hours, however students in the older age group (*aged 18*) will exhibit significantly higher addiction scores than younger students (*aged 14*)).

## Statistical Summary (compute_stats output)
The following was produced by running \`compute_stats()\` in \`main.py\`, which explicitly calculates mean, median, mode, range and standard deviation for both groups across all three measured variables.

## Further Analysis #1 (Average Comparisons)
![results](assets/chart_1_comparison.png)

The first chart is a straightforward side by side comparison of the three main variables we tracked across both age groups. You can clearly see that the 18yr group is higher across the board, which already starts pointing towards the hypothesis being correct.

- The \`14yr\` group averaged around **4 screen hours** per day, while the \`18yr\` group averaged roughly **7.5 hours**, nearly double
- For daily notifications, \`14yr\` averaged around **115** and \`18yr\` around **130**, so not as dramatic a difference but still higher
- The biggest takeaway here is the addiction score. \`14yr\` averaged around **3.3** and \`18yr\` averaged around **4.5** on the 0-7 scale, which is a noticeable gap

## Further Analysis #2 (Mean Addiction Score per Notification Band)
![results](assets/chart_2_notifs_vs_addiction.png)

This chart looks at whether getting more notifications actually links to a higher addiction score, split across both groups. The pattern here is more mixed than expected and is one of the more interesting results.

- At lower notification counts (\`0-50\` and \`50-100\`), the \`18yr\` group scores noticeably higher in addiction than \`14yr\`
- At the \`100-200\` band, the gap is actually the largest, with \`18yr\` around **4.9** vs \`14yr\` at **3.6**
- Interestingly, at \`200-300\` notifications the \`14yr\` group actually scores *slightly higher* than \`18yr\`, which goes against the trend
- The \`300-400\` and \`400+\` bands have no data for \`18yr\`, so we cannot draw conclusions there
- Overall the correlation between notifications and addiction score is *weak* for the \`14yr\` group but more visible for \`18yr\` at lower notification counts

## Further Analysis #3 (Addiction Score Distribution)
![results](assets/chart_3_addiction_dist.png)

This histogram shows where each group is *clustered* in terms of addiction score. It is probably the clearest chart for seeing the difference between the two age groups.

- The \`14yr\` group peaks heavily at score **3**, with most students sitting between **2 and 4**
- The \`18yr\` group has a much more *spread out* distribution, with counts staying relatively high from **4 all the way to 7**
- Almost no \`14yr\` students scored above **5**, whereas a significant chunk of \`18yr\` students scored **5, 6 or 7**
- This confirms that older students are not just slightly more addicted on average, they are pulling the entire distribution towards the higher end of the scale

## Further Analysis #4 (Screen Time Distribution)
![results](assets/chart_4_screentime_dist.png)

This chart compares how screen time hours are distributed between both groups. Rather than just averages, this shows the actual shape of usage.

- The \`14yr\` group is heavily concentrated in the **0-2** and **2-4** hour bands, with **41 students** sitting in the 2-4 range
- Usage drops off sharply for \`14yr\` past 6 hours, with barely anyone in the **8-10** or **10-12** ranges
- The \`18yr\` group is spread much more evenly across all bands from **2-4 hours all the way up to 10-12**
- Around **22 students** in the \`18yr\` group use their phone for **10-12 hours** a day, which for \`14yr\` is essentially zero
- This backs up what we saw in chart 1, older students are not just slightly higher in screen time, a good portion of them are genuinely heavy users

## Further Analysis #5 (Cumulative % by Addiction Score CDF)
![results](assets/chart_5_cumulative_addiction.png)

The CDF chart shows how quickly each group accumulates across the addiction score scale. The further right a curve shifts, the higher the addiction scores in that group.

- The \`14yr\` curve rises very steeply, reaching around **86%** of the group by score **4** and nearly **98%** by score **5**
- The \`18yr\` curve rises much more gradually, only reaching **50%** by score **4** and **76%** by score **5**
- The gap between the two curves is largest in the **score 3 to 5** range, which is where the two groups differ the most
- By score **7** both groups hit 100% as expected, but the \`18yr\` group takes the entire scale to get there
- The large shaded area between both curves is a strong visual indicator of just how different the two distributions are

## Further Analysis #6 (Mean Addiction score per screen time band)
![results](assets/chart_6_screentime_vs_addiction.png)

This final chart asks whether spending more time on your screen actually links to a higher addiction score. For both groups, the answer seems to be *yes*, though with some variation.

- Both groups show a general upward trend in addiction score as screen time increases, which supports the hypothesis that screen time correlates with addiction
- The \`18yr\` group consistently scores higher than \`14yr\` across almost every screen time band
- At **8-10 hours**, both groups are close to each other with both around **4.6 to 5.2**, which suggests that at very high usage levels the gap between age groups shrinks
- The \`14yr\` group at **0-2 hours** still scores around **2.9**, meaning even low screen time students in that group show some level of addiction based on the scoring
- There is no data for \`14yr\` in the **10-12 hour** band, which matches what we saw in chart 4 where almost no younger students use their phone that long

## Hypothesis Statement

> **Hypothesis :** Both student groups will show addiction scores that correlate with their notification count and screen time hours, however students in the older age group (*aged 18*) will exhibit significantly higher addiction scores than younger students (*aged 14*)

The hypothesis is **largely proved**, but with one part that did not hold up as cleanly as we had actually expected.

**What was proved:**

- The \`18yr\` group did score significantly higher in addiction than the \`14yr\` group across every chart that measured it directly. Chart 1 showed the average gap clearly at **3.3 vs 4.5**, and the CDF in chart 5 confirmed this was not just an average thing but a full shift in the distribution
- Screen time does correlate with higher addiction scores for both groups. Chart 6 shows a general upward trend for both \`14yr\` and \`18yr\` as daily screen hours increase, so that part of the hypothesis holds
- The addiction score distribution in chart 3 backed this up further, with \`18yr\` students spreading into the **5, 6 and 7** range while \`14yr\` students mostly stayed below **4**

**What was only partially proved:**

- The notification correlation was *weaker* than expected. Chart 2 showed \`18yr\` scoring higher in the lower notification bands but at **200-300** notifications the \`14yr\` group actually overtook them, which was unexpected. So notifications do not have a clean upward correlation with addiction score the same way screen time does

**Overall conclusion:**

The data does support the hypothesis that older students show higher addiction scores, and screen time does correlate with addiction for both groups. The notification side of the hypothesis is the weakest link since the relationship there is inconsistent. If we were to rewrite the hypothesis based on what we found, we would probably focus more on screen time as the stronger indicator and treat notifications as a secondary or weaker factor.

## Does your code help you answer the hypothesis?
Yes, the code directly helps answer the hypothesis, the 6 charts produced by \`main.py\` visualise the data and the numbers in a way that makes the differences between the two age groups easy to read and draw conclusions from. Without the code we would have no way of processing the raw data from two completely different datasets into something comparable, and without the charts we would have no way of seeing the trends clearly.

## What improvements or changes would you make if you had to do the project again?
We think one of the biggest changes we would want to do is find a dataset that actually matches, we were kind of put in a rush because we were delayed in finding a dataset (due to the issues we had talked about). Another major issue was planning as even though we were coding we still had no clue on what we really wanted to measure so it did bite a good bit of ideating and going back and fourth to figure out what to measure etc.

## What learing will you take forward into your next ALT?
As a group we think time management is probably one of the most important things, as time can fly really fast and we need to be organised and have good time management so that we can perform well during the ALT projects instead of being rushed, however this can only happen through good communication, organisation, planning etc. Which is probably something we will all take forward in the next ALT and other real life projects.
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
