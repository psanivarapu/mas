import type { TimeBucket, Effort, RoadmapItem } from './types'

interface ActionTemplate {
  action: string
  outcome: string
  effort: Effort
  owner: string
}

const TEMPLATES: Record<string, ActionTemplate> = {
  gov_1: {
    action:
      'Launch a Group-wide data catalog initiative covering production, supply chain, and financial data, with clear ownership and lineage mapping.',
    outcome: 'Faster, more trustworthy analytics and AI development with reduced data discovery overhead.',
    effort: 'High',
    owner: 'Group Data & Analytics Lead',
  },
  gov_2: {
    action: 'Implement automated data quality checks and validation gates before data is used in analytics or AI models.',
    outcome: 'Higher-confidence models and dashboards, with fewer downstream errors caused by bad data.',
    effort: 'Medium',
    owner: 'Head of Data Engineering',
  },
  gov_3: {
    action:
      'Embed privacy and regulatory compliance controls (e.g., PDPA, sector regulations) directly into data collection and pipeline design.',
    outcome: 'Reduced compliance risk and audit-readiness across all data-driven initiatives.',
    effort: 'High',
    owner: 'Compliance & Data Governance Team',
  },
  gov_4: {
    action:
      'Roll out a data classification framework (customer, supplier, financial, HR) with access controls enforced by classification level.',
    outcome: 'Lower risk of data misuse or breach, and clearer accountability for sensitive data handling.',
    effort: 'Medium',
    owner: 'IT Security & Data Governance',
  },
  gov_5: {
    action:
      'Establish formal AI/analytics model governance, including ownership, performance monitoring, and audit trails for any model used in decision-making.',
    outcome: 'Governed, auditable AI use that builds trust with leadership and regulators alike.',
    effort: 'High',
    owner: 'AI/Analytics Governance Lead',
  },
  tech_1: {
    action:
      'Evaluate and adopt a modern, scalable data platform (cloud or hybrid) capable of supporting advanced analytics and AI across the Group.',
    outcome: 'A unified data foundation that accelerates every future analytics and AI initiative.',
    effort: 'High',
    owner: 'Group IT / Head of Infrastructure',
  },
  tech_2: {
    action: 'Build integration between core systems (ERP, MES, CRM, supply chain) to enable cross-functional analytics.',
    outcome: 'Fewer data silos and faster, more complete cross-functional reporting and insight.',
    effort: 'High',
    owner: 'Enterprise Systems / IT Integration Lead',
  },
  tech_3: {
    action:
      'Stand up infrastructure to deploy AI/ML models into live operations, starting with one high-value use case (e.g., demand forecasting or defect detection).',
    outcome: 'A working example of AI in production that builds momentum for further adoption.',
    effort: 'High',
    owner: 'Analytics/AI Engineering Lead',
  },
  tech_4: {
    action: 'Pilot a GenAI tool (copilot, document intelligence, or forecasting assistant) in one function and measure adoption and impact.',
    outcome: 'A concrete, low-risk GenAI win that demonstrates value before wider rollout.',
    effort: 'Medium',
    owner: 'Digital/GenAI Innovation Lead',
  },
  tech_5: {
    action:
      'Put model/analytics performance monitoring in place, with a defined process for retraining or updating tools that drift or degrade.',
    outcome: 'Reliable AI/analytics tools that stay accurate and useful over time.',
    effort: 'Medium',
    owner: 'Analytics/AI Engineering Lead',
  },
  ppl_1: {
    action: 'Assess current data/analytics/AI capacity against functional needs and identify priority hiring or reskilling gaps.',
    outcome: 'A right-sized team capable of delivering on near-term analytics and AI priorities.',
    effort: 'High',
    owner: 'Function Head + HR Talent Partner',
  },
  ppl_2: {
    action:
      'Build a skills matrix comparing current team capabilities to future AI/analytics needs, and use it to guide hiring and L&D planning.',
    outcome: 'Clear, data-driven visibility into skill gaps that informs workforce planning.',
    effort: 'Low',
    owner: 'HR Learning & Development',
  },
  ppl_3: {
    action: 'Launch a structured AI/analytics upskilling program for both technical and non-technical staff.',
    outcome: 'Broader AI literacy across the organization, enabling faster and safer adoption.',
    effort: 'Medium',
    owner: 'HR L&D + Function Leaders',
  },
  ppl_4: {
    action: 'Run an AI literacy briefing for division leadership covering capabilities, limitations, and relevant use cases.',
    outcome: 'Leadership equipped to sponsor the right initiatives and ask the right questions.',
    effort: 'Low',
    owner: 'Division Leadership + External AI Advisor',
  },
  ppl_5: {
    action: 'Review compensation, career paths, and project exposure for data/AI roles to improve talent attraction and retention.',
    outcome: 'Reduced attrition of scarce AI/analytics talent and stronger institutional knowledge.',
    effort: 'Medium',
    owner: 'HR Talent & Total Rewards',
  },
  clt_1: {
    action: 'Facilitate a strategy workshop to produce a documented AI/analytics roadmap aligned to division business priorities.',
    outcome: 'A shared, prioritized direction for AI investment instead of disconnected pilots.',
    effort: 'Medium',
    owner: 'Division Leadership + Group Strategy',
  },
  clt_2: {
    action: 'Secure dedicated executive sponsorship and a defined budget line for AI/analytics initiatives.',
    outcome: 'Sustained investment in AI/analytics rather than one-off, project-by-project funding.',
    effort: 'Medium',
    owner: 'Division CXO + Finance',
  },
  clt_3: {
    action: 'Establish cross-functional working teams pairing business, IT, and data/analytics staff on priority initiatives.',
    outcome: 'Faster delivery of AI/analytics initiatives through closer day-to-day collaboration.',
    effort: 'Medium',
    owner: 'Function Head + IT/Analytics Lead',
  },
  clt_4: {
    action:
      'Introduce a lightweight framework for AI pilots — clear success criteria, fail-fast checkpoints, and shared learnings regardless of outcome.',
    outcome: 'Faster learning cycles and less fear around AI experiments that do not pan out.',
    effort: 'Low',
    owner: 'Division Leadership + Analytics Lead',
  },
  clt_5: {
    action: 'Publish a short responsible AI use policy covering bias, fairness, and appropriate use, and brief all relevant staff on it.',
    outcome: "Trusted, responsible AI use that protects the Group's reputation with customers and regulators.",
    effort: 'Medium',
    owner: 'Compliance + Group Legal',
  },
}

function scoreToBucket(score: number): TimeBucket {
  if (score <= 1) return 'immediate'
  if (score <= 2) return 'short'
  if (score <= 3) return 'medium'
  return 'long'
}

export function generateRoadmap(answers: Record<string, number>): Record<TimeBucket, RoadmapItem[]> {
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

    let adjustedAction = template.action
    if (score >= 4) {
      adjustedAction = `Sustain & benchmark: ${template.action.toLowerCase().replace(/^[a-z]/, (c) => c.toUpperCase())}`
    }

    result[bucket].push({
      id: `${questionId}_roadmap`,
      action: adjustedAction,
      owner: template.owner,
      outcome: template.outcome,
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
