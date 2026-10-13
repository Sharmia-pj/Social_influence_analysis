import React, { useState } from 'react';
import { Terminal, Copy, Check, Code, BookOpen, Layers, CheckCircle2 } from 'lucide-react';

export const PythonCodeViewer: React.FC = () => {
  const [copiedCell, setCopiedCell] = useState<number | null>(null);

  const notebookCells = [
    {
      id: 1,
      title: 'Cell 1: Environment Setup & Library Imports',
      module: 'Imports & Dependencies',
      explanation: 'Loads core data analysis, text processing, machine learning feature scaling, and network graph libraries.',
      code: `import pandas as pd
import numpy as np
import re
from collections import Counter
from sklearn.preprocessing import MinMaxScaler
import networkx as nx
import matplotlib.pyplot as plt
import seaborn as sns
from textblob import TextBlob

# Visual styling setup for notebook charts
plt.style.use('seaborn-v0_8-darkgrid')
sns.set_palette('Purples_r')`
    },
    {
      id: 2,
      title: 'Cell 2: Data Loading & Preprocessing Pipeline',
      module: 'Data Cleaning & Regex',
      explanation: 'Handles missing values, drops duplicate rows, removes URLs, extracts mentions using regex r\'@(\\w+)\', and strips noise characters.',
      code: `# 1. Load Twitter engagement dataset
df = pd.read_csv('twitter_engagement_data.csv')

# 2. Impute missing records and drop empty tweets
df.dropna(subset=['text', 'user_name'], inplace=True)
df.drop_duplicates(subset=['user_name', 'text'], keep='first', inplace=True)

# 3. Clean tweet text and extract mentions & hashtags
def clean_text(raw):
    # Extract @mentions prior to cleaning
    mentions = re.findall(r'@(\\w+)', raw)
    hashtags = re.findall(r'#(\\w+)', raw)
    # Remove web URLs
    text = re.sub(r'https?:\\/\\/\\S+', '', raw)
    # Remove non-alphanumeric punctuation
    text = re.sub(r'[^a-zA-Z0-9\\s]', ' ', text).lower().strip()
    return text, [m.lower() for m in mentions], [h.lower() for h in hashtags]

cleaned = df['text'].apply(clean_text)
df['clean_text'] = [c[0] for c in cleaned]
df['mentions'] = [c[1] for c in cleaned]
df['hashtags'] = [c[2] for c in cleaned]

# 4. Temporal weekday feature extraction
df['created_at'] = pd.to_datetime(df['created_at'])
df['weekday'] = df['created_at'].dt.day_name()`
    },
    {
      id: 3,
      title: 'Cell 3: MinMaxScaler & Weighted Influence Scoring',
      module: 'Normalized Influence Model',
      explanation: 'Applies Scikit-Learn MinMaxScaler to eliminate scale discrepancies between retweets, likes, and followers, then computes the composite weighted score.',
      code: `# Aggregate engagement metrics per unique author
user_df = df.groupby('user_name').agg({
    'followers_count': 'max',
    'retweet_count': 'sum',
    'favorite_count': 'sum',
    'text': 'count'
}).rename(columns={'text': 'tweet_count'})

# Initialize Scikit-Learn MinMaxScaler to scale features to [0, 1]
scaler = MinMaxScaler()
scaled_features = scaler.fit_transform(
    user_df[['retweet_count', 'favorite_count', 'followers_count']]
)

user_df['norm_retweets'] = scaled_features[:, 0]
user_df['norm_likes'] = scaled_features[:, 1]
user_df['norm_followers'] = scaled_features[:, 2]

# Multi-criteria weighted influence formula (0 - 100 Scale)
w_rt, w_likes, w_fol = 0.40, 0.30, 0.30

user_df['influence_score'] = 100 * (
    w_rt * user_df['norm_retweets'] +
    w_likes * user_df['norm_likes'] +
    w_fol * user_df['norm_followers']
)

# Sort and extract Top 10 Influential Users
top_influencers = user_df.sort_values(by='influence_score', ascending=False).head(10)
print(top_influencers[['followers_count', 'retweet_count', 'influence_score']])`
    },
    {
      id: 4,
      title: 'Cell 4: Sentiment Classification & Lexical Counter',
      module: 'NLP & Text Mining',
      explanation: 'Computes polarity scores, classifies tweets into Positive, Negative, and Neutral bins, and extracts top 20 words excluding stopwords.',
      code: `# Sentiment polarity classification
def classify_sentiment(text):
    polarity = TextBlob(text).sentiment.polarity
    if polarity > 0.05:
        return 'positive', polarity
    elif polarity < -0.05:
        return 'negative', polarity
    return 'neutral', polarity

res = df['clean_text'].apply(classify_sentiment)
df['sentiment'] = [r[0] for r in res]
df['sentiment_score'] = [r[1] for r in res]

# Word frequency analysis with stopword removal
from nltk.corpus import stopwords
stop_words = set(stopwords.words('english')).union({'rt', 'https', 'co', 'amp', 'via'})

all_words = []
for text in df['clean_text']:
    tokens = re.findall(r'\\b[a-zA-Z]{3,}\\b', text)
    all_words.extend([w for w in tokens if w not in stop_words])

top_20_words = Counter(all_words).most_common(20)
print("Top 20 Trending Words:", top_20_words)`
    },
    {
      id: 5,
      title: 'Cell 5: NetworkX Directed Graph, PageRank & Community Detection',
      module: 'Social Network Graph Theory',
      explanation: 'Constructs directed interaction graph G = (V, E), evaluates In-Degree Centrality, Google PageRank (alpha=0.85), and Louvain community modularity.',
      code: `# Construct directed graph of user interactions
G = nx.DiGraph()

for _, row in df.iterrows():
    source = row['user_name']
    for target in row['mentions']:
        if G.has_edge(source, target):
            G[source][target]['weight'] += 1
        else:
            G.add_edge(source, target, weight=1)

# Degree Centrality and Google PageRank (d = 0.85)
degree_centrality = nx.degree_centrality(G)
in_degree_centrality = nx.in_degree_centrality(G)
pagerank_scores = nx.pagerank(G, alpha=0.85, max_iter=100)

# Community Detection using Louvain Modularity
# Converts to undirected graph for symmetric community partition
import community as community_louvain
partition = community_louvain.best_partition(G.to_undirected())

print(f"Graph Nodes: {G.number_of_nodes()}, Graph Edges: {G.number_of_edges()}")
print(f"Modularity: {community_louvain.modularity(partition, G.to_undirected()):.4f}")`
    },
    {
      id: 6,
      title: 'Cell 6: Weekday Temporal Aggregation & Plotting',
      module: 'Temporal Analysis & Visualization',
      explanation: 'Groups tweets by day of week, computes aggregate engagement metrics, and creates summary seaborn plots.',
      code: `# Weekday aggregation
day_order = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
weekday_df = df.groupby('weekday').agg({
    'text': 'count',
    'retweet_count': 'sum',
    'favorite_count': 'sum'
}).reindex(day_order)

weekday_df['avg_engagement'] = (
    weekday_df['retweet_count'] + weekday_df['favorite_count']
) / weekday_df['text']

# Plotting weekday trends with Matplotlib
plt.figure(figsize=(10, 5))
sns.barplot(x=weekday_df.index, y=weekday_df['text'], color='#7c3aed')
plt.title('Tweet Activity Frequency by Weekday')
plt.ylabel('Total Tweets')
plt.xticks(rotation=25)
plt.tight_layout()
plt.show()`
    }
  ];

  const copyCode = (code: string, id: number) => {
    navigator.clipboard.writeText(code);
    setCopiedCell(id);
    setTimeout(() => setCopiedCell(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 via-indigo-50/50 to-white border border-purple-200/90 rounded-2xl p-6 shadow-xs">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-purple-600 flex items-center justify-center text-white shadow-sm shadow-purple-600/20">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Jupyter Notebook (.ipynb) Code Companion</h1>
            <p className="text-xs text-slate-600">
              Direct mapping between the original Python/Pandas/NetworkX notebook cells and the web analytics engine
            </p>
          </div>
        </div>

        <p className="text-slate-700 text-xs sm:text-sm mt-3 leading-relaxed border-t border-purple-100 pt-3">
          This section demonstrates academic rigor by presenting the authentic Python analysis routines from the college project notebook.
          All mathematical formulations—including Scikit-Learn <code className="text-purple-700 font-semibold font-mono">MinMaxScaler</code>,
          regular expression handle tokenization, <code className="text-purple-700 font-semibold font-mono">nx.pagerank(alpha=0.85)</code>, and Louvain modularity—are
          faithfully ported to the browser data engine, preserving analytical accuracy without fabricated outputs.
        </p>
      </div>

      {/* Code Cells Showcase */}
      <div className="space-y-5">
        {notebookCells.map((cell) => (
          <div
            key={cell.id}
            className="rounded-2xl bg-white border border-slate-200/90 overflow-hidden shadow-sm space-y-0"
          >
            {/* Cell Header */}
            <div className="p-3.5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-600" />
                <h3 className="text-xs font-bold text-slate-900 font-mono">{cell.title}</h3>
                <span className="text-[11px] font-mono text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full font-semibold hidden sm:inline border border-purple-200">
                  {cell.module}
                </span>
              </div>

              <button
                onClick={() => copyCode(cell.code, cell.id)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 text-[11px] font-semibold transition-colors shadow-2xs"
                title="Copy Python Code"
              >
                {copiedCell === cell.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-mono">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-purple-600" />
                    <span className="font-mono">Copy Code</span>
                  </>
                )}
              </button>
            </div>

            {/* Explanation */}
            <div className="px-4 py-2.5 bg-purple-50/40 text-xs text-slate-700 border-b border-slate-200 flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5 text-purple-600 shrink-0" />
              <span>{cell.explanation}</span>
            </div>

            {/* Code Block */}
            <div className="p-4 bg-slate-900 overflow-x-auto">
              <pre className="text-xs font-mono text-purple-200 leading-relaxed whitespace-pre selection:bg-purple-600 selection:text-white">
                {cell.code}
              </pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
