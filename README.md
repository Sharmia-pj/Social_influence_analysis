# Social Network Influence Analytics
**College Capstone Data Science & Network Analytics Project**

A modern, interactive, and mathematically rigorous web platform for analyzing Twitter engagement data to identify influential users, evaluate tweet sentiment, study relational mention graphs, discover communities, and analyze temporal activity patterns.

---

## 1. Project Overview & Aim
The objective of this project is to convert raw microblogging data into topological and qualitative intelligence. By combining Natural Language Processing (NLP), Scikit-Learn feature normalization, and Graph Theory (NetworkX), this platform quantifies genuine structural influence beyond superficial vanity follower counts.

### Key Capabilities:
- **Normalized Influence Scoring:** Combines retweets, likes, and followers via `MinMaxScaler` into a calibrated 0–100 index.
- **Interactive Scoring Controls:** Real-time weight sliders allowing evaluators to adjust criteria weights ($w_{\text{retweets}}, w_{\text{likes}}, w_{\text{followers}}$).
- **Interactive Force-Directed Network Graph:** High-performance Canvas simulation with zoom, pan, node search, and community color clustering.
- **Topological Centrality:** Evaluates Degree Centrality ($C_D$) alongside Google PageRank ($\alpha = 0.85$ power iteration).
- **Unsupervised Community Detection:** Partitions graphs into modular sub-communities with detected cluster leaders and topic keywords.
- **Kaggle CSV Dataset Upload:** Drag-and-drop CSV importer with column auto-detection, schema verification, and instant dynamic recalculation.
- **Jupyter Notebook Code Companion:** Displays authentic Python code cells side-by-side with web analytics.
- **One-Click Executive Submission Report:** Generates a structured academic summary ready for printing or copying to clipboard.

---

## 2. Mathematical Formulations & Methodology

### A. Feature Scaling (MinMaxScaler)
$$\text{Norm}(x) = \frac{x - x_{\min}}{x_{\max} - x_{\min}} \quad \in [0, 1]$$
Prevents high follower accounts from overpowering engagement metrics.

### B. Weighted Composite Influence Score
$$\text{Score} = 100 \times \left( w_1 \cdot \text{Norm}(\text{Retweets}) + w_2 \cdot \text{Norm}(\text{Likes}) + w_3 \cdot \text{Norm}(\text{Followers}) \right)$$
*Default Project Weights:* $w_1 = 0.40$ (Retweets / Virality), $w_2 = 0.30$ (Likes / Resonance), $w_3 = 0.30$ (Followers / Reach).

### C. Network Graph Modeling
- **Vertices ($V$):** Unique Twitter accounts.
- **Edges ($E$):** Directed mentions extracted via regex `r'@(\w+)'` with edge weights representing interaction intensity. Self-mentions are filtered to preserve interaction validity.

### D. Google PageRank Algorithm ($\alpha = 0.85$)
$$PR(u) = \frac{1 - \alpha}{N} + \alpha \sum_{v \in B_u} \frac{PR(v) \cdot W(v, u)}{\text{TotalOutWeight}(v)}$$
Executed via iterative power iteration until convergence ($\epsilon = 10^{-6}$).

---

## 3. CSV Dataset Format Specification
The platform accepts standard Kaggle Twitter datasets with the following columns:
| Column Name | Expected Type | Description |
|---|---|---|
| `user_name` | String / Text | Author account handle (e.g. `sama`, `ylecun`) |
| `text` | Text / String | Raw tweet body containing text and `@mentions` |
| `created_at` | Datetime / Date | Timestamp formatted as `YYYY-MM-DD HH:MM:SS` |
| `retweet_count`| Integer / Number | Direct broadcast reshare count |
| `favorite_count`| Integer / Number| Like / favorite count |
| `followers_count`| Integer / Number| Author follower subscriber count |

*Note:* Number fields formatted with commas (e.g. `"1,420"`, `"2,850,000"`) are automatically sanitized.

---

## 4. How to Run Locally

### Prerequisites:
- Node.js (version 18 or higher)
- npm or yarn

### Steps:
```bash
# 1. Install dependencies
npm install

# 2. Start the local Vite development server
npm run dev

# 3. Open in your browser
# Navigate to: http://localhost:3000
```

### Production Build:
```bash
# Generate production bundle
npm run build

# Preview production build
npm run preview
```

---

## 5. Technology Stack
- **Frontend Framework:** React 19 + TypeScript
- **Bundler & Tooling:** Vite 8
- **Styling:** Tailwind CSS 4 with custom dark navy (`#070a12`, `#090d16`) and purple (`#8b5cf6`) accents
- **CSV Data Engine:** PapaParse with custom numeric sanitization and dynamic mapping
- **Graphics & Visualization:** Custom Responsive SVG charts (Bar, Donut, Sparkline) & HTML5 Canvas Force Simulation
- **Icons:** Lucide React

---

*Social Network Influence Analytics | College Capstone Project*
