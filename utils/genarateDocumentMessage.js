function generateDownloadMessage(file, url1, url2) {
  return `File Downloaded\n\nFileID : ${file.file_unique_id}\n\nFile Size : ${(
    file.file_size /
    (1024 * 1024)
  ).toFixed(2)} mb\n\nLink1 : ${url1}\n\nLink2 : ${url2}`;
}

module.exports = generateDownloadMessage;
