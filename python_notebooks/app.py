# app.py

import streamlit as st
import pandas as pd
import altair as alt
import networkx as nx
import gzip

# --- Title and Description ---
st.title("Facebook Ego Network Visualization")
st.markdown("""
This Streamlit app visualizes the Facebook combined ego network dataset from Stanford SNAP.
It includes two visualizations based on node-level statistics like degree and clustering coefficient.
""")

# --- Load and Process Data ---
@st.cache_data
def load_data():
    file_path = "facebook_combined.txt.gz"
    edges = []
    with gzip.open(file_path, 'rt') as f:
        for line in f:
            src, dst = map(int, line.strip().split())
            edges.append((src, dst))
    G = nx.Graph()
    G.add_edges_from(edges)
    degrees = dict(G.degree())
    clustering = nx.clustering(G)
    df = pd.DataFrame({
        'node': list(degrees.keys()),
        'degree': list(degrees.values()),
        'clustering_coefficient': [clustering[n] for n in degrees.keys()]
    })
    return df

df = load_data()

# --- Visualization 1: Degree Histogram ---
st.subheader("Visualization 1: Degree Distribution Histogram")

hist = alt.Chart(df).mark_bar().encode(
    alt.X('degree:Q', bin=alt.Bin(maxbins=50), title='Degree (Number of Friends)'),
    alt.Y('count()', title='Number of Users'),
    tooltip=['count()']
).properties(
    width=600,
    height=400,
    title="Distribution of Node Degrees in Facebook Network"
)

st.altair_chart(hist, use_container_width=True)

# --- Write-Up for Visualization 1 ---
st.markdown("""
**What is being visualized:**  
This histogram shows how many users have a given number of friends. The x-axis represents degree (number of connections),
while the y-axis shows how many users have that degree.

**Why it’s interesting:**  
It reveals that most users have a low-to-medium number of friends, while a few nodes are very well connected — classic "power-law" behavior common in social networks.

**Design choices:**  
- `bar` mark for clarity in discrete binning  
- `maxbins=50` for meaningful aggregation  
- Log scale or tail clipping can be explored to better reveal long-tail

**What I'd improve with more time:**  
I'd add interactive sliders to explore bin size and consider fitting a power-law model.
""")

# --- Visualization 2: Scatter Plot Degree vs. Clustering ---
st.subheader("Visualization 2: Degree vs Clustering Coefficient")

scatter = alt.Chart(df).mark_circle(size=60, opacity=0.6).encode(
    x=alt.X('degree:Q', title='Degree (Number of Friends)'),
    y=alt.Y('clustering_coefficient:Q', title='Clustering Coefficient'),
    tooltip=['node', 'degree', 'clustering_coefficient']
).properties(
    width=600,
    height=400,
    title="Node Degree vs Clustering Coefficient"
)

st.altair_chart(scatter, use_container_width=True)

# --- Write-Up for Visualization 2 ---
st.markdown("""
**What is being visualized:**  
This scatter plot shows how the clustering coefficient (a measure of how connected a node's neighbors are) varies with degree.

**Why it’s interesting:**  
It helps understand the structure of local neighborhoods. High-degree nodes tend to have lower clustering — they connect to many people who are not all connected to each other.

**Design choices:**  
- `circle` mark with semi-transparency to handle overlap  
- Tooltip for rich interactivity  
- Axis labels are clean and intuitive

**What I'd improve with more time:**  
I'd explore log-log axes, fit a regression line, and color by other node features like betweenness or community.
""")
