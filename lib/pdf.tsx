import { Document, Page, View, Text, StyleSheet, Svg, Polygon, Line, renderToBuffer } from '@react-pdf/renderer'
import type { Domain, Persona, SegmentKey, Question, ReportData, RoadmapItem, TimeBucket, Tier } from './types'
import { getScoreColor, getScoreLabel, getAnswerLabel } from './scoring'
import { BUCKET_LABELS } from './roadmap'
import { TIER_CONFIGS } from '@/components/TierBadge'

const DOMAIN_LABELS: Record<Domain, string> = {
  martech: 'Marketing Technology (Martech)',
  bfsi: 'Banking, Financial Services & Insurance (BFSI)',
}

const PERSONA_LABELS: Record<Persona, string> = {
  cto: 'CTO',
  data_scientist: 'Lead Data Scientist',
  hr: 'HR Lead',
}

const SEGMENT_NAMES: Record<SegmentKey, string> = {
  governance: 'Data Governance',
  technology: 'Technology',
  people: 'People & Skills',
  culture: 'Culture & Strategy',
}

const SEGMENT_ORDER: SegmentKey[] = ['governance', 'technology', 'people', 'culture']
const BUCKET_ORDER: TimeBucket[] = ['immediate', 'short', 'medium', 'long']

const BUCKET_HEX: Record<TimeBucket, string> = {
  immediate: '#dc2626',
  short: '#d97706',
  medium: '#2563eb',
  long: '#059669',
}

const TIER_HEX: Record<Tier, string> = {
  bee: '#ca8a04',
  elephant: '#64748b',
  dolphin: '#0d9488',
  unicorn: '#9333ea',
}

const styles = StyleSheet.create({
  page: { padding: 36, fontSize: 10, color: '#1e293b', fontFamily: 'Helvetica' },
  h1: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  h2: { fontSize: 13, fontWeight: 'bold', marginTop: 18, marginBottom: 8, color: '#0f172a' },
  h3: { fontSize: 11, fontWeight: 'bold', marginBottom: 4 },
  muted: { fontSize: 9, color: '#64748b' },
  row: { flexDirection: 'row' },
  card: { border: '1pt solid #e2e8f0', borderRadius: 4, padding: 10, marginBottom: 10 },
  bar: { height: 6, borderRadius: 3, backgroundColor: '#e2e8f0', marginTop: 2, marginBottom: 2 },
  barFill: { height: 6, borderRadius: 3 },
})

function ScoreBar({ score }: { score: number }) {
  return (
    <View style={styles.bar}>
      <View style={[styles.barFill, { width: `${score}%`, backgroundColor: getScoreColor(score) }]} />
    </View>
  )
}

function RadarSvg({ segmentScores }: { segmentScores: Record<SegmentKey, number> }) {
  const values = SEGMENT_ORDER.map((s) => segmentScores[s])
  const angles = [-90, 0, 90, 180]
  const center = 100
  const maxR = 80

  function point(angleDeg: number, r: number): [number, number] {
    const rad = (angleDeg * Math.PI) / 180
    return [center + r * Math.cos(rad), center + r * Math.sin(rad)]
  }

  const gridPolygons = [25, 50, 75, 100].map((v) => {
    const r = (v / 100) * maxR
    return angles.map((a) => point(a, r).join(',')).join(' ')
  })
  const dataPoints = angles.map((a, i) => point(a, (values[i] / 100) * maxR).join(',')).join(' ')

  return (
    <View style={{ width: 220, height: 220, position: 'relative' }}>
      <Svg width={220} height={220} viewBox="0 0 200 200">
        {gridPolygons.map((pts, i) => (
          <Polygon key={i} points={pts} stroke="#cbd5e1" strokeWidth={0.5} fill="none" />
        ))}
        {angles.map((a, i) => {
          const [x, y] = point(a, maxR)
          return <Line key={i} x1={center} y1={center} x2={x} y2={y} stroke="#cbd5e1" strokeWidth={0.5} />
        })}
        <Polygon points={dataPoints} stroke="#3b82f6" strokeWidth={1.5} fill="#3b82f6" fillOpacity={0.35} />
      </Svg>
      <Text style={{ position: 'absolute', top: 2, left: 78, fontSize: 8 }}>Governance</Text>
      <Text style={{ position: 'absolute', top: 106, left: 178, fontSize: 8 }}>Technology</Text>
      <Text style={{ position: 'absolute', top: 204, left: 82, fontSize: 8 }}>People</Text>
      <Text style={{ position: 'absolute', top: 106, left: 4, fontSize: 8 }}>Culture</Text>
    </View>
  )
}

interface RenderReportPdfParams {
  name: string
  email: string
  role: string
  domain: Domain
  persona: Persona
  questions: Question[]
  answers: Record<string, number>
  report: ReportData
  roadmap: Record<TimeBucket, RoadmapItem[]>
}

export async function renderReportPdf(params: RenderReportPdfParams): Promise<Buffer> {
  const { name, email, role, domain, persona, questions, answers, report, roadmap } = params
  const tierConfig = TIER_CONFIGS[report.tier]

  const questionScores = questions.map((q) => ({
    id: q.id,
    text: q.text,
    segment: q.segment,
    score: answers[q.id] ?? 0,
  }))
  const scorable = questionScores.filter((q) => q.score > 0)
  const topStrengths = [...scorable].sort((a, b) => b.score - a.score).slice(0, 3)
  const topGaps = [...scorable].sort((a, b) => a.score - b.score).slice(0, 3)

  const doc = (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.h1}>AI Growth Readiness and Maturity Index</Text>
        <Text style={styles.muted}>Assessment Report — generated {new Date().toLocaleDateString()}</Text>

        <View style={[styles.card, { marginTop: 14 }]}>
          <View style={styles.row}>
            <Text style={{ width: 80, color: '#64748b' }}>Name</Text>
            <Text>{name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={{ width: 80, color: '#64748b' }}>Email</Text>
            <Text>{email}</Text>
          </View>
          <View style={styles.row}>
            <Text style={{ width: 80, color: '#64748b' }}>Role</Text>
            <Text>{role}</Text>
          </View>
          <View style={styles.row}>
            <Text style={{ width: 80, color: '#64748b' }}>Domain</Text>
            <Text>{DOMAIN_LABELS[domain]}</Text>
          </View>
          <View style={styles.row}>
            <Text style={{ width: 80, color: '#64748b' }}>Persona</Text>
            <Text>{PERSONA_LABELS[persona]}</Text>
          </View>
        </View>

        {/* Section A */}
        <Text style={styles.h2}>Section A — Maturity Overview</Text>
        <View style={styles.row}>
          <View style={{ flex: 1, paddingRight: 12 }}>
            <Text style={{ fontSize: 28, fontWeight: 'bold', color: TIER_HEX[report.tier] }}>
              {report.overallScore} / 100
            </Text>
            <Text style={{ fontSize: 13, fontWeight: 'bold', color: TIER_HEX[report.tier], marginTop: 2 }}>
              {tierConfig.name}
            </Text>
            <Text style={{ marginTop: 6, fontSize: 9, color: '#334155', lineHeight: 1.4 }}>
              {tierConfig.description}
            </Text>

            <View style={{ marginTop: 12 }}>
              {SEGMENT_ORDER.map((seg) => (
                <View key={seg} style={{ marginBottom: 6 }}>
                  <View style={[styles.row, { justifyContent: 'space-between' }]}>
                    <Text style={{ fontSize: 9 }}>{SEGMENT_NAMES[seg]}</Text>
                    <Text style={{ fontSize: 9, fontWeight: 'bold', color: getScoreColor(report.segmentScores[seg]) }}>
                      {report.segmentScores[seg]}
                    </Text>
                  </View>
                  <ScoreBar score={report.segmentScores[seg]} />
                </View>
              ))}
            </View>
          </View>
          <View style={{ width: 220 }}>
            <RadarSvg segmentScores={report.segmentScores} />
          </View>
        </View>

        {/* Section B */}
        <Text style={styles.h2} break>
          Section B — Segment Deep Dives
        </Text>
        {SEGMENT_ORDER.map((seg) => {
          const segQuestions = questionScores.filter((q) => q.segment === seg)
          return (
            <View key={seg} style={styles.card} wrap={false}>
              <View style={[styles.row, { justifyContent: 'space-between', marginBottom: 4 }]}>
                <Text style={styles.h3}>{SEGMENT_NAMES[seg]}</Text>
                <Text style={{ fontWeight: 'bold', color: getScoreColor(report.segmentScores[seg]) }}>
                  {report.segmentScores[seg]} / 100 — {getScoreLabel(report.segmentScores[seg])}
                </Text>
              </View>
              {segQuestions.map((q) => (
                <View key={q.id} style={[styles.row, { marginBottom: 3 }]}>
                  <Text style={{ flex: 1, fontSize: 9 }}>{q.text}</Text>
                  <Text style={{ width: 150, fontSize: 9, textAlign: 'right', color: '#334155' }}>
                    {getAnswerLabel(answers[q.id] ?? 0)}
                  </Text>
                </View>
              ))}
            </View>
          )
        })}

        {/* Section C */}
        <Text style={styles.h2} break>
          Section C — Overall Strengths &amp; Gaps
        </Text>
        <View style={styles.row}>
          <View style={{ flex: 1, paddingRight: 8 }}>
            <Text style={[styles.h3, { color: '#059669' }]}>Top Strengths</Text>
            {topStrengths.length > 0 ? (
              topStrengths.map((s, i) => (
                <Text key={s.id} style={{ fontSize: 9, marginBottom: 4 }}>
                  {i + 1}. [{SEGMENT_NAMES[s.segment]}] {s.text} — {s.score}/5
                </Text>
              ))
            ) : (
              <Text style={{ fontSize: 9, color: '#64748b' }}>No scorable responses.</Text>
            )}
          </View>
          <View style={{ flex: 1, paddingLeft: 8 }}>
            <Text style={[styles.h3, { color: '#dc2626' }]}>Top Priority Gaps</Text>
            {topGaps.length > 0 ? (
              topGaps.map((g, i) => (
                <Text key={g.id} style={{ fontSize: 9, marginBottom: 4 }}>
                  {i + 1}. [{SEGMENT_NAMES[g.segment]}] {g.text} — {g.score}/5
                </Text>
              ))
            ) : (
              <Text style={{ fontSize: 9, color: '#64748b' }}>No scorable responses.</Text>
            )}
          </View>
        </View>

        {/* Section D */}
        <Text style={styles.h2} break>
          Section D — Improvement Roadmap
        </Text>
        {BUCKET_ORDER.map((bucket) => {
          const items = roadmap[bucket]
          const config = BUCKET_LABELS[bucket]
          return (
            <View key={bucket} style={{ marginBottom: 10 }}>
              <Text style={{ fontSize: 11, fontWeight: 'bold', color: BUCKET_HEX[bucket], marginBottom: 4 }}>
                {config.label} ({config.range}) — {items.length} action{items.length !== 1 ? 's' : ''}
              </Text>
              {items.length === 0 ? (
                <Text style={{ fontSize: 9, color: '#64748b' }}>No actions in this bucket — strength area.</Text>
              ) : (
                items.map((item) => (
                  <View key={item.id} style={[styles.card, { marginBottom: 6 }]} wrap={false}>
                    <Text style={{ fontSize: 9, fontWeight: 'bold', marginBottom: 2 }}>{item.action}</Text>
                    <Text style={{ fontSize: 8, color: '#475569', marginBottom: 1 }}>Owner: {item.owner}</Text>
                    <Text style={{ fontSize: 8, color: '#475569', marginBottom: 1 }}>
                      Expected outcome: {item.outcome}
                    </Text>
                    <Text style={{ fontSize: 8, color: '#475569' }}>Effort: {item.effort}</Text>
                  </View>
                ))
              )}
            </View>
          )
        })}

        <Text style={{ marginTop: 16, fontSize: 8, color: '#94a3b8', textAlign: 'center' }}>
          AI Growth Readiness and Maturity Index — Results computed locally, no data stored externally
        </Text>
      </Page>
    </Document>
  )

  return renderToBuffer(doc)
}
