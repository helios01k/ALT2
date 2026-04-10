# Screen Time & Usage Addiction - Evaluation 

**Word Count: 1597**

---

## Initial Design for Analysis
Before we actually get to the results we must discuss the graphs that we actually prepared, you can find the source code for these graphs in `main.py` (*which is found in Artefact/ and is not in the history folder)*

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
The following was produced by running `compute_stats()` in `main.py`, which explicitly calculates mean, median, mode, range and standard deviation for both groups across all three measured variables.

```
--- 14yr (scifest) ---
  screen_hours:
    Mean:    4.04
    Median:  3.50
    Mode:    3.50
    Range:   9.00
    Std Dev: 2.29
  notifs:
    Mean:    115.25
    Median:  75.00
    Mode:    25.00
    Range:   400.00
    Std Dev: 118.59
  addiction_score:
    Mean:    3.41
    Median:  3.00
    Mode:    3.00
    Range:   5.00
    Std Dev: 1.04

--- 18yr (kaggle) ---
  screen_hours:
    Mean:    7.38
    Median:  7.29
    Mode:    3.06
    Range:   8.88
    Std Dev: 2.67
  notifs:
    Mean:    131.97
    Median:  129.50
    Mode:    28.00
    Range:   227.00
    Std Dev: 70.04
  addiction_score:
    Mean:    4.44
    Median:  4.50
    Mode:    4.00
    Range:   6.00
    Std Dev: 1.34
```

## Further Analysis #1 (Average Comparisons)
![results](assets/chart_1_comparison.png)

The first chart is a straightforward side by side comparison of the three main variables we tracked across both age groups. You can clearly see that the 18yr group is higher across the board, which already starts pointing towards the hypothesis being correct.

- The `14yr` group averaged around **4 screen hours** per day, while the `18yr` group averaged roughly **7.5 hours**, nearly double
- For daily notifications, `14yr` averaged around **115** and `18yr` around **130**, so not as dramatic a difference but still higher
- The biggest takeaway here is the addiction score. `14yr` averaged around **3.3** and `18yr` averaged around **4.5** on the 0-7 scale, which is a noticeable gap

## Further Analysis #2 (Mean Addiction Score per Notification Band)
![results](assets/chart_2_notifs_vs_addiction.png)

This chart looks at whether getting more notifications actually links to a higher addiction score, split across both groups. The pattern here is more mixed than expected and is one of the more interesting results.

- At lower notification counts (`0-50` and `50-100`), the `18yr` group scores noticeably higher in addiction than `14yr`
- At the `100-200` band, the gap is actually the largest, with `18yr` around **4.9** vs `14yr` at **3.6**
- Interestingly, at `200-300` notifications the `14yr` group actually scores *slightly higher* than `18yr`, which goes against the trend
- The `300-400` and `400+` bands have no data for `18yr`, so we cannot draw conclusions there
- Overall the correlation between notifications and addiction score is *weak* for the `14yr` group but more visible for `18yr` at lower notification counts

## Further Analysis #3 (Addiction Score Distribution)
![results](assets/chart_3_addiction_dist.png)

This histogram shows where each group is *clustered* in terms of addiction score. It is probably the clearest chart for seeing the difference between the two age groups.

- The `14yr` group peaks heavily at score **3**, with most students sitting between **2 and 4**
- The `18yr` group has a much more *spread out* distribution, with counts staying relatively high from **4 all the way to 7**
- Almost no `14yr` students scored above **5**, whereas a significant chunk of `18yr` students scored **5, 6 or 7**
- This confirms that older students are not just slightly more addicted on average, they are pulling the entire distribution towards the higher end of the scale

## Further Analysis #4 (Screen Time Distribution)
![results](assets/chart_4_screentime_dist.png)

This chart compares how screen time hours are distributed between both groups. Rather than just averages, this shows the actual shape of usage.

- The `14yr` group is heavily concentrated in the **0-2** and **2-4** hour bands, with **41 students** sitting in the 2-4 range
- Usage drops off sharply for `14yr` past 6 hours, with barely anyone in the **8-10** or **10-12** ranges
- The `18yr` group is spread much more evenly across all bands from **2-4 hours all the way up to 10-12**
- Around **22 students** in the `18yr` group use their phone for **10-12 hours** a day, which for `14yr` is essentially zero
- This backs up what we saw in chart 1, older students are not just slightly higher in screen time, a good portion of them are genuinely heavy users

## Further Analysis #5 (Cumulative % by Addiction Score CDF)
![results](assets/chart_5_cumulative_addiction.png)

The CDF chart shows how quickly each group accumulates across the addiction score scale. The further right a curve shifts, the higher the addiction scores in that group.

- The `14yr` curve rises very steeply, reaching around **86%** of the group by score **4** and nearly **98%** by score **5**
- The `18yr` curve rises much more gradually, only reaching **50%** by score **4** and **76%** by score **5**
- The gap between the two curves is largest in the **score 3 to 5** range, which is where the two groups differ the most
- By score **7** both groups hit 100% as expected, but the `18yr` group takes the entire scale to get there
- The large shaded area between both curves is a strong visual indicator of just how different the two distributions are

## Further Analysis #6 (Mean Addiction score per screen time band)
![results](assets/chart_6_screentime_vs_addiction.png)

This final chart asks whether spending more time on your screen actually links to a higher addiction score. For both groups, the answer seems to be *yes*, though with some variation.

- Both groups show a general upward trend in addiction score as screen time increases, which supports the hypothesis that screen time correlates with addiction
- The `18yr` group consistently scores higher than `14yr` across almost every screen time band
- At **8-10 hours**, both groups are close to each other with both around **4.6 to 5.2**, which suggests that at very high usage levels the gap between age groups shrinks
- The `14yr` group at **0-2 hours** still scores around **2.9**, meaning even low screen time students in that group show some level of addiction based on the scoring
- There is no data for `14yr` in the **10-12 hour** band, which matches what we saw in chart 4 where almost no younger students use their phone that long

## Hypothesis Statement

> **Hypothesis :** Both student groups will show addiction scores that correlate with their notification count and screen time hours, however students in the older age group (*aged 18*) will exhibit significantly higher addiction scores than younger students (*aged 14*)

The hypothesis is **largely proved**, but with one part that did not hold up as cleanly as we had actually expected.

**What was proved:**

- The `18yr` group did score significantly higher in addiction than the `14yr` group across every chart that measured it directly. Chart 1 showed the average gap clearly at **3.3 vs 4.5**, and the CDF in chart 5 confirmed this was not just an average thing but a full shift in the distribution
- Screen time does correlate with higher addiction scores for both groups. Chart 6 shows a general upward trend for both `14yr` and `18yr` as daily screen hours increase, so that part of the hypothesis holds
- The addiction score distribution in chart 3 backed this up further, with `18yr` students spreading into the **5, 6 and 7** range while `14yr` students mostly stayed below **4**

**What was only partially proved:**

- The notification correlation was *weaker* than expected, in Chart 2 showed `18yr` scoring higher in the lower notification bands but at **200-300** notifications the `14yr` group actually overtook them, which was unexpected. So notifications do not have a clean upward correlation with addiction score the same way screen time does

**Overall conclusion:**

The data does support the hypothesis that older students show higher addiction scores, and screen time does correlate with addiction for both groups. The notification side of the hypothesis is the weakest link since the relationship there is inconsistent. If we were to rewrite the hypothesis based on what we found, we would probably focus more on screen time as the stronger indicator and treat notifications as a secondary or weaker factor.

## Does your code help you answer the hypothesis?
Yes, the code directly helps answer the hypothesis. The `compute_stats()` function in `main.py` explicitly calculates the mean, median, mode, range and standard deviation for both groups across screen hours, notifications and addiction score, giving us the actual numbers to compare. On top of that, the 6 charts produced by `main.py` visualise those numbers in a way that makes the differences between the two age groups easy to read and draw conclusions from. Without the code we would have no way of processing the raw data from two completely different datasets into something comparable, and without the charts we would have no way of seeing the trends clearly.

## What improvements or changes would you make if you had to do the project again? 
We think one of the biggest changes we would want to do is find a dataset that actually matches, we were kind of put in a rush because we were delayed in finding a dataset (due to the issues we had talked about). Another major issue was planning as even though we were coding we still had no clue on what we really wanted to measure so it did bite a good bit of ideating and going back and fourth to figure out what to measure etc. 

## What learing will you take forward into your next ALT? 
As a group we think time management is probably one of the most important things, as time can fly really fast and we need to be organised and have good time management so that we can perform well during the ALT projects instead of being rushed, however this can only happen through good communication, organisation, planning etc. Which is probably something we will all take forward in the next ALT and other real life projects. 