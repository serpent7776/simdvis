// Syntax-check every inline <script> in an HTML document read from stdin.
// Usage: node check-js.js <display-name> < file.html
const vm = require('vm');
const name = process.argv[2];
const html = require('fs').readFileSync(0, 'utf8');
const re = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
let m, ok = true;
while ((m = re.exec(html))) {
  // Pad with newlines so reported line numbers match the HTML file.
  const pad = '\n'.repeat(html.slice(0, m.index + m[0].indexOf('>') + 1).split('\n').length - 1);
  try {
    new vm.Script(pad + m[1], { filename: name });
  } catch (e) {
    ok = false;
    const loc = (e.stack.match(new RegExp(name.replace(/\./g, '\\.') + ':\\d+')) || [name])[0];
    console.error(`${loc}: ${e.name}: ${e.message}`);
  }
}
process.exit(ok ? 0 : 1);
