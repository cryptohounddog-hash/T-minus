import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const changelog = readFileSync(path.join(root, "CHANGELOG.md"), "utf8");

const sections = changelog.split(/\n(?=## )/).filter((s) => s.startsWith("## "));
if (sections.length === 0) {
  throw new Error("Could not find a version section in CHANGELOG.md");
}
const headingMatch = sections[0].match(/^## v([\d.]+) — (\d{4}-\d{2}-\d{2})\n([\s\S]*)$/);
if (!headingMatch) {
  throw new Error("Topmost CHANGELOG.md section did not match the expected format");
}
const [, version, date, body] = headingMatch;

const statusMatch = body.match(/^Status:\s*(.+)$/m);
const status = statusMatch ? statusMatch[1].trim() : "";

const changesMatch = body.match(/Changes in this version:\n([\s\S]*)/);
const changesBlock = changesMatch ? changesMatch[1].trimEnd() : "";

const header = `<!--
============================================================
T-MINUS DASHBOARD — VERSION CONTROL
File: dist/index.html
Version: ${version}
Date: ${date}
Status: ${status}
Changes in this version:
${changesBlock}
============================================================
-->
`;

const distPath = path.join(root, "dist", "index.html");
const html = readFileSync(distPath, "utf8");
writeFileSync(distPath, header + html);
console.log(`Injected version header (v${version}, ${date}) into dist/index.html`);
