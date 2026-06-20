import type { Domain, Persona, TimeBucket, Effort, RoadmapItem } from './types'

interface ActionTemplate {
  actions: Record<Domain, Record<Persona, string>>
  outcomes: Record<Domain, string>
  effort: Effort
  owners: Record<Persona, string>
}

const TEMPLATES: Record<string, ActionTemplate> = {
  gov_1: {
    actions: {
      martech: {
        cto: 'Launch a data catalog initiative covering CRM, CDP, and ad platforms with ownership mapping and lineage documentation',
        data_scientist: 'Document all accessible Martech datasets in a shared catalog with schema, freshness, and quality notes',
        hr: 'Define data stewardship roles for marketing teams and communicate data ownership responsibilities org-wide',
      },
      bfsi: {
        cto: 'Deploy an enterprise data catalog covering financial and customer data assets with regulatory lineage tracking',
        data_scientist: 'Catalog available BFSI datasets (transactions, credit, claims) with regulatory tags and quality metadata',
        hr: 'Create awareness programs helping employees understand data ownership obligations under DPDP and sector regulations',
      },
    },
    outcomes: {
      martech: 'Faster AI/ML development with reduced data discovery overhead and clearer accountability',
      bfsi: 'Regulatory audit-readiness and reduced model development friction through structured data discovery',
    },
    effort: 'High',
    owners: {
      cto: 'CTO / Chief Data Officer',
      data_scientist: 'Lead Data Scientist + Data Engineering',
      hr: 'HR & Designated Data Stewards',
    },
  },
  gov_2: {
    actions: {
      martech: {
        cto: 'Implement automated data quality gates in Martech ETL pipelines using dbt tests or Great Expectations',
        data_scientist: 'Define and enforce data quality SLAs for campaign, behavioral, and conversion datasets used in ML',
        hr: 'Run workshops for marketing staff on data quality impact and how to flag issues through proper channels',
      },
      bfsi: {
        cto: 'Implement regulatory-grade data quality controls in all financial data pipelines with automated alerts and SLAs',
        data_scientist: 'Define feature-level data quality contracts for BFSI ML use cases (credit, fraud, claims)',
        hr: 'Train staff on data quality obligations and their personal accountability for clean financial data entry',
      },
    },
    outcomes: {
      martech: 'Trustworthy training data that reduces model failures and retraining costs',
      bfsi: 'Compliant, high-quality data pipeline that reduces model risk and regulatory exposure',
    },
    effort: 'Medium',
    owners: {
      cto: 'Head of Data Engineering',
      data_scientist: 'Lead Data Scientist',
      hr: 'HR Learning & Development',
    },
  },
  gov_3: {
    actions: {
      martech: {
        cto: 'Embed GDPR/DPDP controls natively in data pipelines — PII tokenization, consent enforcement, and deletion workflows',
        data_scientist: 'Implement privacy-preserving ML techniques (PII masking, consent-filtered datasets) for all model training',
        hr: 'Deliver privacy awareness training for all marketing staff; make completion mandatory and tracked',
      },
      bfsi: {
        cto: 'Integrate RBI/SEBI/IRDAI/DPDP compliance controls into all data pipelines with automated audit reporting',
        data_scientist: 'Build compliance-aware ML pipelines with PII masking, audit logging, and regulatory reporting hooks',
        hr: 'Mandate quarterly compliance training covering data privacy laws and specific employee obligations in BFSI',
      },
    },
    outcomes: {
      martech: 'Compliant AI pipelines that reduce legal risk and enable customer trust',
      bfsi: 'Regulator-ready AI infrastructure with built-in audit trails and zero manual compliance overhead',
    },
    effort: 'High',
    owners: {
      cto: 'CTO + Chief Privacy Officer',
      data_scientist: 'Lead Data Scientist + Legal/Compliance',
      hr: 'HR Compliance & Training Team',
    },
  },
  gov_4: {
    actions: {
      martech: {
        cto: 'Deploy a data classification framework (PII/sensitive/public) with automated tagging across the Martech stack',
        data_scientist: 'Apply sensitivity classification to all ML training datasets and enforce appropriate usage policies',
        hr: 'Train marketing staff to identify and handle sensitive customer data based on classification standards',
      },
      bfsi: {
        cto: 'Implement automated data classification with masking and access controls across dev, staging, and production',
        data_scientist: 'Apply regulatory data classification tags to all BFSI ML datasets with access controls by classification level',
        hr: 'Conduct mandatory data classification training for all staff touching financial data across business units',
      },
    },
    outcomes: {
      martech: 'Reduced data misuse risk and streamlined access controls for AI development',
      bfsi: 'Consistent data protection across environments reducing breach risk and regulatory penalties',
    },
    effort: 'Medium',
    owners: {
      cto: 'Head of Data & Security',
      data_scientist: 'Lead Data Scientist',
      hr: 'HR Training & Compliance',
    },
  },
  gov_5: {
    actions: {
      martech: {
        cto: 'Establish a model registry with versioning, performance tracking, drift monitoring, and audit trails for all AI models',
        data_scientist: 'Set up MLflow or similar for experiment tracking, model versioning, and production deployment governance',
        hr: 'Communicate AI governance standards to business stakeholders and define accountability for deployed Martech models',
      },
      bfsi: {
        cto: 'Implement regulatory-grade model governance including explainability reports, bias audits, and regulatory filing workflows',
        data_scientist: 'Deploy a model registry with regulatory metadata, explainability artifacts, and automated drift monitoring',
        hr: 'Train business and compliance staff on AI model governance requirements and automated decisioning accountability',
      },
    },
    outcomes: {
      martech: 'Governed AI deployment that reduces technical debt and enables rapid iteration with confidence',
      bfsi: 'Regulator-ready model governance that enables autonomous decisioning within compliance guardrails',
    },
    effort: 'High',
    owners: {
      cto: 'CTO / Head of AI Platform',
      data_scientist: 'Lead Data Scientist + MLOps Engineer',
      hr: 'HR + Model Risk Management',
    },
  },
  tech_1: {
    actions: {
      martech: {
        cto: 'Migrate to a modern cloud data lakehouse (Snowflake, Databricks, or BigQuery) optimized for GenAI workloads',
        data_scientist: 'Define technical requirements for a Martech data platform that supports ML experimentation and GenAI',
        hr: 'Plan change management and training for affected teams during the data platform migration',
      },
      bfsi: {
        cto: 'Evaluate and implement a secure, regulated cloud or hybrid data platform capable of BFSI AI/analytics workloads',
        data_scientist: 'Define BFSI-specific technical requirements for a compliant data platform that supports ML pipelines',
        hr: 'Coordinate training and change management for platform adoption across both business and technology teams',
      },
    },
    outcomes: {
      martech: 'Unified data foundation enabling faster AI experimentation and production GenAI deployment',
      bfsi: 'Scalable, compliant AI infrastructure that reduces time-to-model and supports regulatory requirements',
    },
    effort: 'High',
    owners: {
      cto: 'CTO / Head of Data Engineering',
      data_scientist: 'Lead Data Scientist (Technical Advisor)',
      hr: 'HR Change Management Lead',
    },
  },
  tech_2: {
    actions: {
      martech: {
        cto: 'Build a unified API integration layer connecting the Martech stack (CRM, CDP, ad platforms) to AI/ML infrastructure',
        data_scientist: 'Map and document integration points between Martech tools and ML platforms; identify data access gaps',
        hr: 'Work with IT to ensure Martech staff have properly licensed and integrated access to AI tools',
      },
      bfsi: {
        cto: 'Develop a secure API integration layer connecting core banking/insurance/trading systems to AI/ML infrastructure',
        data_scientist: 'Identify and document data access patterns from core BFSI systems needed for ML model development',
        hr: 'Coordinate onboarding and access provisioning workflows for AI tools integrated with regulated BFSI systems',
      },
    },
    outcomes: {
      martech: 'Seamless data flow enabling real-time AI features across the full Martech ecosystem',
      bfsi: 'Secure, audited API layer enabling AI-powered decisioning within regulatory boundaries',
    },
    effort: 'High',
    owners: {
      cto: 'CTO / Head of Platform Engineering',
      data_scientist: 'Lead Data Scientist + Data Engineers',
      hr: 'HR IT Partnership Manager',
    },
  },
  tech_3: {
    actions: {
      martech: {
        cto: 'Deploy a model serving platform (Seldon, BentoML, or cloud ML endpoints) for real-time Martech personalization',
        data_scientist: 'Design and implement real-time inference pipelines for personalization or next-best-action models',
        hr: 'Prepare marketing teams for AI-assisted real-time decisioning workflows with role-specific tool training',
      },
      bfsi: {
        cto: 'Build low-latency model serving infrastructure for fraud detection, credit scoring, and real-time risk decisioning',
        data_scientist: 'Develop and test real-time inference pipelines meeting BFSI latency SLAs for risk and decisioning models',
        hr: 'Train operations and relationship manager staff on AI-assisted decisioning workflows and escalation procedures',
      },
    },
    outcomes: {
      martech: 'Real-time AI personalization capability driving measurable uplift in conversion and engagement',
      bfsi: 'Sub-second AI decisioning for fraud and credit that reduces losses and improves customer experience',
    },
    effort: 'High',
    owners: {
      cto: 'CTO / Head of AI Engineering',
      data_scientist: 'Lead Data Scientist + MLOps Team',
      hr: 'HR Training & Operations Lead',
    },
  },
  tech_4: {
    actions: {
      martech: {
        cto: 'Identify, pilot, and productionize a high-value GenAI use case (content generation, campaign optimization, or customer insights)',
        data_scientist: 'Build a RAG pipeline or fine-tuned LLM for a specific Martech use case as a production-ready pilot',
        hr: 'Identify top GenAI tool candidates for marketing productivity and run a structured 30-day adoption pilot',
      },
      bfsi: {
        cto: 'Deploy a GenAI pilot (document intelligence, customer copilot, or regulatory summarization) to production with controls',
        data_scientist: 'Implement a compliant GenAI proof-of-concept (document AI, report generation) with regulatory guardrails',
        hr: 'Assess GenAI tool readiness for BFSI compliance and design a structured employee adoption and training program',
      },
    },
    outcomes: {
      martech: 'First GenAI production win demonstrating measurable ROI and building internal confidence',
      bfsi: 'Regulatory-compliant GenAI capability that creates competitive differentiation in customer experience',
    },
    effort: 'Medium',
    owners: {
      cto: 'CTO / Head of AI Innovation',
      data_scientist: 'Lead Data Scientist',
      hr: 'HR Digital Adoption Lead',
    },
  },
  tech_5: {
    actions: {
      martech: {
        cto: 'Implement automated model monitoring with drift detection, performance alerts, and retraining triggers',
        data_scientist: 'Set up production model monitoring using Evidently, Arize, or Grafana with alerting and auto-retraining pipelines',
        hr: 'Document model performance review cadences and assign business-side accountability for Martech model health',
      },
      bfsi: {
        cto: 'Deploy model monitoring with regulatory audit logging, drift detection, and automated performance reporting',
        data_scientist: 'Implement continuous monitoring with explainability drift alerts and regulatory reporting pipelines',
        hr: 'Train model risk management and compliance teams on AI monitoring tools and reporting procedures',
      },
    },
    outcomes: {
      martech: 'Reliable AI operations that catch model degradation before it impacts campaign performance',
      bfsi: 'Continuous model health assurance enabling regulatory confidence and operational resilience',
    },
    effort: 'Medium',
    owners: {
      cto: 'Head of AI Platform / MLOps',
      data_scientist: 'Lead Data Scientist + MLOps Engineer',
      hr: 'HR + Model Risk Team',
    },
  },
  ppl_1: {
    actions: {
      martech: {
        cto: 'Audit current Martech AI/ML team capacity and launch targeted recruitment for GenAI-skilled engineers',
        data_scientist: 'Map team expertise gaps in GenAI and recommend a targeted hiring or upskilling roadmap',
        hr: 'Revise JDs and sourcing strategies to attract GenAI-specialized talent to the Martech function',
      },
      bfsi: {
        cto: 'Assess AI team composition against BFSI use case needs and initiate targeted AI talent acquisition',
        data_scientist: 'Map current team expertise against BFSI ML requirements and recommend specific hires or rotations',
        hr: 'Design a BFSI-specific AI talent acquisition strategy with domain-aware JDs and competitive compensation packages',
      },
    },
    outcomes: {
      martech: 'Right-sized AI team capable of delivering production GenAI features across the Martech stack',
      bfsi: 'BFSI-literate AI team capable of navigating both technical and regulatory complexity',
    },
    effort: 'High',
    owners: {
      cto: 'CTO + HR Talent Acquisition',
      data_scientist: 'Lead Data Scientist (Advisor)',
      hr: 'HR Talent Acquisition Lead',
    },
  },
  ppl_2: {
    actions: {
      martech: {
        cto: 'Build an AI skills matrix for all Martech technology roles and integrate it into quarterly talent reviews',
        data_scientist: 'Contribute expertise to a team-level AI skills map identifying GenAI competency gaps',
        hr: 'Create and maintain an AI skills taxonomy for Martech; use in hiring, L&D planning, and promotions',
      },
      bfsi: {
        cto: 'Develop a BFSI-specific AI skills matrix covering both domain expertise and technical AI capabilities',
        data_scientist: 'Define technical skill benchmarks for BFSI data science roles and assess team gaps against them',
        hr: 'Build an AI skills framework integrated with BFSI job families, grading, and workforce planning cycles',
      },
    },
    outcomes: {
      martech: 'Structured visibility into team capabilities enabling data-driven hiring and L&D investment',
      bfsi: 'Workforce planning grounded in actual AI skill gaps across business and technology functions',
    },
    effort: 'Low',
    owners: {
      cto: 'CTO + L&D Partner',
      data_scientist: 'Lead Data Scientist',
      hr: 'HR Learning & Development',
    },
  },
  ppl_3: {
    actions: {
      martech: {
        cto: 'Fund and launch a structured GenAI literacy program covering both technical staff and marketing business users',
        data_scientist: 'Set up an internal AI learning community with GenAI workshops, paper reading groups, and hackathons',
        hr: 'Design and deploy an AI upskilling curriculum for non-technical Martech staff; track completion and impact',
      },
      bfsi: {
        cto: 'Fund a structured AI upskilling program covering risk, compliance, ops, and technical BFSI staff',
        data_scientist: 'Organize internal BFSI AI workshops on regulatory ML, explainability, and GenAI for team upskilling',
        hr: 'Partner with edtech providers for BFSI-specific AI certifications; mandate completion for key roles',
      },
    },
    outcomes: {
      martech: 'Org-wide AI fluency enabling faster adoption and business-led AI use case identification',
      bfsi: 'AI-ready workforce across business and tech functions capable of driving compliant AI initiatives',
    },
    effort: 'Medium',
    owners: {
      cto: 'CTO / Head of Engineering',
      data_scientist: 'Lead Data Scientist',
      hr: 'HR L&D Lead',
    },
  },
  ppl_4: {
    actions: {
      martech: {
        cto: 'Run a CMO/leadership AI immersion workshop covering GenAI capabilities, limitations, and Martech ROI',
        data_scientist: 'Create an "AI for Business Leaders" briefing to bridge the gap between technical and strategic understanding',
        hr: 'Schedule AI literacy training for all senior marketing leaders; include in leadership onboarding program',
      },
      bfsi: {
        cto: 'Organize a board-level AI briefing covering regulatory AI risks, strategic opportunities, and governance expectations',
        data_scientist: 'Develop AI explainability briefings for C-suite and risk/compliance leadership on model decisions',
        hr: 'Mandate AI literacy training for all C-suite members; include AI ethics module in executive education programs',
      },
    },
    outcomes: {
      martech: 'AI-literate leadership capable of asking the right questions and sponsoring the right initiatives',
      bfsi: 'Informed board and C-suite enabling confident AI governance and strategic AI investment decisions',
    },
    effort: 'Low',
    owners: {
      cto: 'CTO + External AI Advisor',
      data_scientist: 'Lead Data Scientist (Facilitator)',
      hr: 'HR Executive Development',
    },
  },
  ppl_5: {
    actions: {
      martech: {
        cto: 'Develop an AI talent retention package: competitive comp bands, learning budgets, and flagship project exposure',
        data_scientist: 'Create a defined career ladder for AI/ML roles with clear progression from DS to senior AI architect',
        hr: 'Run an AI talent pulse survey; address top retention risks through compensation benchmarking and career planning',
      },
      bfsi: {
        cto: 'Design a BFSI AI talent retention strategy that competes with fintech startups and Big Tech employers',
        data_scientist: 'Define and advocate for growth-oriented career paths for data scientists in regulated BFSI environments',
        hr: 'Benchmark BFSI AI compensation vs market; implement retention bonuses and structured career development plans',
      },
    },
    outcomes: {
      martech: 'Reduced attrition of high-value AI talent enabling consistent progress on AI roadmap',
      bfsi: 'Stable AI team capable of building institutional knowledge in a complex regulated domain',
    },
    effort: 'Medium',
    owners: {
      cto: 'CTO + Total Rewards',
      data_scientist: 'Lead Data Scientist (Input)',
      hr: 'HR Talent Retention Lead',
    },
  },
  clt_1: {
    actions: {
      martech: {
        cto: 'Facilitate a C-suite AI strategy workshop; produce a documented AI roadmap aligned to CMO priorities and reviewed annually',
        data_scientist: 'Contribute a technical feasibility and ROI analysis to inform and ground the Martech AI strategy',
        hr: 'Ensure people and change management considerations are formally embedded in the AI strategy document',
      },
      bfsi: {
        cto: 'Lead development of a Board-approved AI strategy aligned to regulatory requirements and business growth objectives',
        data_scientist: 'Provide technical input on AI feasibility and regulatory risk for BFSI AI strategy planning sessions',
        hr: 'Embed workforce transformation and people strategy components in the BFSI AI strategic plan',
      },
    },
    outcomes: {
      martech: 'Aligned AI direction enabling focused investment and consistent AI project prioritization',
      bfsi: 'Governance-ready AI strategy enabling confident board oversight and investment prioritization',
    },
    effort: 'Medium',
    owners: {
      cto: 'CTO + CEO/CMO',
      data_scientist: 'Lead Data Scientist (Contributor)',
      hr: 'CHRO + Strategy Team',
    },
  },
  clt_2: {
    actions: {
      martech: {
        cto: 'Secure a dedicated AI investment budget with executive sponsorship; establish an AI steering committee',
        data_scientist: 'Build an AI ROI business case with concrete KPIs and quick-win examples to secure executive funding',
        hr: 'Partner with finance to quantify the AI talent investment ROI to support executive budget approval',
      },
      bfsi: {
        cto: 'Obtain board-level endorsement for AI investment with dedicated budget line and formal governance structure',
        data_scientist: 'Develop a compelling BFSI AI value case (fraud reduction, cost savings, CX uplift) to secure executive funding',
        hr: 'Quantify HR costs of AI skills gaps and present to leadership as basis for L&D investment approval',
      },
    },
    outcomes: {
      martech: 'Secured AI budget enabling consistent investment without project-by-project justification',
      bfsi: 'Committed AI investment enabling multi-year programs rather than ad hoc pilots',
    },
    effort: 'Medium',
    owners: {
      cto: 'CTO + CFO',
      data_scientist: 'Lead Data Scientist (Advisor)',
      hr: 'CHRO + Finance Partner',
    },
  },
  clt_3: {
    actions: {
      martech: {
        cto: 'Establish cross-functional AI squads with marketing, data science, and IT co-located on key use cases',
        data_scientist: 'Set up regular syncs with marketing stakeholders to co-translate business problems into ML tasks',
        hr: 'Facilitate collaboration workshops between marketing and data science teams; build shared vocabulary',
      },
      bfsi: {
        cto: 'Create AI squads combining business, technology, risk, and compliance for each strategic AI initiative',
        data_scientist: 'Propose and lead joint working sessions with risk and compliance to align on AI use case design',
        hr: 'Design cross-functional AI collaboration programs addressing cultural barriers between business and data teams',
      },
    },
    outcomes: {
      martech: 'Faster AI product delivery through aligned, co-located multi-disciplinary teams',
      bfsi: 'Risk-aware AI development through integrated collaboration between technical and governance functions',
    },
    effort: 'Medium',
    owners: {
      cto: 'CTO + CMO (Joint)',
      data_scientist: 'Lead Data Scientist',
      hr: 'HR Organizational Development',
    },
  },
  clt_4: {
    actions: {
      martech: {
        cto: 'Establish a structured AI experimentation framework with "fail-fast" criteria, learning docs, and innovation time',
        data_scientist: 'Implement an experiment ledger documenting failed pilots, key learnings, and follow-on hypotheses',
        hr: 'Update performance management to reward AI experimentation and remove punitive consequences for failed pilots',
      },
      bfsi: {
        cto: 'Create a formal AI experimentation governance framework with risk-bounded pilot methodology and clear metrics',
        data_scientist: 'Document and socialize experiment learnings across the BFSI data science community via internal channels',
        hr: 'Reframe failed AI experiments in BFSI performance reviews as institutional learning milestones',
      },
    },
    outcomes: {
      martech: 'Faster innovation cycles with institutional learning from both successful and failed AI experiments',
      bfsi: 'Risk-managed AI innovation pipeline that balances regulatory caution with competitive experimentation',
    },
    effort: 'Low',
    owners: {
      cto: 'CTO / Head of AI Innovation',
      data_scientist: 'Lead Data Scientist',
      hr: 'HR Performance Management Lead',
    },
  },
  clt_5: {
    actions: {
      martech: {
        cto: 'Draft and publish a Responsible AI charter covering bias, transparency, and ethical data use in Martech AI',
        data_scientist: 'Implement bias detection and fairness auditing in all customer-facing Martech ML models',
        hr: 'Deliver company-wide AI ethics training; ensure all staff understand the responsible AI charter requirements',
      },
      bfsi: {
        cto: 'Implement an algorithmic accountability framework with regulatory-aligned AI ethics governance and audit rights',
        data_scientist: 'Integrate bias and fairness auditing into model validation workflows for all BFSI decisioning models',
        hr: 'Conduct mandatory AI ethics training for all staff; monitor comprehension through assessments and certifications',
      },
    },
    outcomes: {
      martech: 'Trusted AI systems that protect brand reputation and customer relationships',
      bfsi: 'Regulatory-compliant AI deployment with demonstrable fairness reducing legal and reputational risk',
    },
    effort: 'Medium',
    owners: {
      cto: 'CTO + Legal/Ethics Committee',
      data_scientist: 'Lead Data Scientist + Ethics Reviewer',
      hr: 'HR + Compliance Training',
    },
  },
}

function scoreToBucket(score: number): TimeBucket {
  if (score <= 1) return 'immediate'
  if (score <= 2) return 'short'
  if (score <= 3) return 'medium'
  return 'long'
}

export function generateRoadmap(
  answers: Record<string, number>,
  domain: Domain,
  persona: Persona
): Record<TimeBucket, RoadmapItem[]> {
  const result: Record<TimeBucket, RoadmapItem[]> = {
    immediate: [],
    short: [],
    medium: [],
    long: [],
  }

  const questionIds = Object.keys(TEMPLATES)

  for (const questionId of questionIds) {
    const score = answers[questionId] ?? 3
    const bucket = scoreToBucket(score)
    const template = TEMPLATES[questionId]

    const action =
      template.actions[domain]?.[persona] ??
      template.actions[domain]?.cto ??
      'Review and improve this capability area'

    const outcome = template.outcomes[domain] ?? 'Improved organizational AI maturity'
    const owner = template.owners[persona] ?? 'AI Leadership Team'

    let adjustedAction = action
    if (score >= 4) {
      adjustedAction = `Sustain & benchmark: ${action.toLowerCase().replace(/^[a-z]/, (c) => c.toUpperCase())}`
    }

    result[bucket].push({
      id: `${questionId}_roadmap`,
      action: adjustedAction,
      owner,
      outcome,
      effort: template.effort,
      bucket,
      questionId,
      score,
    })
  }

  // Sort each bucket by score ascending (lowest first = highest priority)
  for (const bucket of Object.keys(result) as TimeBucket[]) {
    result[bucket].sort((a, b) => a.score - b.score)
  }

  return result
}

export const BUCKET_LABELS: Record<TimeBucket, { label: string; range: string; color: string; bg: string }> = {
  immediate: {
    label: 'Immediate',
    range: 'Weeks 1–4',
    color: 'text-red-400',
    bg: 'bg-red-950/40 border-red-800/50',
  },
  short: {
    label: 'Short Term',
    range: 'Weeks 5–8',
    color: 'text-amber-400',
    bg: 'bg-amber-950/40 border-amber-800/50',
  },
  medium: {
    label: 'Medium Term',
    range: 'Weeks 9–12',
    color: 'text-blue-400',
    bg: 'bg-blue-950/40 border-blue-800/50',
  },
  long: {
    label: 'Long Term',
    range: 'Week 13+',
    color: 'text-emerald-400',
    bg: 'bg-emerald-950/40 border-emerald-800/50',
  },
}

export const EFFORT_COLORS: Record<string, string> = {
  Low: 'bg-emerald-900/60 text-emerald-300 border border-emerald-700/50',
  Medium: 'bg-amber-900/60 text-amber-300 border border-amber-700/50',
  High: 'bg-red-900/60 text-red-300 border border-red-700/50',
}
