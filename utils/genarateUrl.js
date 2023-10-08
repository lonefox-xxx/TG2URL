function generateUrl(data, key, item) {
  console.log(item);
  return "https://" + data[key] + data.dir + "/" + item[0].name;
}

module.exports = generateUrl;
