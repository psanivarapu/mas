import type { Domain, Persona, SegmentKey, Question } from './types'

type QuestionSet = Record<SegmentKey, string[]>
type QuestionDatabase = Record<Domain, Record<Persona, QuestionSet>>

const QUESTION_DB: QuestionDatabase = {
  martech: {
    cto: {
      governance: [
        'Our marketing data assets (CRM, CDP, ad platforms) are catalogued with clear ownership and lineage.',
        'We have enforced data quality standards that are validated before any AI/ML model training.',
        'Privacy compliance (GDPR, DPDP) is embedded into our data pipelines, not bolted on.',
        'We have a data classification framework (PII, sensitive, public) applied across Martech data.',
        'AI/ML model governance — including versioning, drift monitoring, and audit trails — is formally established.',
      ],
      technology: [
        'We have a modern, scalable data platform (cloud data warehouse or lakehouse) that supports GenAI workloads.',
        'Our Martech stack integrates with AI/ML platforms via APIs or native connectors.',
        'We have infrastructure to deploy and serve ML models in real-time (e.g., for personalization, next-best-action).',
        'GenAI tools (LLMs, RAG, vector databases) are integrated into at least one production Martech workflow.',
        'Our AI infrastructure supports A/B testing, model monitoring, and automated retraining pipelines.',
      ],
      people: [
        'We have a sufficient number of data scientists and ML engineers with GenAI expertise in our Martech org.',
        'A skills matrix for AI/ML roles is maintained and used in hiring and development planning.',
        'We have a structured AI upskilling program for both technical and non-technical Martech employees.',
        'Leadership (CMO and direct reports) has a working understanding of AI capabilities and limitations.',
        'We can attract and retain top AI talent in a competitive market.',
      ],
      culture: [
        'The C-suite has a documented AI strategy that is aligned with business goals and reviewed annually.',
        'There is executive sponsorship with budget authority for AI/GenAI initiatives.',
        'Cross-functional collaboration between marketing, data science, and IT is the norm, not the exception.',
        'We have a culture that encourages experimentation — including tolerance for failed AI pilots.',
        'AI ethics, responsible use policies, and bias review processes are formally defined and enforced.',
      ],
    },
    data_scientist: {
      governance: [
        'I can access clean, labeled Martech datasets (campaign, behavioral, conversion) without significant prep effort.',
        'Feature stores or reusable data pipelines exist for common Martech ML use cases.',
        'Data versioning is in place so I can reproduce model experiments.',
        'I have visibility into data lineage when debugging model performance issues.',
        'A formal model registry tracks deployed models, their training data, and performance benchmarks.',
      ],
      technology: [
        'I have access to GPUs or cloud compute for training large models without long wait times.',
        'An MLOps platform (e.g., MLflow, Kubeflow, SageMaker) is used for model lifecycle management.',
        'I can access vector databases or embedding stores for GenAI/RAG use cases.',
        'CI/CD pipelines exist for deploying updated models to production without manual intervention.',
        'Experiment tracking, hyperparameter management, and model comparison tools are available to my team.',
      ],
      people: [
        'My team has strong proficiency in modern ML and GenAI techniques (fine-tuning, RAG, prompt engineering).',
        'There are dedicated data engineers who handle data pipeline work, freeing me to focus on modeling.',
        'Business stakeholders in marketing can communicate their problems in ways I can translate to ML tasks.',
        'I have access to external learning resources (courses, conferences, research) funded by the org.',
        'Junior data scientists on my team receive structured mentoring and growth opportunities.',
      ],
      culture: [
        'There is a clear process for prioritizing which AI/ML use cases to build and in what order.',
        'My team\'s work is recognized as strategic and tied to measurable business outcomes.',
        'Business teams are collaborative partners, not just requestors of models.',
        'Failed experiments are treated as learning opportunities, not career liabilities.',
        'I am included in strategic discussions about where AI can create competitive advantage.',
      ],
    },
    hr: {
      governance: [
        'Employees understand what customer data we collect and how it\'s used in AI/analytics.',
        'Training programs exist to help marketing staff handle data responsibly.',
        'Data stewardship roles are clearly defined and staffed across marketing teams.',
        'There are clear escalation paths when employees notice data quality or privacy issues.',
        'Leadership has communicated data ethics standards applicable to AI use in marketing.',
      ],
      technology: [
        'Marketing staff have access to intuitive AI-assisted tools that don\'t require coding skills.',
        'The organization provides licenses and access to modern analytics/GenAI tools for relevant roles.',
        'There is a process to evaluate and onboard new AI tools that employees request.',
        'IT support for AI tools is responsive and understands the marketing team\'s needs.',
        'Technology adoption is tracked, and underutilized tools are identified and addressed.',
      ],
      people: [
        'We have a clear AI skills taxonomy that guides hiring JDs and internal career paths.',
        'AI literacy training is available and attended by >50% of non-technical Martech staff.',
        'Performance management frameworks have been updated to reflect AI-related competencies.',
        'Employee satisfaction around AI tool adoption and training is regularly surveyed.',
        'We have a diversity strategy that intentionally builds AI teams with varied backgrounds.',
      ],
      culture: [
        'HR actively participates in AI strategy planning to ensure people implications are addressed upfront.',
        'Change management processes exist when AI tools replace or augment existing workflows.',
        'Employee concerns about AI (job displacement, bias, surveillance) are heard and addressed.',
        'The organization has a published responsible AI charter that all employees are aware of.',
        'AI adoption is tracked as a cultural KPI, not just a technology KPI.',
      ],
    },
  },
  bfsi: {
    cto: {
      governance: [
        'Our financial and customer data assets are catalogued with clear ownership and data lineage.',
        'We have enforced data quality standards validated before any model or analytics use.',
        'Regulatory compliance (RBI, SEBI, IRDAI, DPDP) is embedded into our data pipelines.',
        'Sensitive data (PII, financial records) is classified, masked, and governed across all environments.',
        'AI model governance — including audit trails, explainability, and regulatory reporting — is formally established.',
      ],
      technology: [
        'We have a scalable, secure data platform (cloud or hybrid) that supports advanced analytics and AI.',
        'Our core banking / insurance / trading systems integrate with AI/ML platforms via APIs.',
        'We can deploy models in real-time for risk scoring, fraud detection, or customer decisioning.',
        'GenAI capabilities (LLMs, document intelligence, copilots) are live in at least one production BFSI workflow.',
        'Our AI infrastructure includes model monitoring, explainability tooling, and automated retraining.',
      ],
      people: [
        'We have sufficient data scientists, ML engineers, and AI architects with BFSI domain expertise.',
        'A skills matrix for AI roles is maintained and integrated into workforce planning.',
        'A structured AI upskilling program exists for both technical and business staff (e.g., risk, compliance, ops).',
        'C-suite and board-level stakeholders have sufficient AI literacy for informed decision-making.',
        'We have effective strategies to attract and retain specialized AI talent in a regulated industry.',
      ],
      culture: [
        'There is a Board/C-suite approved AI strategy aligned to regulatory requirements and business goals.',
        'There is executive sponsorship with dedicated AI investment budget.',
        'Cross-functional AI squads (business, tech, risk, compliance) operate on strategic AI use cases.',
        'The organization has a structured AI experimentation framework with clear success metrics.',
        'An AI ethics policy, algorithmic accountability charter, and bias review process are in place.',
      ],
    },
    data_scientist: {
      governance: [
        'I can access clean, labeled datasets (transaction, credit, claims) without significant data prep effort.',
        'Feature stores or reusable pipelines exist for common BFSI ML use cases (fraud, credit scoring).',
        'Data versioning is in place so I can reproduce model experiments end-to-end.',
        'I have full visibility into data lineage when debugging model or compliance issues.',
        'A model registry tracks all deployed models including training data, performance, and regulatory metadata.',
      ],
      technology: [
        'I have reliable access to compute (GPUs/TPUs) for model training without significant queue times.',
        'An MLOps platform is in use for experiment tracking, model registry, and deployment.',
        'I can work with vector databases or embedding infrastructure for GenAI/document AI use cases.',
        'Automated CI/CD pipelines exist for model deployment with rollback capabilities.',
        'Explainability tools (SHAP, LIME, or similar) are available and used in regulated model deployments.',
      ],
      people: [
        'My team has strong expertise in both classical ML (for regulatory compliance) and modern GenAI techniques.',
        'Dedicated data engineers handle pipeline and infrastructure work so I can focus on modeling.',
        'Business stakeholders (risk, compliance, product) can articulate their problems in analytically useful terms.',
        'The organization funds access to research, courses, and industry conferences for my team.',
        'There is a structured mentoring program for junior team members.',
      ],
      culture: [
        'There is a transparent process for prioritizing AI use cases based on ROI and regulatory feasibility.',
        'Data science work is recognized as strategically important and tied to KPIs across the org.',
        'Risk and compliance teams work collaboratively with data science, not just as gatekeepers.',
        'Experimentation failures are documented and shared as institutional learning.',
        'I have visibility into and input on the broader AI and data strategy.',
      ],
    },
    hr: {
      governance: [
        'Employees understand the sensitivity of financial/customer data and their obligations under regulation.',
        'Mandatory training on data handling, privacy, and AI usage exists for all relevant staff.',
        'Data stewardship roles are clearly defined and staffed in all business units.',
        'There are clear escalation paths for data quality, ethics, or compliance concerns.',
        'Leadership has communicated AI ethics standards, especially around automated decision-making.',
      ],
      technology: [
        'Business and operations staff have access to no-code/low-code AI tools appropriate for their roles.',
        'The organization provides proper licensing for AI/analytics tools to all relevant employees.',
        'There is a formal process to evaluate employee-requested AI tools for security and compliance.',
        'IT support understands BFSI-specific compliance requirements when deploying AI tools.',
        'Technology adoption metrics are tracked, and training gaps linked to tool underuse are addressed.',
      ],
      people: [
        'A clear AI skills taxonomy guides hiring and internal mobility for all relevant roles.',
        'AI literacy programs are in place and have reached >50% of non-technical BFSI business staff.',
        'Performance frameworks have been updated to recognize AI adoption and data-driven decision-making.',
        'Regular employee pulse surveys cover AI tool satisfaction and upskilling needs.',
        'There is an intentional DEI strategy for building diverse AI and data teams.',
      ],
      culture: [
        'HR is represented in AI governance and strategy forums, not just tech-led committees.',
        'Change management frameworks exist for AI-driven process automation in BFSI workflows.',
        'Employee concerns about AI in HR decisions (recruitment AI, performance scoring) are actively addressed.',
        'The org has a published AI ethics charter and employees have received training on it.',
        'Cultural readiness for AI is measured in employee engagement surveys.',
      ],
    },
  },
}

const SEGMENT_ORDER: SegmentKey[] = ['governance', 'technology', 'people', 'culture']
const SEGMENT_PREFIXES: Record<SegmentKey, string> = {
  governance: 'gov',
  technology: 'tech',
  people: 'ppl',
  culture: 'clt',
}

export function getQuestions(domain: Domain, persona: Persona): Question[] {
  const questions: Question[] = []
  let globalIndex = 0

  for (const segment of SEGMENT_ORDER) {
    const texts = QUESTION_DB[domain][persona][segment]
    const prefix = SEGMENT_PREFIXES[segment]
    texts.forEach((text, idx) => {
      questions.push({
        id: `${prefix}_${idx + 1}`,
        text,
        segment,
        globalIndex: globalIndex++,
      })
    })
  }

  return questions
}

export function getQuestionsBySegment(
  domain: Domain,
  persona: Persona,
  segment: SegmentKey
): Question[] {
  return getQuestions(domain, persona).filter((q) => q.segment === segment)
}

export const SEGMENT_CONFIGS = [
  { key: 'governance' as SegmentKey, name: 'Data Governance', shortName: 'Governance', prefix: 'gov' },
  { key: 'technology' as SegmentKey, name: 'Technology', shortName: 'Technology', prefix: 'tech' },
  { key: 'people' as SegmentKey, name: 'People & Skills', shortName: 'People', prefix: 'ppl' },
  { key: 'culture' as SegmentKey, name: 'Culture & Strategy', shortName: 'Culture', prefix: 'clt' },
]
