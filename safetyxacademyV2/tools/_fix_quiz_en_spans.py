import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
p = ROOT / "nebosh-quiz.html"
t = p.read_text(encoding="utf-8")
t = t.replace(
    "Wat is het belangrijkste doel van een RI&amp;E (RI&E) voor een veiligheidskundige?<br>",
    "Wat is het belangrijkste doel van een RI&amp;E voor een veiligheidskundige?<br>",
)
t2, n = re.subn(
    r'\n\s*<span class="quiz-item__question-en">.*?</span>',
    "",
    t,
    flags=re.DOTALL,
)
print("spans_removed", n)
p.write_text(t2, encoding="utf-8", newline="\n")
