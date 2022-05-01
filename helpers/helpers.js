exports.extractData = (arrayOfHighlights) => {
  const dataObject = arrayOfHighlights.map((highlight) => {
    let entry = {};
    const separatedLines = highlight.split("\r\n");
    entry.author = extractAuthor(separatedLines[1]);
    entry.title = extractTitle(separatedLines[1]);
    entry.time = extractTime(separatedLines[2]);
    entry.content = separatedLines[4];
    return entry;
  });

  return dataObject;
};

const extractAuthor = (firstLine) => {
  const breakIndex = firstLine.lastIndexOf("(");
  return firstLine.slice(breakIndex + 1, firstLine.length - 1);
};

const extractTitle = (firstLine) => {
  const breakIndex = firstLine.lastIndexOf("(");
  return firstLine.slice(0, breakIndex);
};

const extractTime = (secondLine) => {
  if (secondLine) {
    return secondLine.slice(secondLine.lastIndexOf("Added on") + 9);
  }
};
