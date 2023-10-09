const { default: axios } = require("axios");

async function generateUrl(reference, key, item) {
  console.log(item);
  const apiKey = process.env.URLSHORTX_API_KEY;
  const baseUrl =
    "https://" + reference[key] + reference.dir + "/" + item[0].name;
  const url = `https://urlshortx.com/api?api=${apiKey}&url=${baseUrl}`;

  const {
    data: { shortenedUrl },
  } = await axios.get(url);

  return { baseUrl, shortenedUrl };
}

module.exports = generateUrl;
