---
name: Facebook Ego Network Visualization
tools: [Python, Altair, Vega-Lite, Plotly]
image: assets/pngs/nodelink.png
description: This project showcases interactive visualizations of the Facebook Ego Network. Plot 1 is a static export (PNG) of a Node-Link Diagram, and Plot 2 includes interactive visualizations (HTML) for degree distribution and node metric correlations.
custom_js:
  - vega.min
  - vega-lite.min
  - vega-embed.min
  - justcharts
---

# Facebook Ego Network Visualization Showcase

These visualizations explore the Facebook Ego Network dataset provided by SNAP. Two main visualizations are presented: Node‑Link Diagram (Plot 1) and interactive visualizations (Plot 2) for analyzing node degree distributions and the relationship between degree and clustering coefficient.

1. **Plot 1 (Node-Link Diagram)**:  
   A Interactive visualisation showing the network structure using a force-directed layout. The Node-Link Diagram highlights clusters and node prominence (colored by node degree).

2. **Plot 2 (Interactive Visualizations)**:  
   Two interactive visualizations built using Vega-Lite:  
   - An **interactive histogram** of the node degree distribution with a brush selection to filter the data.
   - A **scatter plot** that correlates node degree with clustering coefficient and includes click-based interactivity for detail exploration.

---

## Plot 1: Node-Link Diagram

**Plot 1.1 (Altair - Reduced by Sub-Sampling)**

<iframe src="/assets/plots/plot1_node_link_altair.html" width="720" height="500" style="border:none;"></iframe>

**Plot 1.2 (Plotly - Fully Rendered)**

<iframe src="/assets/plots/plot1_node_link_diagram.html" width="720" height="500" style="border:none;"></iframe>

**Design Notes:**
- **Layout:** A force-directed (spring) layout is used to reveal clusters.
- **Color Encoding:** Node colors represent the degree (number of connections) for quick visual identification of hubs.
- **Interactivity:** While the interactive version is available separately, the PNG summarizes the global network structure in a scalable format.


**Description**  
<p>The Node-Link Diagram represents Facebook users as nodes and their friendships as edges. A force-directed (spring) layout was used to reveal clusters and highlight key nodes based on their degree. Node colors are assigned according to the number of connections, which helps identify highly-connected users or potential community hubs.</p>

**Export Process & Issues Encountered**  
<p>
During development, generating a high-quality PNG using Plotly's <code>write_image</code> function caused significant performance issues. The static export process took a long time and occasionally resulted in fatal JavaScript memory errors due to the heavy data load (thousands of nodes and tens of thousands of edges). To mitigate this, I experimented with using the WebGL-based <code>Scattergl</code> trace for rendering. Although this improved performance somewhat, the export process still remained resource intensive. As an alternative, I also explored using Matplotlib for a simpler static image export.
</p>

<br>
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
<br>
<br>

## Plot 2: Interactive Visualizations

There are two interactive visualizations developed using Vega‑Lite/Altair. They are exported as HTML files, allowing users to explore key metrics interactively.

### 2a. Interactive Histogram of Node Degree Distribution

<iframe src="\assets\plots\plot2_histogram.html" width="720" height="500" style="border:none;"></iframe>

**Description**  
<p>This histogram displays the distribution of node degrees within the Facebook Ego Network. It uses an interval selection (brush) on the x-axis to enable users to filter nodes by degree. This interactive filtering helps in identifying clusters of nodes with similar connectivity levels.</p>

**Data & Encoding**  
<p>Node degree is binned into up to 30 intervals along the x-axis and counted on the y-axis. A conditional color encoding is applied: nodes within the brushed range are colored ‘steelblue’, while others appear in light gray. Tooltips display the count for each bin, facilitating deeper data inspection.</p>


### 2b. Interactive Scatter Plot: Node Degree vs. Clustering Coefficient

<iframe src="\assets\plots\plot2_scatter.html" width="720" height="500" style="border:none;"></iframe>

**Description**  
<p>The scatter plot examines the relationship between node degree and clustering coefficient. Points represent individual nodes. Interactive click selection is enabled so that when a user clicks on a data point, it is highlighted (its opacity set to 1 while others fade to 0.5), allowing the user to inspect specific node metrics in detail.</p>

**Data & Encoding**  
<p>
- The x-axis encodes node degree (a quantitative variable).  
- The y-axis encodes clustering coefficient (also quantitative).  
- Tooltips provide detailed information (node ID, degree, and clustering coefficient).  
- Color is used to differentiate nodes, enhancing the visual correlation between the two metrics.
</p>

<br>

## Data Processing & Methods

<p>
The visualizations are based on the Facebook Ego Network dataset provided by SNAP (<a href="https://snap.stanford.edu/data/ego-Facebook.html">Data Source</a>). The dataset consists of an edge list representing friendships, which I processed using NetworkX. A force-directed (spring) layout algorithm was applied to compute node positions. Node-level metrics, such as degree and clustering coefficient, were calculated and stored in Pandas DataFrames for easy integration with Altair and Plotly.
</p>

**Key Steps:**
- **Data Loading:**  
  The edge list was loaded with NetworkX, and a subsample was used to alleviate rendering issues.
- **Layout Computation:**  
  A spring layout produced x-y coordinates for nodes.
- **Data Transformation:**  
  Node degree and clustering coefficients were computed, and data was reshaped (for instance, splitting edge data into two rows) for visualization.
- **Visualization Construction:**  
  Two approaches were taken:  
  - The interactive visualizations use Vega-Lite (exported as HTML).  
  - A static Node-Link Diagram was exported as PNG using Plotly, though this required multiple attempts to optimize the image rendering process.

## Challenges and Solutions

<p>
The major issues encountered during this project included:
</p>
<ul>
  <li><strong>Static Image Export:</strong> Exporting the full network to PNG was exceedingly slow and led to JavaScript out-of-memory errors. To resolve this, a subsampled network was used and the WebGL-based <code>Scattergl</code> trace was implemented, though performance remained a challenge.</li>
  <li><strong>Data Size and Complexity:</strong> The full dataset's size (thousands of nodes, tens of thousands of edges) necessitated data subsampling and careful performance tuning in both interactive and static visualizations.</li>
  <li><strong>Interactivity vs. Static Rendering:</strong> Maintaining rich interactivity in Plot 2 while also achieving a high-quality static export for Plot 1 required separate strategies and code paths.</li>
</ul>

<br>
<br>

<div class="left">
{% include elements/button.html link="https://snap.stanford.edu/data/ego-Facebook.html" text="Dataset Source" %}
</div>

<div class="right">
{% include elements/button.html link="https://github.com/yourusername/data-viz-notebook" text="Analysis Notebook" %}
</div>