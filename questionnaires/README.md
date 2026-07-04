# Questionnaires

This folder holds the editable question bank for the Hong Leong Group AI
Growth Readiness Assessment. It's read from disk at request time by
`app/api/questions/route.ts` — editing a file here takes effect immediately,
no rebuild or restart required.

## One shared question set

Unlike a per-audience question bank, this assessment uses a **single shared
20-question set** across all 27 Division × Function × Level combinations.
Selecting a Division (MPI / HLI / HCIB), Function (Support / Manufacturing &
Supply Chain / Sales & Marketing), and Level (VP/CXO / Sr Manager-Director /
Executive-Manager) personalizes labels and the report narrative — it does not
change which questions are asked.

## Files

One file per segment, named after the segment:

```
governance.txt
technology.txt
people.txt
culture.txt
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

- One question per line, plain text.
- Blank lines and `#` comment lines are ignored by the parser.

## Important: keep 5 questions per file

The scoring logic in `lib/scoring.ts` and the roadmap templates in
`lib/roadmap.ts` are both fixed to positions 1–5 within each segment (question
IDs `gov_1`..`gov_5`, `tech_1`..`tech_5`, `ppl_1`..`ppl_5`, `clt_1`..`clt_5`).
If a file has fewer or more than 5 lines:

- Extra lines (a 6th+ question) will render and be answerable in the
  questionnaire, but won't count toward the segment score or have a matching
  roadmap action.
- Missing lines (fewer than 5) mean the score for that segment is averaged
  over whatever is present, and any missing roadmap template falls back to a
  neutral default score.

The questionnaire UI itself is not hardcoded to 5/segment or 20 total — it
adapts to however many questions are actually present. But to keep scoring
and the roadmap fully accurate, always edit questions in place (same line
position) rather than adding or removing lines.
