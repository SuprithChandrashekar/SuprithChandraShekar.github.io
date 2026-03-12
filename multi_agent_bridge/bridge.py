"""
Multi-Agent Portfolio Bridge
============================
A LangChain + LangGraph system that bridges two Claude instances:
  - Design Agent (Claude App persona): UI/UX strategy, color theory, layout planning
  - Code Agent (VS Code Copilot persona): Implementation, SCSS/HTML code generation

The two agents collaborate through a shared LangGraph state graph to produce
a complete portfolio makeover plan with concrete code artifacts.

Usage:
  # With ANTHROPIC_API_KEY set — live mode (calls Claude API via LangChain):
  ANTHROPIC_API_KEY=sk-... python bridge.py

  # Without API key — simulation mode (uses pre-computed design artifacts):
  python bridge.py --simulate
"""

import argparse
import json
import os
import sys
from typing import Annotated, TypedDict

from langchain_core.messages import AIMessage, HumanMessage, SystemMessage
from langgraph.graph import END, StateGraph
from langgraph.graph.message import add_messages


# ---------------------------------------------------------------------------
# Shared state schema
# ---------------------------------------------------------------------------
class PortfolioState(TypedDict):
    """Shared state passed between agents in the LangGraph workflow."""
    messages: Annotated[list, add_messages]
    design_plan: str
    code_artifacts: dict  # filename -> code content
    review_notes: str
    iteration: int
    phase: str


# ---------------------------------------------------------------------------
# Agent system prompts
# ---------------------------------------------------------------------------

DESIGN_SYSTEM_PROMPT = """You are the **Design Agent** — representing the Claude App persona.
You are a world-class UI/UX designer specializing in portfolio websites.

Your role in this multi-agent collaboration:
1. Analyze the current portfolio structure and identify design weaknesses
2. Propose a modern, striking visual redesign with specific recommendations
3. Define color palettes, typography choices, spacing systems, and layout patterns
4. Create detailed design specifications that the Code Agent can implement

Current portfolio context:
- Jekyll-based static site using portfolYOU theme
- Bootstrap 4.6 + SCSS + Poppins font
- Pages: Home (landing), About (skills + timeline), Projects (card grid), Blog
- Light/dark theme support
- Current color: Bootstrap default blue (#007bff)
- Profile: Suprith Chandra Shekar — M.S. Industrial Engineering @ UIUC, Ex-Deloitte

Design constraints:
- Must remain a Jekyll site (no framework change)
- Must keep Bootstrap 4 (can add custom CSS on top)
- Must maintain light/dark theme toggle
- Must remain responsive
- Cannot add new JS frameworks (keep jQuery + Bootstrap JS)

Output your design plan as a structured specification with:
- Color palette (primary, secondary, accent, gradients)
- Typography scale and weights
- Component-by-component redesign notes
- Layout improvements
- Animation/interaction enhancements
- Dark mode adjustments"""

CODE_SYSTEM_PROMPT = """You are the **Code Agent** — representing the VS Code GitHub Copilot Claude integration.
You are an expert frontend developer specializing in Jekyll, SCSS, Bootstrap 4, and Liquid templates.

Your role in this multi-agent collaboration:
1. Take the Design Agent's visual specifications and translate them into working code
2. Generate production-ready SCSS, HTML (Liquid templates), and minimal JS
3. Ensure all code is compatible with Jekyll + GitHub Pages
4. Maintain the existing file structure while modernizing the look

Current tech stack:
- Jekyll 3.9 with Liquid templating
- Bootstrap 4.6 (CDN)
- SCSS with partials: _variables, _base, _theme, _theme-dark, _navbar, _landing, _projects, _blog, _timeline, _footer
- Poppins font (Google Fonts)
- WOW.js for scroll animations
- Font Awesome 5.10 icons

Code output requirements:
- Output ONLY the code artifacts as a JSON object mapping filename to content
- Each file should be complete and ready to drop in
- Use SCSS variables for the new color palette
- Preserve the themed() mixin pattern for light/dark mode
- Keep all Liquid template logic functional
- Add CSS custom properties where beneficial for theming

CRITICAL: Output your code as a valid JSON object where keys are file paths
(relative to the project root) and values are the complete file contents.
Wrap the JSON in ```json code blocks."""

REVIEW_SYSTEM_PROMPT = """You are the **Design Agent** performing a review pass.
The Code Agent has produced implementation code based on your design plan.

Review the code artifacts for:
1. Visual consistency with your original design intent
2. Color palette correctness
3. Responsive design quality
4. Dark mode compatibility
5. Animation and interaction quality
6. Typography and spacing accuracy

If everything looks good, respond with "APPROVED" at the start.
If changes are needed, provide specific feedback for the Code Agent."""


def create_llm():
    """Create a Claude LLM instance via LangChain."""
    from langchain_anthropic import ChatAnthropic
    return ChatAnthropic(
        model="claude-sonnet-4-20250514",
        temperature=0.7,
        max_tokens=8192,
    )


# ---------------------------------------------------------------------------
# Simulation data — pre-computed Design Agent output
# ---------------------------------------------------------------------------

SIMULATED_DESIGN_PLAN = """
# Portfolio Redesign Specification
## Design Agent (Claude App Persona) — Complete Makeover Plan

### 1. COLOR PALETTE

**Light Mode:**
- Primary: #6C63FF (Electric indigo — modern, tech-forward)
- Secondary: #2D3436 (Rich charcoal)
- Accent: #00D2FF (Cyan spark — for highlights and CTAs)
- Gradient Hero: linear-gradient(135deg, #6C63FF 0%, #00D2FF 100%)
- Surface: #FFFFFF
- Surface Elevated: #F8F9FE (slight blue tint)
- Text Primary: #1A1A2E
- Text Secondary: #6B7280
- Border: rgba(108, 99, 255, 0.12)

**Dark Mode:**
- Primary: #818CF8 (Lighter indigo for dark bg)
- Secondary: #A5B4FC (Soft periwinkle)
- Accent: #22D3EE (Bright cyan)
- Gradient Hero: linear-gradient(135deg, #312E81 0%, #0F172A 100%)
- Surface: #0F172A (Deep navy)
- Surface Elevated: #1E293B (Slate)
- Text Primary: #F1F5F9
- Text Secondary: #94A3B8
- Border: rgba(129, 140, 248, 0.15)

### 2. TYPOGRAPHY
- Heading Font: "Inter", sans-serif (modern, geometric)
- Body Font: "Inter", sans-serif (unified type system)
- Mono Font: "JetBrains Mono" (for code/tech badges)
- Scale: 0.875rem / 1rem / 1.125rem / 1.25rem / 1.5rem / 2rem / 2.5rem / 3rem
- Weights: 400 (body), 500 (medium), 600 (semibold), 700 (bold)
- Line height: 1.6 for body, 1.2 for headings

### 3. LANDING / HERO SECTION
- Full-viewport gradient background with subtle animated mesh
- Profile image with glowing border ring (box-shadow with primary color)
- Large headline with gradient text effect (primary -> accent)
- Typed subtitle animation using CSS only (no new JS libraries)
- Role badges as glass-morphism pills
- Scroll-down indicator with bounce animation
- Social links as icon buttons with hover glow

### 4. NAVBAR
- Glassmorphism effect: backdrop-filter: blur(12px) with semi-transparent bg
- Smooth scroll shadow on scroll (added via existing JS)
- Logo with gradient text
- Nav links with dot indicator instead of underline
- Pill-shaped active state

### 5. PROJECT CARDS
- Larger image container (200px on desktop)
- Gradient overlay on hover (primary -> accent at 60% opacity)
- Floating tool badges with glassmorphism
- Scale transform on hover (1.03) instead of just translateY
- Title appears bold on hover
- Category labels as colored dots

### 6. SKILLS SECTION
- Replace progress bars with radial/donut charts
- Skill cards in a grid (3 columns on desktop)
- Each card shows: icon area, skill name, proficiency ring
- Animated fill on scroll (CSS transition with WOW.js trigger)
- Color-coded rings matching skill categories

### 7. TIMELINE
- Center-aligned on desktop (alternating left/right)
- Gradient connecting line (primary -> accent)
- Timeline nodes as pulsing dots
- Cards with subtle glassmorphism
- Date badges as floating pills
- Hover: slight scale with shadow enhancement

### 8. FOOTER
- Full-width with gradient top border
- 3-column layout: Brand + tagline | Quick links | Social
- Social icons with hover color fill
- Subtle wave SVG divider above footer
- Copyright with heart animation

### 9. ANIMATIONS
- All cards: fadeInUp with 0.1s stagger
- Hero text: typewriter CSS animation
- Skills: ring fill animation triggered by scroll
- Timeline: alternating slideInLeft / slideInRight
- Navbar: smooth background transition on scroll
- Page transitions: subtle fade

### 10. DARK MODE ENHANCEMENTS
- Richer gradients with deeper navy base
- Glowing accent borders on interactive elements
- Card backgrounds with subtle noise texture
- Elevated surfaces with clear hierarchy
- Reduced white text opacity for comfort (0.87)
"""


# ---------------------------------------------------------------------------
# Node functions — live mode (with API)
# ---------------------------------------------------------------------------

def design_agent_node_live(state: PortfolioState) -> dict:
    """Design Agent (live): calls Claude API via LangChain."""
    llm = create_llm()
    messages = [
        SystemMessage(content=DESIGN_SYSTEM_PROMPT),
        HumanMessage(content="""Analyze this Jekyll portfolio and create a COMPLETE modern redesign plan.
The current site has a minimal landing page with profile image, name, badges;
an about page with progress-bar skills and vertical timeline; a project showcase
with 3-column card grid; a blog page; Bootstrap default blue (#007bff); Poppins font;
basic card hover animations; and a light/dark theme toggle.

The owner is Suprith Chandra Shekar — M.S. Industrial Engineering at UIUC, Ex-Deloitte.
Projects span AI/ML, data processing, automation, and engineering.

Create a bold, modern redesign with specific hex codes, pixel values, and CSS properties."""),
    ]
    response = llm.invoke(messages)
    return {
        "messages": [AIMessage(content=f"[Design Agent] {response.content}")],
        "design_plan": response.content,
        "phase": "design_complete",
        "iteration": state.get("iteration", 0),
    }


def code_agent_node_live(state: PortfolioState) -> dict:
    """Code Agent (live): calls Claude API via LangChain."""
    llm = create_llm()
    design_plan = state["design_plan"]
    review_notes = state.get("review_notes", "")
    revision_ctx = ""
    if review_notes and "APPROVED" not in review_notes:
        revision_ctx = f"\n\nREVISION REQUESTED:\n{review_notes}"

    messages = [
        SystemMessage(content=CODE_SYSTEM_PROMPT),
        HumanMessage(content=f"Implement this design plan:\n{design_plan}{revision_ctx}\n\n"
                     "Generate complete code for all SCSS partials, Liquid includes, and head.html."),
    ]
    response = llm.invoke(messages)
    code_artifacts = _parse_code_artifacts(response.content)
    return {
        "messages": [AIMessage(content=f"[Code Agent] Generated {len(code_artifacts)} artifacts")],
        "code_artifacts": code_artifacts,
        "phase": "code_complete",
        "iteration": state.get("iteration", 0),
    }


def review_node_live(state: PortfolioState) -> dict:
    """Design Agent review (live): calls Claude API via LangChain."""
    llm = create_llm()
    summary = "\n".join(f"- {k}" for k in state["code_artifacts"] if k != "_raw_response")
    messages = [
        SystemMessage(content=REVIEW_SYSTEM_PROMPT),
        HumanMessage(content=f"Design plan summary:\n{state['design_plan'][:1500]}\n\n"
                     f"Artifacts generated:\n{summary}\n\nReview and respond APPROVED or with feedback."),
    ]
    response = llm.invoke(messages)
    return {
        "messages": [AIMessage(content=f"[Review] {response.content[:500]}")],
        "review_notes": response.content,
        "phase": "review_complete",
        "iteration": state.get("iteration", 0) + 1,
    }


# ---------------------------------------------------------------------------
# Node functions — simulation mode (no API required)
# ---------------------------------------------------------------------------

def design_agent_node_sim(state: PortfolioState) -> dict:
    """Design Agent (simulated): uses pre-computed design plan."""
    return {
        "messages": [AIMessage(content=f"[Design Agent - Simulated] Design plan ready ({len(SIMULATED_DESIGN_PLAN)} chars)")],
        "design_plan": SIMULATED_DESIGN_PLAN,
        "phase": "design_complete",
        "iteration": state.get("iteration", 0),
    }


def code_agent_node_sim(state: PortfolioState) -> dict:
    """Code Agent (simulated): loads pre-built artifacts from output/ directory."""
    artifacts = _load_simulation_artifacts()
    return {
        "messages": [AIMessage(content=f"[Code Agent - Simulated] Loaded {len(artifacts)} artifacts")],
        "code_artifacts": artifacts,
        "phase": "code_complete",
        "iteration": state.get("iteration", 0),
    }


def review_node_sim(state: PortfolioState) -> dict:
    """Design review (simulated): auto-approves."""
    return {
        "messages": [AIMessage(content="[Review - Simulated] APPROVED — design plan faithfully implemented")],
        "review_notes": "APPROVED — All design specifications correctly implemented.",
        "phase": "review_complete",
        "iteration": state.get("iteration", 0) + 1,
    }


# ---------------------------------------------------------------------------
# Shared graph logic
# ---------------------------------------------------------------------------

def should_revise(state: PortfolioState) -> str:
    """Determine if another revision cycle is needed."""
    review_notes = state.get("review_notes", "")
    iteration = state.get("iteration", 0)
    if iteration >= 2:
        return "finalize"
    if review_notes.strip().upper().startswith("APPROVED"):
        return "finalize"
    return "revise"


def finalize_node(state: PortfolioState) -> dict:
    """Final node — compile all artifacts."""
    n = len(state.get("code_artifacts", {}))
    return {
        "messages": [AIMessage(content=f"[Bridge] Makeover complete! {n} files, {state.get('iteration', 0)} iteration(s).")],
        "phase": "complete",
    }


# ---------------------------------------------------------------------------
# Build the LangGraph workflow
# ---------------------------------------------------------------------------

def build_portfolio_bridge(simulate: bool = False):
    """
    Construct the multi-agent LangGraph workflow:

        design_agent -> code_agent -> review -> (revise | finalize)
                                        ^          |
                                        |__________|
    """
    graph = StateGraph(PortfolioState)

    if simulate:
        graph.add_node("design_agent", design_agent_node_sim)
        graph.add_node("code_agent", code_agent_node_sim)
        graph.add_node("review", review_node_sim)
    else:
        graph.add_node("design_agent", design_agent_node_live)
        graph.add_node("code_agent", code_agent_node_live)
        graph.add_node("review", review_node_live)

    graph.add_node("finalize", finalize_node)

    graph.set_entry_point("design_agent")
    graph.add_edge("design_agent", "code_agent")
    graph.add_edge("code_agent", "review")
    graph.add_conditional_edges(
        "review",
        should_revise,
        {"revise": "code_agent", "finalize": "finalize"},
    )
    graph.add_edge("finalize", END)

    return graph.compile()


# ---------------------------------------------------------------------------
# Utilities
# ---------------------------------------------------------------------------

def _parse_code_artifacts(content: str) -> dict:
    """Extract JSON code artifacts from LLM response."""
    if "```json" in content:
        start = content.index("```json") + 7
        end = content.index("```", start)
        try:
            return json.loads(content[start:end].strip())
        except json.JSONDecodeError:
            pass
    return {"_raw_response": content}


def _load_simulation_artifacts() -> dict:
    """Load pre-built artifacts from the output/ directory."""
    output_dir = os.path.join(os.path.dirname(__file__), "output")
    artifacts = {}
    if os.path.exists(output_dir):
        for fname in os.listdir(output_dir):
            if fname.startswith("_") or fname.endswith(".txt"):
                continue
            filepath = fname.replace("__", "/")
            with open(os.path.join(output_dir, fname)) as f:
                artifacts[filepath] = f.read()
    return artifacts


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def run_bridge(simulate: bool = False):
    """Execute the multi-agent bridge and return the final state."""
    mode = "SIMULATION" if simulate else "LIVE (API)"
    print("=" * 70)
    print("  MULTI-AGENT PORTFOLIO BRIDGE")
    print("  Design Agent (Claude App) <-> Code Agent (VS Code Copilot)")
    print(f"  Mode: {mode}")
    print("  Powered by LangChain + LangGraph")
    print("=" * 70)

    workflow = build_portfolio_bridge(simulate=simulate)

    initial_state = {
        "messages": [],
        "design_plan": "",
        "code_artifacts": {},
        "review_notes": "",
        "iteration": 0,
        "phase": "init",
    }

    final_state = None
    for step in workflow.stream(initial_state):
        node_name = list(step.keys())[0]
        node_state = step[node_name]
        phase = node_state.get("phase", "")

        if phase == "design_complete":
            print(f"\n[Phase 1] Design Agent: plan created ({len(node_state.get('design_plan', ''))} chars)")
        elif phase == "code_complete":
            n = len(node_state.get("code_artifacts", {}))
            print(f"[Phase 2] Code Agent: generated {n} artifacts")
        elif phase == "review_complete":
            review = node_state.get("review_notes", "")
            approved = review.strip().upper().startswith("APPROVED")
            it = node_state.get("iteration", 0)
            print(f"[Phase 3] Review (iter {it}): {'APPROVED' if approved else 'REVISION NEEDED'}")
        elif phase == "complete":
            print("\n[DONE] Multi-agent bridge workflow complete!")

        final_state = node_state

    return final_state


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Multi-Agent Portfolio Bridge")
    parser.add_argument("--simulate", action="store_true",
                        help="Run in simulation mode (no API key required)")
    args = parser.parse_args()

    # Auto-detect: if no API key, fall back to simulation
    simulate = args.simulate or not os.environ.get("ANTHROPIC_API_KEY")
    if simulate and not args.simulate:
        print("[INFO] No ANTHROPIC_API_KEY found — running in simulation mode")

    result = run_bridge(simulate=simulate)

    # Save artifacts
    artifacts = result.get("code_artifacts", {})
    output_dir = os.path.join(os.path.dirname(__file__), "output")
    os.makedirs(output_dir, exist_ok=True)

    for filepath, content in artifacts.items():
        if filepath == "_raw_response":
            out_path = os.path.join(output_dir, "raw_response.txt")
        else:
            out_path = os.path.join(output_dir, filepath.replace("/", "__"))
        with open(out_path, "w") as f:
            f.write(content)
        print(f"  Saved: {out_path}")

    plan_path = os.path.join(output_dir, "design_plan.txt")
    with open(plan_path, "w") as f:
        f.write(result.get("design_plan", ""))
    print(f"\n  Design plan: {plan_path}")
