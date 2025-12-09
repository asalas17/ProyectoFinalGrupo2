const output = document.getElementById('output');

export function showMessage(text, type = 'info') {
  if (!output) return;
  output.textContent = text;
  output.className = `message ${type}`;
}

export function isValidEmail(value) {
  return /.+@.+\..+/.test(value);
}
