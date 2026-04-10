import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

plt.rcParams.update({
    "axes.spines.top":   False,
    "axes.spines.right": False,
    "axes.grid":         False,
    "legend.frameon":    False,
    "font.size":         11,
    "figure.dpi":        100,
    "figure.autolayout": True,
})

BLUE   = "#4C9BE8"
ORANGE = "#F4A83A"

df      = pd.read_csv("Artefact/datasets/merge_dataset.csv")
scifest = df[df["source"] == "scifest"]  # age 14
kaggle  = df[df["source"] == "kaggle"]   # age 18+

corr_scifest = scifest["notifs"].corr(scifest["addiction_score"])
corr_kaggle  = kaggle["notifs"].corr(kaggle["addiction_score"])


# --- chart 1: average comparison ---
fig, axes = plt.subplots(1, 3, figsize=(16, 5))
fig.suptitle("Average Comparison: 14yr vs 18yr")

for ax, col, title in [
    (axes[0], "screen_hours",    "Screen Hours"),
    (axes[1], "notifs",          "Daily Notifications"),
    (axes[2], "addiction_score", "Addiction Score"),
]:
    vals = [scifest[col].mean(), kaggle[col].mean()]
    ax.bar(["14yr", "18yr"], vals, color=[BLUE, ORANGE], width=0.5)
    ax.set_title(title)

plt.tight_layout()
plt.savefig("Artefact/chart_1_comparison.png", dpi=150, bbox_inches="tight")
plt.show()


# --- chart 2: mean addiction per notification band ---
notif_bins   = [0, 50, 100, 200, 300, 400, 500]
notif_labels = ["0-50", "50-100", "100-200", "200-300", "300-400", "400+"]

sc = scifest.copy()
ka = kaggle.copy()
sc["band"] = pd.cut(sc["notifs"], bins=notif_bins, labels=notif_labels)
ka["band"] = pd.cut(ka["notifs"], bins=notif_bins, labels=notif_labels)

x, w = np.arange(len(notif_labels)), 0.35
fig, ax = plt.subplots(figsize=(13, 5))
ax.bar(x - w/2, sc.groupby("band", observed=True)["addiction_score"].mean().reindex(notif_labels), w, label="14yr", color=BLUE)
ax.bar(x + w/2, ka.groupby("band", observed=True)["addiction_score"].mean().reindex(notif_labels), w, label="18yr", color=ORANGE)
ax.set_title("Mean Addiction Score per Notification Band")
ax.set_xlabel("Daily Notifications")
ax.set_ylabel("Mean Addiction Score (0–7)")
ax.set_xticks(x)
ax.set_xticklabels(notif_labels)
ax.legend()
plt.tight_layout()
plt.savefig("Artefact/chart_2_notifs_vs_addiction.png", dpi=150, bbox_inches="tight")
plt.show()


# --- chart 3: addiction score distribution ---
fig, ax = plt.subplots(figsize=(11, 5))
ax.hist(scifest["addiction_score"].dropna(), bins=7, range=(0, 7), alpha=0.7, label="14yr", color=BLUE)
ax.hist(kaggle["addiction_score"].dropna(),  bins=7, range=(0, 7), alpha=0.7, label="18yr", color=ORANGE)
ax.set_title("Addiction Score Distribution")
ax.set_xlabel("Addiction Score (0–7)")
ax.set_ylabel("Number of People")
ax.legend()
plt.tight_layout()
plt.savefig("Artefact/chart_3_addiction_dist.png", dpi=150, bbox_inches="tight")
plt.show()


# --- chart 4: screen time distribution ---
screen_bins   = [0, 2, 4, 6, 8, 10, 12]
screen_labels = ["0-2", "2-4", "4-6", "6-8", "8-10", "10-12"]

sc = scifest.copy()
ka = kaggle.copy()
sc["band"] = pd.cut(sc["screen_hours"], bins=screen_bins, labels=screen_labels)
ka["band"] = pd.cut(ka["screen_hours"], bins=screen_bins, labels=screen_labels)

x, w = np.arange(len(screen_labels)), 0.35
fig, ax = plt.subplots(figsize=(13, 5))
ax.bar(x - w/2, sc["band"].value_counts().reindex(screen_labels, fill_value=0), w, label="14yr", color=BLUE)
ax.bar(x + w/2, ka["band"].value_counts().reindex(screen_labels, fill_value=0), w, label="18yr", color=ORANGE)
ax.set_title("Screen Time Distribution")
ax.set_xlabel("Daily Screen Hours")
ax.set_ylabel("Number of People")
ax.set_xticks(x)
ax.set_xticklabels(screen_labels)
ax.legend()
plt.tight_layout()
plt.savefig("Artefact/chart_4_screentime_dist.png", dpi=150, bbox_inches="tight")
plt.show()


# --- chart 5: cumulative addiction score (CDF) ---
scores = range(0, 8)
sc_cum = [(scifest["addiction_score"] <= s).sum() / len(scifest) * 100 for s in scores]
ka_cum = [(kaggle["addiction_score"]  <= s).sum() / len(kaggle)  * 100 for s in scores]

fig, ax = plt.subplots(figsize=(11, 5))
ax.plot(scores, sc_cum, marker="o", linewidth=2, label="14yr", color=BLUE)
ax.plot(scores, ka_cum, marker="o", linewidth=2, label="18yr", color=ORANGE)
ax.fill_between(scores, sc_cum, ka_cum, alpha=0.08, color="grey")
ax.set_title("Cumulative % by Addiction Score (CDF)")
ax.set_xlabel("Addiction Score (0–7)")
ax.set_ylabel("Cumulative % of Group")
ax.set_xticks(list(scores))
ax.legend()
plt.tight_layout()
plt.savefig("Artefact/chart_5_cumulative_addiction.png", dpi=150, bbox_inches="tight")
plt.show()


# --- chart 6: mean addiction per screen time band ---
sc = scifest.copy()
ka = kaggle.copy()
sc["band"] = pd.cut(sc["screen_hours"], bins=screen_bins, labels=screen_labels)
ka["band"] = pd.cut(ka["screen_hours"], bins=screen_bins, labels=screen_labels)

x, w = np.arange(len(screen_labels)), 0.35
fig, ax = plt.subplots(figsize=(13, 5))
ax.bar(x - w/2, sc.groupby("band", observed=True)["addiction_score"].mean().reindex(screen_labels), w, label="14yr", color=BLUE)
ax.bar(x + w/2, ka.groupby("band", observed=True)["addiction_score"].mean().reindex(screen_labels), w, label="18yr", color=ORANGE)
ax.set_title("Mean Addiction Score per Screen Time Band")
ax.set_xlabel("Daily Screen Hours")
ax.set_ylabel("Mean Addiction Score (0–7)")
ax.set_xticks(x)
ax.set_xticklabels(screen_labels)
ax.legend()
plt.tight_layout()
plt.savefig("Artefact/chart_6_screentime_vs_addiction.png", dpi=150, bbox_inches="tight")
plt.show()
