# Domain Knowledge Brief — AI-Powered Autonomous Multi-Agent Testing Platform (Enterprise / Aerospace-Defense)

## Sub-Domain Classification

Enterprise-grade AI-native autonomous software testing platform with multi-agent swarm architecture, targeting Aerospace and Defense (A&D) environments requiring DO-178C and MIL-STD compliance. The platform (VILL-50 Legion / "50 Ants") operates at the intersection of AI agent orchestration, production hardening, and safety-critical software verification. Primary users are Senior Software Engineers and QA architects overseeing test infrastructure at the platform level, not individual testers running test scripts. The product tests itself recursively — it is both the tool and the subject.

---

## Job Analyst Vocabulary — Confirmed and Extended

The job posting uses specialized vocabulary that signals deep familiarity with multi-agent AI architectures and production engineering. The following confirms and extends that vocabulary.

### Confirmed Primary Entity Names

These are the words that must appear in every UI label — sidebar nav, table headers, KPI card titles, status badges, and search placeholders.

- Primary record type: **Verification Run** (not "test run", not "job" — a verification run is a structured, traceable execution event aligned with safety-critical standards)
- Agent entity: **Agent** with specific role suffixes (Explorer Agent, Sentinel Agent, Healer Agent — see expanded list below)
- Collective noun for the agent fleet: **Legion** (50 agents, the product's own name — never "bot pool" or "worker set")
- Test collection entity: **Test Suite** (standard across the industry; also "Test Pack" in A&D contexts)
- Coverage unit: **Coverage Map** (not "coverage report" — a map implies spatial/structural awareness across the codebase)
- Execution context: **Campaign** (a Campaign is a named, scoped verification effort against a target system — borrowed from A&D operational language)
- Target system under test: **Target** or **System Under Test (SUT)** (formal DO-178C terminology)
- Fault event: **Anomaly** (not "bug" — anomalies are classified, tracked, and triaged; "bug" is too informal for A&D context)
- Discovered defect: **Finding** (DO-178C and MIL-STD audit language — a finding requires formal disposition)
- Reproducible failure: **Confirmed Fault** (distinct from an anomaly; a finding that passed triage and is reproducible)
- Stability measure: **Integrity Score** (0-100 scale, analogous to a health score — signals the platform's confidence in system stability)
- People roles: **Platform Engineer**, **Legion Operator**, **Verification Lead**, **Configuration Manager** (not "QA tester", not "developer")

### Expanded KPI Vocabulary

Beyond what a generic QA tool would show — the exact metric names this industry tracks.

| KPI Name | What It Measures | Typical Format |
|---|---|---|
| Structural Coverage | % of code paths exercised by the Legion across a run | % (0-100) |
| MC/DC Coverage | Modified Condition/Decision Coverage — a DO-178C DAL-A requirement | % (0-100) |
| Defect Escape Rate | % of defects that made it past the Legion and reached production | % (ideally <1%) |
| Mean Time to Detect (MTTD) | Average time from fault introduction to Legion detection | minutes / hours |
| False Positive Rate | % of anomalies flagged that were not real faults | % (target <5%) |
| Agent Utilization | % of available Legion capacity actively running tasks | % (0-100) |
| Flaky Test Rate | % of tests yielding non-deterministic results across identical runs | % (target <2%) |
| Verification Velocity | Number of verification runs completed per 24-hour window | count/day |
| Integrity Score | Composite stability score for the target system (0-100) | integer 0-100 |
| Campaign Coverage Delta | Change in coverage % between consecutive campaigns | +/- % points |
| Finding Resolution Rate | % of confirmed faults resolved within defined SLA | % |
| Fault Injection Success Rate | % of injected faults that were successfully detected | % (target >95%) |
| Autonomous Triage Rate | % of anomalies fully triaged by the Legion without human intervention | % |
| Regression Containment Rate | % of regression scenarios covered after a code change | % |

### Status Label Vocabulary

Exact status strings used in this industry — these go directly into data tables, badges, and filter dropdowns.

**Verification Run / Campaign States:**
- Active states: `Executing`, `Exploring`, `Injecting`, `Analyzing`, `Converging`
- Transitional states: `Queued`, `Initializing`, `Paused`, `Awaiting Review`
- Problem states: `Fault Detected`, `Anomaly Flagged`, `Coverage Gap`, `Agent Stalled`, `Timeout Exceeded`
- Terminal states: `Passed`, `Failed`, `Aborted`, `Inconclusive`, `Archived`

**Finding / Anomaly States:**
- Active states: `Open`, `Under Investigation`, `Reproduced`, `Confirmed`
- Disposition states: `Accepted Risk`, `Deferred`, `Waived`
- Terminal states: `Resolved`, `Closed`, `Duplicate`, `False Positive`

**Agent States:**
- Active: `Deployed`, `Exploring`, `Executing`, `Reporting`
- Problem: `Stalled`, `Crashed`, `Unresponsive`, `Quarantined`
- Inactive: `Idle`, `Standby`, `Decommissioned`

### Workflow and Action Vocabulary

Verbs used in this domain — these become button labels, action menu items, and empty state messages.

- Primary actions: `Deploy Legion`, `Launch Campaign`, `Inject Fault`, `Dispatch Agent`, `Terminate Run`, `Archive Campaign`
- Analysis actions: `Triage Anomaly`, `Confirm Finding`, `Reproduce Fault`, `Waive Finding`, `Escalate to Verification Lead`
- Coverage actions: `Expand Coverage`, `Map Gaps`, `Prioritize Paths`, `Generate Coverage Report`
- Remediation actions: `Heal Agent`, `Requeue Task`, `Reset Baseline`, `Checkpoint State`

### Sidebar Navigation Candidates

Five to eight navigation items using domain vocabulary — not generic labels.

- **Legion Console** (overview of all 50 agents — their states, utilization, current tasks)
- **Campaign Board** (all active and recent verification campaigns; launch new campaigns here)
- **Coverage Atlas** (interactive coverage map showing tested vs. untested code paths)
- **Findings Tracker** (triage queue for anomalies and confirmed faults, sortable by severity/DAL)
- **Fault Injector** (configure and trigger deliberate fault injection scenarios)
- **Integrity Monitor** (real-time Integrity Score trend and system health)
- **Verification Reports** (DO-178C-aligned audit artifacts, traceability matrices, export)
- **Platform Config** (agent parameters, SUT connection, compliance profile settings)

---

## Design Context — Visual Language of This Industry

### What "Premium" Looks Like in This Domain

Practitioners in this space operate high-stakes tooling all day. Their reference points are Datadog, Grafana, CrowdStrike Falcon, and the LDRA TBmanager — dense, dark or deep-surface UIs where information density signals seriousness. Consumer app aesthetics (rounded cards, generous whitespace, pastel colors) actively signal the wrong thing here. A QA platform engineer working on A&D software expects to feel like they are in a command center, not a SaaS marketing dashboard.

The dominant visual convention in enterprise testing platforms is: dark or near-dark background, luminous accent colors for status indicators, monospace fonts for all numeric and identifier values, and heavy reliance on status badges with color-coded severity tiers. Tables dominate over cards — a list of verification runs with sortable columns is the primary interface primitive. Think Datadog meets CrowdStrike, with the traceability-matrix discipline of LDRA.

For VILL-50 Legion specifically, the "50 Ants / Legion" naming creates an opportunity for a distinctive visual identity that nods to swarm intelligence without being cartoonish. Deep electric indigo or electric cyan on near-black surfaces — like the Antithesis platform's deep purple aesthetic but colder and more precise. This signals AI-native, serious tooling. The A&D customer context reinforces this: these buyers judge platforms the way they judge avionics instruments — by reliability signals, not visual warmth.

### Real-World Apps Clients Would Recognize as "Premium"

1. **Antithesis** — The closest conceptual peer to VILL-50. Antithesis uses deep purple/near-black surfaces, luminous accent colors, and minimal UI chrome. It emphasizes deterministic simulation and autonomous exploration — vocabulary VILL-50 practitioners would immediately recognize. Visual takeaway: dramatic dark backgrounds, high-contrast data, technical density without clutter.

2. **Datadog APM + Test Visibility** — The dominant reference for enterprise monitoring/testing dashboards. Practitioners use Datadog daily and have internalized its conventions: dark sidebar, orange accent, dense metric cards, time-series charts as the primary visualization, real-time status indicators. A VILL-50 demo that feels "like Datadog for autonomous test agents" would land immediately.

3. **CrowdStrike Falcon** — A&D buyers are familiar with CrowdStrike's operator console aesthetic: dark background, bold red/green alert states, table-heavy layouts, a strong status indicator system. This is the visual language of "serious enterprise security tooling" — and testing platforms that target A&D map well onto it because the risk stakes are similar.

### Aesthetic Validation

- **Job Analyst chose**: Dark Premium
- **Domain validation**: Confirmed and strongly reinforced. This domain's practitioners use tools like Datadog, CrowdStrike Falcon, and Antithesis as daily references. Dark backgrounds are not just acceptable here — they are expected. A light-background dashboard would read as consumer-grade to this audience. The "premium" signal is delivered through visual precision, color-coded status systems, and information density — not through spaciousness or warmth.
- **One adjustment to color/density**: The default "dark premium" implementation often leans toward electric blue. For VILL-50, lean toward deep indigo-to-electric-cyan spectrum (inspired by Antithesis's palette). This distinguishes it from generic "dark SaaS" and gives it a signature that matches the "autonomous agent swarm" concept. Accent color: `oklch(0.72 0.20 200)` — a precise electric teal that reads as both AI-native and technical.

### Format Validation

- **Job Analyst chose**: dashboard-app
- **Domain validation**: Confirmed. This is definitively an ops dashboard — a sidebar-driven command console where engineers monitor agent fleets, campaigns, and findings in real time. No other format would be appropriate. A mobile-app-preview or landing-page format would completely miss the brief.
- **Format-specific design notes for the Demo Screen Builder**: The main dashboard view should open on the **Legion Console** — a grid of 50 agent status tiles (like a server status board) plus KPI stat cards at the top. This "swarm view" is the most visually distinctive element of the product and should be the hero impression. Secondary views include Campaign Board (table-heavy) and Coverage Atlas (potentially a treemap or heatmap for code path coverage). The sidebar should be narrow-to-standard (14-16rem), dark background, with luminous accent on the active item.

### Density and Layout Expectations

This domain sits at the maximum end of professional density. Practitioners working on A&D software verification are power users who have internalized Bloomberg Terminal, Datadog, and LDRA TBmanager. Compact density is appropriate — `--content-padding: 1rem`, tight table row heights, small badge text. Every screen should feel like there is useful information everywhere, not whitespace.

The dominant layout pattern is **table-heavy with a stat card row at top**. The exception is the Legion Console itself, which benefits from a grid/tile layout (one tile per agent). Coverage Atlas may use a heatmap or treemap visualization for code path density. Sidebar navigation should lean toward a narrower profile (14-15rem) to maximize content area — consistent with Datadog's dense sidebar.

---

## Entity Names (10+ realistic names)

### Companies / Organizations (Realistic A&D Software Clients)

- Meridian Avionics Systems
- Apex Defense Technologies
- Irongate Embedded Solutions
- Northshore Flight Systems
- Redline Mission Software
- Caliber Systems Group
- Vantage Autonomy LLC
- Sentinel Dynamics Corp
- Highmark Defense Contractors
- Atlas Safety-Critical Software

### People Names (role-appropriate for Platform Engineers, Verification Leads, Legion Operators)

- Marcus Voigt (Platform Engineer)
- Sarah Okafor (Verification Lead)
- Dev Patel (Legion Operator)
- Kristen Rasmussen (Configuration Manager)
- James Tran (Principal Platform Engineer)
- Aliyah Brooks (QA Architect)
- Nathan Kowalski (Verification Engineer)
- Priya Subramaniam (Test Infrastructure Lead)

### Agent Names (the 50 Legion Agents — representative sample with role designations)

- Agent-001 / The Orchestrator (pipeline routing and campaign coordination)
- Agent-002 / The Explorer (autonomous application surface traversal)
- Agent-003 / The Sentinel (quality gate enforcement — hard gate, no override)
- Agent-004 / The Healer (failure diagnosis and self-healing iteration)
- Agent-005 / The Analyst (feature and behavior analysis)
- Agent-006 / The Scribe (traceability and documentation generation)
- Agent-007 / The Injector (fault injection execution)
- Agent-008 / The Inspector (PR and diff review)
- Agent-009 / The Mapper (coverage map construction)
- Agent-010 / The Archivist (artifact collation for DO-178C submission)

### Test Suite / Campaign Names

- Baseline Integrity Suite v3.2
- Navigation Module Full Coverage Pack
- Regression Gate — Sprint 47
- Fault Tolerance Campaign — DAL-A Targets
- Cold Start Boundary Conditions Suite
- Memory Leak Detection Pack
- Concurrent Access Stress Suite
- DO-178C Structural Coverage Campaign
- Integration Smoke Suite — Release 2.4.1
- Edge Case Exploration Campaign — UI Layer

---

## Realistic Metric Ranges

| Metric | Low | Typical | High | Notes |
|--------|-----|---------|------|-------|
| Structural Coverage % | 72% | 89% | 99.7% | DO-178C DAL-A target: 100% MC/DC; real-world stable campaigns hit 89-96% |
| MC/DC Coverage % | 41% | 78% | 100% | Required at 100% for DAL-A; typical mid-campaign reading is 78% |
| Agent Utilization % | 34% | 71% | 98% | Low utilization = idle capacity; high = potential queue buildup |
| Integrity Score (0-100) | 52 | 81 | 97 | Below 70 = flag for review; below 60 = campaign halt recommended |
| False Positive Rate % | 0.8% | 3.2% | 12% | Above 5% signals model drift or misconfigured assertions |
| Flaky Test Rate % | 0.1% | 1.4% | 8% | Above 2% is a platform health concern |
| Mean Time to Detect (minutes) | 2 | 18 | 240 | Post-commit detection; 2 min = fast-path smoke; 240 min = deep exploration |
| Verification Runs / day | 4 | 23 | 156 | Depends on CI commit frequency; A&D pipelines run fewer, heavier campaigns |
| Campaign Duration (hours) | 0.5 | 6.2 | 72 | Smoke suites: 30 min; full structural coverage: 24-72 hours |
| Active Findings (open) | 0 | 7 | 34 | Zero is the goal before release; >20 open = release blocked |
| Confirmed Faults in Period | 0 | 3 | 18 | Per 2-week sprint; >10 = regression concern |
| Fault Injection Success Rate % | 82% | 94% | 99.5% | Target >95%; below 90% = detector gap |
| Agent Fleet Size | 5 | 50 | 200 | VILL-50 runs 50 agents; enterprise scaling to 200+ is a roadmap item |
| Tests in Active Suite | 87 | 420 | 2,400 | A&D suites run smaller but with higher structural rigor than web apps |

---

## Industry Terminology Glossary (15+ terms)

| Term | Definition | Usage Context |
|------|-----------|---------------|
| DO-178C | RTCA standard for airborne software certification. Defines 71 verification objectives by Design Assurance Level. | Context for all A&D testing targets — customers cite their DAL compliance requirement |
| Design Assurance Level (DAL) | Risk classification A through E. DAL-A = catastrophic failure consequence; requires 100% MC/DC coverage. | Shown as a badge on each Campaign and Target — DAL-A campaigns are the most demanding |
| MC/DC Coverage | Modified Condition/Decision Coverage — every condition in a boolean expression must independently affect the outcome. Required by DO-178C at DAL-A and B. | Core coverage KPI; displayed prominently in Coverage Atlas |
| Fault Injection | Deliberate introduction of hardware/software failures (network timeout, memory corruption, node crash) to verify system resilience. | The Injector Agent's primary function; a Campaign type in the platform |
| Determinator | Antithesis's terminology for a deterministic hypervisor environment — broader industry term: "deterministic sandbox". | Platform infrastructure concept — VILL-50 runs campaigns in isolated deterministic environments |
| Structural Coverage | Measurement of code execution paths exercised (statement, branch, MC/DC). DO-178C basis for verification completeness. | Primary coverage metric in Coverage Atlas |
| Self-Healing Test | A test that adapts to UI or API changes automatically, reducing maintenance burden. | Feature of AI-native platforms; Explorer and Healer agents collaborate on this |
| Defect Escape Rate | % of defects not caught by testing that reached production. Key reliability signal. | KPI card in dashboard; low = platform performing; high = coverage gaps |
| Requirements Traceability Matrix (RTM) | Document linking every requirement to the tests that verify it. Mandatory for DO-178C certification artifacts. | Scribe Agent generates this; Verification Reports tab produces RTM exports |
| Findings Triage | Process of reviewing, classifying, and dispositioning anomalies. Classification: Confirmed Fault, False Positive, Accepted Risk, Deferred. | Core workflow in Findings Tracker page |
| Flaky Test | A test that produces non-deterministic results across identical runs — passes sometimes, fails others with no code change. Signals unreliable assertions. | Tracked as a platform health metric; Healer Agent targets flaky tests |
| Campaign | A named, scoped, time-bounded verification effort against a specific Target/SUT. Contains Suites, Agents deployed, and produces Findings. | Top-level entity in the platform alongside Agent and Finding |
| SUT (System Under Test) | The target software application being verified by the Legion. | Core entity; every Campaign references a SUT |
| Regression Containment | Ensuring previously passing tests continue to pass after a code change. | A Campaign type; tracked as Regression Containment Rate KPI |
| Production Hardening | The process of systematically eliminating instability, edge case failures, and reliability gaps before a system goes to production. | The job's core objective — the product itself is being hardened |
| Coverage Gap | A code path, branch, or condition that no test in the current suite exercises. High-risk in A&D contexts. | Surfaced in Coverage Atlas; triggers Explorer Agent deployment |
| Deterministic Simulation | Running software in a controlled environment where all timing, network, and system behaviors are reproducible. Enables perfect bug replay. | Platform infrastructure feature; contrasted with "non-deterministic" flaky behavior |
| Acceptance Criteria Verification | Confirming that a Finding is resolved: the Sentinel Agent re-runs the specific scenario and confirms the fault no longer manifests. | Final step in Finding resolution workflow |
| Waiver | Formal decision to accept a known fault without fixing it, with documented rationale. DO-178C audit artifact. | Finding disposition state; requires Verification Lead authorization |

---

## Common Workflows

### Workflow 1: Campaign Launch and Execution

1. Verification Lead creates a new **Campaign** — names it, selects the SUT, assigns a DAL compliance target (A/B/C/D), and selects test suites.
2. Campaign is queued; **Orchestrator Agent** (Agent-001) receives the campaign manifest.
3. Orchestrator dispatches specialized agents: Explorer Agents begin surface traversal, Injector Agents prepare fault scenarios, Mapper Agents start building the Coverage Map.
4. Agents execute in parallel — 50 agents running simultaneously across test surfaces.
5. As agents discover anomalies, they push to the **Findings queue** with initial classification.
6. **Sentinel Agent** (Agent-003) monitors the quality gate — if critical anomalies exceed threshold, it halts the campaign automatically.
7. Campaign reaches termination condition (full coverage, timeout, or Sentinel halt). Status transitions to `Analyzing`.
8. **Scribe Agent** generates the coverage delta report, traceability artifacts, and campaign summary.
9. Campaign status moves to `Awaiting Review` — Verification Lead reviews Integrity Score, coverage delta, and open findings.
10. Verification Lead approves or blocks — findings are triaged, campaign is Archived or Requeued.

### Workflow 2: Finding Triage and Resolution

1. Explorer Agent flags an anomaly during exploration — assigns initial classification `Open` with severity estimate.
2. **Healer Agent** (Agent-004) attempts autonomous reproduction within 5 iterations.
3. If reproduced: Finding status moves to `Confirmed` — fault is reproducible, has a stack trace and reproduction steps.
4. Finding appears in Verification Lead's **Findings Tracker** queue with severity badge (Critical / High / Medium / Low) and DAL impact tag.
5. Verification Lead triages: assigns to Platform Engineer, sets resolution SLA, or dispositions as `Accepted Risk` / `Deferred` / `False Positive`.
6. Platform Engineer resolves the fault in code, commits fix.
7. Sentinel Agent re-runs the specific fault scenario against the updated SUT.
8. If confirmed clear: Finding status moves to `Resolved` and is added to the campaign's acceptance evidence.
9. Scribe Agent updates the RTM to reflect resolution.

### Workflow 3: Recursive Self-Testing (Platform Tests Itself)

1. After a Legion platform update, a **Self-Test Campaign** is automatically triggered by the CI pipeline.
2. The Legion is its own SUT — it runs its agent orchestration logic, coverage reporting, and fault injection modules as the target.
3. Explorer Agents traverse the Legion's own API surfaces and UI.
4. Injector Agents introduce synthetic faults into the Legion's internal message bus and agent communication layer.
5. Sentinel Agent enforces a stricter quality gate on self-test campaigns (Integrity Score must be >95 to pass).
6. Any Finding in a self-test campaign is treated as `Critical` by default — platform reliability cannot be assumed.
7. Self-test results are published as a **Platform Integrity Report** — an artifact that A&D customers can cite in their own compliance documentation.

---

## Common Edge Cases

1. **Stalled Agent**: Agent-031 enters `Stalled` state mid-campaign after a memory overflow in a loop traversal. Campaign continues with remaining 49 agents but coverage gap is flagged. Healer Agent attempts agent restart; if unresolvable, agent is `Quarantined` and incident logged.

2. **Coverage Plateau**: Campaign reaches 87.3% structural coverage and stops improving despite continued exploration. Explorer Agents report that remaining untested paths are dead code or unreachable branches. Coverage Atlas shows the gap in orange; automated note recommends `Dead Code Review`.

3. **False Positive Storm**: After a SUT API change, 34 anomalies are flagged in 2 hours — all in the same module. Anomaly clustering algorithm detects a pattern and groups them as a single root-cause event. False Positive Rate for the campaign spikes to 11.4%.

4. **DAL-A Compliance Gap**: Campaign targeting DO-178C DAL-A achieves 100% statement coverage but only 73% MC/DC coverage. Sentinel Agent blocks campaign completion with status `Compliance Gap — MC/DC Below Threshold`. Verification Lead must acknowledge and schedule a targeted MC/DC expansion campaign.

5. **Self-Test Regression**: After Legion v2.4.1 deployment, the recursive self-test campaign detects a regression in the Mapper Agent's coverage calculation logic. Finding is Critical. Platform is rolled back to v2.4.0 automatically via CI integration.

6. **Flaky Finding**: Agent-022 reports the same anomaly as both `Confirmed` and `False Positive` in consecutive runs against identical SUT state. Flaky test rate for this agent rises to 14%. Investigation reveals a race condition in the agent's internal timer — a platform bug, not a SUT bug.

7. **Orphaned Campaign**: A Campaign is found in `Executing` state but all 50 agents show `Idle`. Orphaned campaign created when the Orchestrator lost its connection to the agent registry. Campaign requires manual `Abort` and re-launch.

8. **Zero-Finding Edge**: A Campaign completes with Integrity Score 97 and zero open findings. This is the rare ideal state. Platform marks it with a `Clean Bill` designation. Scribe Agent generates a certification-ready summary artifact.

---

## What Would Impress a Domain Expert

1. **DAL Badge on Every Campaign** — A DO-178C Design Assurance Level badge (A/B/C/D) displayed prominently on Campaign cards and in the Findings Tracker column. Any A&D engineer who sees this immediately knows the developer has read a compliance standard, not just Googled "QA testing". Most commercial QA tools don't expose DAL at the UI level.

2. **MC/DC Coverage as a Separate KPI from Statement Coverage** — Generic dashboards show one "coverage %" metric. Practitioners who work on DO-178C compliance track Statement, Decision, Branch, and MC/DC separately because different DAL levels require different coverage types. A dashboard that breaks these out as four distinct KPI cards is instantly recognizable as domain-correct.

3. **Findings "Waiver" Disposition State** — In A&D software quality, a known fault can be formally accepted with documented rationale in what is called a Waiver. This is a distinct audit artifact. Most consumer QA tools have "won't fix" or "accepted". Using "Waiver" as a Finding disposition state — with a Verification Lead authorization requirement — signals deep compliance knowledge.

4. **Platform Integrity Report for Recursive Testing** — The concept that the platform generates its own certification-ready artifact when it tests itself is extremely specific to this job. Displaying a "Platform Integrity Report" as an exportable artifact in the Verification Reports tab shows the developer has understood the recursive nature of the work, not just read a job description.

5. **Agent Quarantine State** — When an agent behaves anomalously (reporting faults it shouldn't, or stalling), it is `Quarantined` rather than simply killed. The quarantine state implies: the agent's state is preserved for forensic investigation, it is isolated from the active fleet, and a diagnostic process begins. This mirrors how a real multi-agent orchestration system would handle a rogue or malfunctioning agent — and it shows the developer thinks about the platform as a system that can itself fail in interesting ways.

---

## Common Systems and Tools Used

| Tool | Purpose | Notes |
|---|---|---|
| LDRA Tool Suite | DO-178C compliance verification, structural coverage measurement, traceability matrix | Reference tool for A&D — LDRA is the industry-standard for airborne software verification |
| Parasoft C/C++test | Static analysis, unit testing, DO-178C reporting | Widely used in A&D embedded software development |
| Rapita Systems RVS | Structural coverage measurement for embedded targets | Specialist A&D tool — clients cite it when describing coverage gaps |
| Antithesis | Autonomous deterministic simulation testing | Closest conceptual peer to VILL-50 — different approach (deterministic hypervisor vs. agent swarm) |
| Datadog | Production monitoring, test visibility, real-time alerting | Reference for dashboard aesthetic and operator UX conventions |
| Grafana | Open-source metrics visualization, often used alongside test infrastructure | Practitioners building CI/CD pipelines often have Grafana dashboards for test metrics |
| JIRA + Xray | Requirements and test case management, traceability | Integration target for Scribe Agent output |
| Jenkins / GitLab CI | CI/CD pipeline orchestration | Campaign triggers integrate with pipeline events |
| Python (pytest) | Test framework — the platform is built in Python; agent test scripts use pytest conventions | Explicit in the job posting |
| Cursor (AI-native IDE) | The development environment used by the client's team | Explicit in the job posting — signals familiarity with AI-native development workflows |

---

## Geographic / Cultural Considerations

The job targets Aerospace and Defense customers in the US market. Key implications:

- **US regulatory context**: DO-178C is the FAA/EASA-referenced standard; MIL-STD-882E is the System Safety standard used by DoD contractors. Both are US-origin frameworks.
- **ITAR sensitivity**: A&D software development often falls under International Traffic in Arms Regulations. While this doesn't affect the demo directly, it signals why "on-premise" and "air-gapped deployment" matter to these customers — cloud-only testing platforms are frequently a disqualifier.
- **Date formats**: US date format (MM/DD/YYYY) for any displayed dates.
- **Time zones**: Eastern (ET) and Pacific (PT) most common; UTC for system timestamps (standard in technical tools).
- **Currency**: USD.

---

## Data Architect Notes

- **Primary entity**: `VerificationRun` — fields: `id` (VR-XXXXXX format), `campaignId`, `suiteId`, `status` (use exact status strings from this brief), `integrityScore` (0-100 integer), `structuralCoverage` (0-100 float), `mcdcCoverage` (0-100 float), `agentsDeployed` (integer, typically 50), `findingsCount` (integer), `duration` (minutes), `dalLevel` ("A"|"B"|"C"|"D"), `startedAt`, `completedAt`.
- **Agent entity**: `Agent` — fields: `id` (Agent-XXX format), `name` (e.g., "The Explorer"), `role` (enum: Orchestrator|Explorer|Sentinel|Healer|Analyst|Scribe|Injector|Inspector|Mapper|Archivist), `status` (Deployed|Exploring|Executing|Reporting|Idle|Stalled|Quarantined), `utilizationPct` (0-100), `tasksCompleted`, `currentTask`, `assignedCampaignId`.
- **Finding entity**: `Finding` — fields: `id` (FIND-XXXXXX format), `campaignId`, `agentId`, `severity` ("Critical"|"High"|"Medium"|"Low"), `status` (Open|Confirmed|Investigating|Resolved|Waived|FalsePositive), `title`, `description`, `dalImpact` ("A"|"B"|"C"|"D"|null), `reproducible` (boolean), `discoveredAt`, `resolvedAt` (nullable).
- **Campaign entity**: `Campaign` — fields: `id` (CAMP-XXXXXX), `name`, `targetSystem`, `dalTarget` ("A"|"B"|"C"|"D"), `status`, `integrityScore`, `structuralCoverage`, `mcdcCoverage`, `agentsDeployed`, `openFindings`, `startedAt`, `completedAt`, `createdBy`.
- Use `VR-` prefix for verification run IDs, `CAMP-` for campaigns, `FIND-` for findings, `AGT-` for agents.
- Include at least 2 edge case records per dataset: one stalled/quarantined agent, one campaign with status `Compliance Gap`, one Finding with status `Waived`, one with `False Positive`.
- Integrity Score ranges: 52-97 for campaigns, with at least one below 70 (flagged state) and one at 97 (clean).
- Coverage data for time-series chart: 6 months of monthly structural coverage readings showing an improvement trend from ~71% to ~89% — realistic production hardening arc.
- Agent names: use the role-based naming convention (The Explorer, The Sentinel, etc.) — not generic "Agent 01".

## Layout Builder Notes

- **Density**: Compact. This is operator tooling. `--content-padding: 1rem`, `--card-padding: 1rem`, `--nav-item-py: 0.375rem`. Tight table rows. Practitioners work in Datadog and LDRA every day — generous whitespace signals consumer-grade.
- **Sidebar width**: 15rem — slightly narrower than standard (16rem) to maximize the content area. The nav labels are medium-length ("Legion Console", "Campaign Board") — they fit at 15rem.
- **Dark background**: The `--background` must be near-black, approximately `oklch(0.10 0.02 240)`. Not pure black — a very subtle chromatic undertone in the blue-indigo range.
- **Sidebar**: Dark sidebar with luminous active state. `--sidebar-bg` should be slightly lighter than background, e.g., `oklch(0.13 0.02 240)`, to create a subtle two-surface depth.
- **Primary accent**: Electric teal-cyan — `oklch(0.72 0.20 200)` approximately. This is distinct from the overused blue of generic dark SaaS and matches Antithesis's AI-native precision aesthetic.
- **Status badge colors**: Critical = red `oklch(0.55 0.22 25)`, High = orange `oklch(0.65 0.18 55)`, Medium = amber `oklch(0.75 0.18 85)`, Low = slate `oklch(0.60 0.04 240)`. Use semantic tokens, not hardcoded colors.
- **Monospace for data values**: All numeric columns, IDs, coverage percentages, and integrity scores must use `font-mono tabular-nums`. This is non-negotiable for technical tooling — it signals precision.
- **Agent status tiles**: The Legion Console grid should use tight tiles with status dot indicators — like a server status board. 5 columns x 10 rows = 50 tiles. Each tile: agent ID, role name, status dot (color-coded), utilization sparkline.

## Demo Screen Builder Notes

- **Hero metric**: Integrity Score — displayed as a large radial gauge or prominent number (e.g., "87") with a subtitle "System Integrity" and a trend arrow. This is the single-number answer to "is the platform working?" and practitioners want to see it at a glance.
- **Primary chart**: Line chart (not area) showing Structural Coverage % and MC/DC Coverage % as two separate lines over the past 6 months. Two lines showing the gap between structural coverage (higher) and MC/DC (lower, harder to achieve) tells the production hardening story in a single visualization.
- **Agent utilization bar chart**: Horizontal bar chart or radial gauge showing total Legion utilization (e.g., "71% — 36 of 50 agents active"). This is specific to VILL-50 and immediately signals this is not a generic QA dashboard.
- **Live activity feed**: A right-panel "Legion Activity" feed showing real-time agent events: "Agent-003 Sentinel blocked Campaign CAMP-0047 — Compliance Gap detected", "Agent-022 Explorer flagged FIND-000183 — Critical", "Agent-010 Archivist generated RTM artifact for CAMP-0041". This is the most visually impressive and domain-specific panel in the dashboard.
- **KPI stat cards row** (top of dashboard): Integrity Score (large, with color coding), Structural Coverage %, MC/DC Coverage %, Active Campaigns, Open Findings (with red badge if >10), Agent Utilization %.
- **For the Campaign Board page**: Table with columns Campaign Name | DAL | Status | Integrity Score | Coverage | Open Findings | Duration | Started. The DAL column with A/B/C/D badges is the domain-specific differentiator.
- **For the Findings Tracker page**: Table sorted by severity (Critical first). Columns: Finding ID | Severity | Title | Campaign | DAL Impact | Status | Discovered | Agent. A severity filter dropdown (Critical/High/Medium/Low) is the primary interactive control.
- **Format**: dashboard-app with dark-premium aesthetic. Sidebar is always visible on desktop; hamburger on mobile.
