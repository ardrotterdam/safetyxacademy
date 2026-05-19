# -*- coding: utf-8 -*-
"""NL-only site sweep. Run: python tools/_nl_site_sweep.py"""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
EXTS = {".html", ".md"}
SKIP_DIRS = {"node_modules", ".git"}


def collect_files() -> list[Path]:
    out: list[Path] = []
    for p in ROOT.rglob("*"):
        if not p.is_file():
            continue
        if p.suffix.lower() not in EXTS:
            continue
        if any(part in SKIP_DIRS for part in p.parts):
            continue
        out.append(p)
    return sorted(out)


def strip_quiz_en_blocks(text: str) -> tuple[str, int]:
    n = 0
    text, c = re.subn(
        r"\n\s*<p><strong>Answer \(EN\):</strong>.*?</p>",
        "",
        text,
        flags=re.IGNORECASE | re.DOTALL,
    )
    n += c
    text, c2 = re.subn(
        r"<br\s*/>\s*\n\s*<span class=\"quiz-item__question-en\">.*?</span>",
        "",
        text,
        flags=re.DOTALL,
    )
    n += c2
    return text, n


def strip_hreflang(text: str) -> tuple[str, int]:
    return re.subn(
        r"\n?\s*<link[^>]*hreflang=[\"'](?:en|x-default)[\"'][^>]*/>\s*",
        "\n",
        text,
        flags=re.IGNORECASE,
    )


def apply_ordered_replacements(text: str) -> tuple[str, dict[str, int]]:
    pairs: list[tuple[str, str]] = [
        ("HSE jobs & self-employed assignments with NEBOSH", "HSE jobs & ZZP-opdrachten met NEBOSH"),
        ("self-employed assignments", "ZZP-opdrachten"),
        ("NEBOSH Training Benelux Ports", "NEBOSH Opleiding Benelux Havens"),
        ("NEBOSH Training Netherlands", "NEBOSH Opleiding Nederland"),
        ("self-employed", "ZZP"),
        ("Antwerp", "Antwerpen"),
        ("Ghent", "Gent"),
        ("Benelux Ports", "Benelux Havens"),
        ("Benelux ports", "Benelux havens"),
    ]
    counts: dict[str, int] = {}
    for needle, rep in pairs:
        c = text.count(needle)
        if c:
            text = text.replace(needle, rep)
            counts[f"{needle} -> {rep}"] = c
    return text, counts


def nebosh_training_to_opleiding(text: str) -> tuple[str, int]:
    n = 0
    patterns: list[tuple[re.Pattern[str], str]] = [
        (re.compile(r"\bNEBOSH IGC trainingen\b", re.I), "NEBOSH IGC opleidingen"),
        (re.compile(r"\bNEBOSH IGC training\b", re.I), "NEBOSH IGC opleiding"),
        (re.compile(r"\bNEBOSH training\b", re.I), "NEBOSH opleiding"),
        (re.compile(r"\bNEBOSH-training\b", re.I), "NEBOSH-opleiding"),
        (re.compile(r"\bNEBOSH Training\b"), "NEBOSH Opleiding"),
        (re.compile(r"\bNederlandstalige NEBOSH IGC training\b", re.I), "Nederlandstalige NEBOSH IGC opleiding"),
        (re.compile(r"\bNederlandstalige NEBOSH-training\b", re.I), "Nederlandstalige NEBOSH-opleiding"),
        (re.compile(r"\bKlassikale training in\b", re.I), "Klassikale opleiding in"),
        (re.compile(r"\bDe training wordt\b", re.I), "De opleiding wordt"),
        (re.compile(r"\bDe training in Rotterdam was\b", re.I), "De opleiding in Rotterdam was"),
        (re.compile(r"\bVolledige NEBOSH IGC training\b", re.I), "Volledige NEBOSH IGC opleiding"),
        (re.compile(r"\(zowel training als examen\)", re.I), "(zowel opleiding als examen)"),
        (re.compile(r"\btraining in het Nederlands bij\b", re.I), "opleiding in het Nederlands bij"),
        (re.compile(r"\bTraining en examen\b", re.I), "Opleiding en examen"),
        (re.compile(r"€3\.500 all-in \(training \+ examengeld\)", re.I), "€3.500 all-in (opleiding + examengeld)"),
        (re.compile(r"\btraining, examengeld en begeleiding\b", re.I), "opleiding, examengeld en begeleiding"),
        (re.compile(r"\bJe volgt de training in\b", re.I), "Je volgt de opleiding in"),
        (re.compile(r"\btientallen trainingen\b", re.I), "tientallen opleidingen"),
        (re.compile(r"\bgeven we de training volledig\b", re.I), "geven we de opleiding volledig"),
        (re.compile(r"\bNEBOSH IGC trainingen aan\b", re.I), "NEBOSH IGC opleidingen aan"),
        (re.compile(r"\bNEBOSH IGC training bij\b", re.I), "NEBOSH IGC opleiding bij"),
        (re.compile(r"\bNEBOSH training periode\b", re.I), "NEBOSH-opleidingsperiode"),
        (re.compile(r"\bNEBOSH opleiding periode\b", re.I), "NEBOSH-opleidingsperiode"),
        (re.compile(r"\btrainingslocatie\b", re.I), "opleidingslocatie"),
        (re.compile(r"\bTrainingslocatie\b"), "Opleidingslocatie"),
        (re.compile(r"\btrainingsdag\b", re.I), "opleidingsdag"),
        (re.compile(r"\btrainingscentrum\b", re.I), "opleidingscentrum"),
        (re.compile(r"\bWaar vindt de training plaats\?", re.I), "Waar vindt de opleiding plaats?"),
        (re.compile(r"\bna de training\b", re.I), "na de opleiding"),
        (re.compile(r"\bNetwerk tijdens je training\b", re.I), "Netwerk tijdens je opleiding"),
        (re.compile(r"\btijdens je training\b", re.I), "tijdens je opleiding"),
        (re.compile(r"\bVeiligheidskundige training,", re.I), "Veiligheidskundige opleiding,"),
        (re.compile(r"\bVeiligheidskundige training\b", re.I), "Veiligheidskundige opleiding"),
        (re.compile(r"\bin NEBOSH opleiding voor\b", re.I), "in de NEBOSH opleiding voor"),
        (re.compile(r"\bin NEBOSH opleiding\.", re.I), "in de NEBOSH opleiding."),
        (re.compile(r"\bin NEBOSH opleiding ", re.I), "in de NEBOSH opleiding "),
        (re.compile(r"\bNEBOSH opleiding voor de Nederlandse markt\b", re.I), "NEBOSH-opleiding voor de Nederlandse markt"),
        (re.compile(r"\bDutch-language NEBOSH\b", re.I), "Nederlandstalige NEBOSH"),
        (re.compile(r"\bin onze NEBOSH opleiding in Rotterdam\b", re.I), "in onze NEBOSH opleiding in Rotterdam"),
        (re.compile(r"\bIn onze NEBOSH opleiding in Rotterdam\b", re.I), "In onze NEBOSH opleiding in Rotterdam"),
        (re.compile(r"\bzoals behandeld in NEBOSH opleiding\b", re.I), "zoals behandeld in de NEBOSH opleiding"),
        (re.compile(r"\bgebruikt wordt in NEBOSH opleiding\b", re.I), "gebruikt wordt in de NEBOSH opleiding"),
    ]
    for rx, rep in patterns:
        text, c = rx.subn(rep, text)
        n += c
    return text, n


def freelance_to_zzp(text: str) -> tuple[str, int]:
    n = 0
    pairs = [
        ("freelance safety professional", "ZZP veiligheidskundige"),
        ("as an HSE freelancer", "als HSE ZZP'er"),
        ("as a freelancer", "als ZZP'er"),
        ("As an HSE freelancer", "Als HSE ZZP'er"),
        ("HSE freelancer of", "HSE ZZP'er of"),
        ("HSE freelancers", "HSE ZZP'ers"),
        ("HSE freelancer", "HSE ZZP'er"),
        ("freelancers", "ZZP'ers"),
        ("freelancer", "ZZP'er"),
        ("HSE freelance / ZZP", "HSE ZZP"),
        ("freelance HSE / HSE zzp", "HSE ZZP"),
        ("Freelance HSE-opdrachten", "ZZP HSE-opdrachten"),
        ("freelance HSE-opdrachten", "ZZP HSE-opdrachten"),
        ("freelance veiligheidskundige", "ZZP veiligheidskundige"),
        ("Freelance veiligheidskundige", "ZZP veiligheidskundige"),
        ("<strong>freelance HSE</strong>", "<strong>HSE ZZP</strong>"),
        ("freelance HSE", "HSE ZZP"),
        ("Freelance HSE", "HSE ZZP"),
        ("als <strong>HSE freelance</strong>", "als <strong>ZZP HSE</strong>"),
    ]
    for a, b in pairs:
        c = text.count(a)
        if c:
            text = text.replace(a, b)
            n += c
    return text, n


def ports_phrases(text: str) -> tuple[str, int]:
    n = 0
    pairs = [
        ("working in ports", "werken in havens"),
        ("in ports, offshore", "in havens, offshore"),
        ("in ports such as", "in havens zoals"),
        ("in ports.", "in havens."),
        ("in ports ", "in havens "),
        ("Port of Antwerp-Bruges", "Haven van Antwerpen-Brugge"),
        ("Port of Zeebrugge", "Haven van Zeebrugge"),
        ("Port of Amsterdam", "Haven van Amsterdam"),
        ("Train in Rotterdam – werk in", "Opleid je in Rotterdam — werk in"),
        ("Train in Rotterdam - werk in", "Opleid je in Rotterdam — werk in"),
        ("Antwerpen Centraal", "Antwerpen-Centraal"),
    ]
    for a, b in pairs:
        c = text.count(a)
        if c:
            text = text.replace(a, b)
            n += c
    return text, n


def misc_nl(text: str) -> tuple[str, int]:
    n = 0
    pairs = [
        (
            "NEBOSH safety training Rotterdam Erasmus Bridge - Featured image for NEBOSH in Rotterdam guide",
            "NEBOSH opleiding Rotterdam Erasmusbrug — illustratie bij de Rotterdam-gids",
        ),
        ("Rotterdam's meest", "Rotterdams meest"),
        ("Rotterdam's maritieme", "Rotterdams maritieme"),
    ]
    for a, b in pairs:
        c = text.count(a)
        if c:
            text = text.replace(a, b)
            n += c
    return text, n


def quiz_nl_only(text: str, path: Path) -> tuple[str, int]:
    if path.name != "nebosh-quiz.html":
        return text, 0
    n = 0
    text, c = re.subn(r"Vraag (\d+) / Question \d+", r"Vraag \1", text)
    n += c
    if "20 exam style vragen (NL &amp; EN)" in text:
        text = text.replace(
            "20 exam style vragen (NL &amp; EN)",
            "20 vragen in examenstijl",
        )
        n += 1
    if "NEBOSH Oefenquiz – 20 exam style vragen (NL &amp; EN)" in text:
        text = text.replace(
            "NEBOSH Oefenquiz – 20 exam style vragen (NL &amp; EN)",
            "NEBOSH Oefenquiz – 20 vragen in examenstijl",
        )
        n += 1
    if "De vragen zijn tweetalig (Nederlands &amp; Engels) en sluiten aan op onderwerpen zoals" in text:
        text = text.replace(
            "De vragen zijn tweetalig (Nederlands &amp; Engels) en sluiten aan op onderwerpen zoals",
            "De vragen sluiten aan op onderwerpen zoals",
        )
        n += 1
    old_intro = (
        "Eerst zie je de Nederlandse uitleg,\n          daarna de Engelse uitleg zoals je die ongeveer op een NEBOSH examen zou kunnen gebruiken."
    )
    if old_intro in text:
        text = text.replace(
            old_intro,
            "Je ziet per vraag een Nederlandse uitleg — aansluitend op wat je op een NEBOSH-examen kunt verwachten.",
        )
        n += 1
    if "internationale safety officer jobs." in text:
        text = text.replace(
            "internationale safety officer jobs.",
            "internationale HSE-functies.",
        )
        n += 1
    return text, n


def main():
    report: dict[str, object] = {}
    for path in collect_files():
        rel = path.relative_to(ROOT).as_posix()
        original = path.read_text(encoding="utf-8")
        text = original
        notes: list[str] = []
        total = 0

        t, c = strip_hreflang(text)
        text, total = t, total + c
        if c:
            notes.append(f"hreflang en/x-default: {c} tag(s)")

        t, c = strip_quiz_en_blocks(text)
        text, total = t, total + c
        if c:
            notes.append(f"quiz EN-blokken verwijderd: {c}")

        text, pcounts = apply_ordered_replacements(text)
        total += sum(pcounts.values())
        if pcounts:
            notes.append("woord/zin: " + "; ".join(f"{k} ({v})" for k, v in pcounts.items()).encode("ascii", "replace").decode("ascii"))

        t, c = nebosh_training_to_opleiding(text)
        text, total = t, total + c
        if c:
            notes.append(f"training→opleiding (NEBOSH-context): {c}")

        t, c = freelance_to_zzp(text)
        text, total = t, total + c
        if c:
            notes.append(f"freelance→ZZP: {c}")

        t, c = ports_phrases(text)
        text, total = t, total + c
        if c:
            notes.append(f"ports/Port of/Train: {c}")

        t, c = misc_nl(text)
        text, total = t, total + c
        if c:
            notes.append(f"diversen: {c}")

        t, c = quiz_nl_only(text, path)
        text, total = t, total + c

        if text != original:
            path.write_text(text, encoding="utf-8", newline="\n")
            report[rel] = {"wijzigingen_totaal": total, "details": notes}
        else:
            report[rel] = {"wijzigingen_totaal": 0, "details": ["geen wijziging"]}

    (ROOT / "tools" / "_nl_sweep_report.json").write_text(
        json.dumps(report, indent=2, ensure_ascii=False),
        encoding="utf-8",
    )
    changed = sum(1 for v in report.values() if v.get("wijzigingen_totaal", 0) > 0)
    print(f"FILES_MET_WIJZIGINGEN={changed}")
    print(json.dumps(report, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()
