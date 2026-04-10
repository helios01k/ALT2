# Screen Time & Usage Addiction - Implementation 

**Word Count: 1049**

> Code versions can be found in the codebase. Navigate to: Artefact/history/ (The *.py files not in a cs-session folder are the most recent and actively used ones)

---

## Codebase Analysis Report
The codebase follows the exact approach outlined by the LCCS requirements for ALT projects, however although the outline is being followed, there is some further explaining required in order to provide further understanding of the codebase. (*Obviously we will not explain every single file, but give a good enough descripition of the codebase itself*)

```k
/root
├── .vscode/                (local ide settings)
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
```

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
