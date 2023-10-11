const HandeleSize = require("./sizeHandler");

function generateDownloadMessage(file, url1, url2, userData, uploadedAt) {
  const { first_name } = userData;
  const size = HandeleSize(file.file_size);
  const date =
    new Date(uploadedAt).getDate() < 10
      ? "0" + new Date(uploadedAt).getDate()
      : new Date(uploadedAt).getDate();
  const month = new Date(uploadedAt).getMonth();
  const year = new Date(uploadedAt).getFullYear();
  const update = date + "/" + (month + 1) + "/" + year;

  const type = file.file_type ? file.file_type : "unknown";

  const msg = `${file.file_name}\n\n Size : ${size}\n Type : ${type}\n\n Download Links\n   •  1st Link : ${url1}\n   •  2nd Link : ${url2}\n\n Stram Links\n   •  1st Link : ${url1}\n   •  2nd Link : ${url2}\n\nUploader : ${first_name}\nUploaded at : ${update}\n\nFROM : @TG2URL_Bot\n\n-------------------------------------------------------`;

  return msg;
}

module.exports = generateDownloadMessage;
