export interface WrappedLine {
  text: string;
  width: number;
}

export function wrapText(text: string, maxCharsPerLine: number): WrappedLine[] {
  const words = text.split(" ");
  const lines: WrappedLine[] = [];
  let currentLine: string[] = [];

  for (const word of words) {
    if (word.length > maxCharsPerLine) {
      // Flush current line
      if (currentLine.length > 0) {
        lines.push({ text: currentLine.join(" "), width: maxCharsPerLine });
        currentLine = [];
      }
      // Break long word into chunks
      for (let i = 0; i < word.length; i += maxCharsPerLine) {
        lines.push({
          text: word.slice(i, i + maxCharsPerLine),
          width: maxCharsPerLine,
        });
      }
    } else if (
      currentLine.join(" ").length + word.length + 1 >
      maxCharsPerLine
    ) {
      lines.push({ text: currentLine.join(" "), width: maxCharsPerLine });
      currentLine = [word];
    } else {
      currentLine.push(word);
    }
  }

  if (currentLine.length > 0) {
    lines.push({ text: currentLine.join(" "), width: maxCharsPerLine });
  }

  if (lines.length === 0) {
    lines.push({ text: "", width: 0 });
  }

  return lines;
}

export function wrapLabel(
  label: string,
  maxCharsPerLine: number
): WrappedLine[] {
  const wrapped = wrapText(label, maxCharsPerLine);
  const maxActualWidth = Math.max(...wrapped.map(l => l.text.length));
  return wrapped.map(l => ({
    text: l.text,
    width: maxActualWidth,
  }));
}
