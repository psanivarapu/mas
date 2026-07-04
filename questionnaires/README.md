# Questionnaires

Each file in this folder is the editable question bank for one Domain + Persona +
Segment combination, and is read from disk at request time by
`app/api/questions/route.ts` — editing a file here takes effect immediately, no
rebuild or restart required.

## Naming

`<industry>_<persona>_<segment>.txt`, where:

- `industry` (Domain) is `martech` or `bfsi`
- `persona` is `cto`, `data_scientist`, or `hr`
- `segment` is `governance`, `technology`, `people`, or `culture`

All 24 combinations (2 industries × 3 personas × 4 segments) must exist for the
app to function, e.g.:

```
martech_cto_governance.txt
martech_cto_technology.txt
martech_cto_people.txt
martech_cto_culture.txt
martech_data_scientist_governance.txt
...
bfsi_hr_culture.txt
```

## File format

```
# Comment lines start with "#" and are ignored.

Question one text.
Question two text.
Question three text.
Question four text.
Question five text.
```

- One question per line, plain text — no headers needed, since the segment is
  already encoded in the filename.
- Blank lines and `#` comment lines are ignored by the parser.

## Important: keep 5 questions per file

The scoring logic in `lib/scoring.ts` and the roadmap templates in `lib/roadmap.ts`
are both fixed to positions 1–5 within each segment (question IDs `gov_1`..`gov_5`,
`tech_1`..`tech_5`, `ppl_1`..`ppl_5`, `clt_1`..`clt_5`) and were intentionally left
unchanged. If a file has fewer or more than 5 lines:

- Extra lines (a 6th+ question) will render and be answerable in the questionnaire,
  but won't count toward the segment score or have a matching roadmap action.
- Missing lines (fewer than 5) mean the score for that segment is averaged over
  whatever is present, and any missing roadmap template falls back to a neutral
  default score.

The questionnaire UI itself is not hardcoded to 5/segment or 20 total — it adapts
to however many questions are actually present. But to keep scoring and the
roadmap fully accurate, always edit questions in place (same line position)
rather than adding or removing lines.
