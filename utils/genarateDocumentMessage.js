const path = require("path");

function generateDownloadMessage(file, url1, url2, userData, uploadedAt) {
  const size = (file.file_size / (1024 * 1024)).toFixed(2);
  const { first_name, username, type: userType } = userData;
  const date =
    new Date(uploadedAt).getDate() +
    "/" +
    new Date(uploadedAt).getMonth() +
    1 +
    "/" +
    new Date(uploadedAt).getFullYear();

  const type = path.extname(file.file_path);

  const msg = `${file.file_name}\n\n Size : ${size}MB\n Type : ${type}\n\n Download Links\n   •  1st Link : ${url1}\n   •  2nd Link : ${url2}\n\n Stram Links\n   •  1st Link : ${url1}\n   •  2nd Link : ${url2}\n\nUploader : ${first_name}\nUploaded at : ${date}\n\nFROM : @TG2URL_Bot\n\n-------------------------------------------------------`;

  return msg;
}

module.exports = generateDownloadMessage;
