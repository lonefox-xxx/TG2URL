async function Logout(bot) {
  const logoutres = await bot.logOut();
  return logoutres;
}

module.exports = Logout;
