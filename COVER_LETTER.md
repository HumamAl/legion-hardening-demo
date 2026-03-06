Hi,

Recursive testing, where a platform uses its own 50-agent colony to validate itself, is the kind of multi-layered logic where bugs in the test harness and bugs in the product become hard to separate. Built a working demo for this: {VERCEL_URL}

It covers agent coordination, run status, and failure triage the way production-hardened tooling needs it. Previously built the WMF Agent Dashboard for manufacturing. Took their quote review from 4 hours to 20 minutes. Different domain, same debugging discipline.

Are the 50 agents reporting through a central coordinator or writing independently to a shared state store? That shapes the integrity layer significantly.

Quick call or I can scope the first sprint in a doc. Your pick.

Humam
