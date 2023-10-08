const generateUrl = require("./genarateUrl");

const sdk = require("api")(
  "https://archive.readme.io/openapi/62fab733dd9a44636f4a6ec7"
);

function GetReference(id, size, retryLimit) {
  let limit = 0;
  console.log(id);
  return new Promise((resolve, reject) => {
    const interval = setInterval(async () => {
      const { data } = await sdk.item({ id });
      const item = data.files.filter(
        (item) =>
          item.length && item.width && item.height && item.source == "original"
      );

      if (item.length != 0) {
        const url1 = generateUrl(data, "d1", item);
        const url2 = generateUrl(data, "d2", item);
        const urls = [url1, url2];
        resolve({ status: false, msg: "success", urls, data });
        clearInterval(interval);
      }

      if (limit >= retryLimit) {
        console.log("limit reached");
        clearInterval(interval);
        reject();
      }
      limit += 1;
    }, 5000);
  });
}

module.exports = GetReference;
