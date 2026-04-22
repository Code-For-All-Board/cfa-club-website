


const fetcher = (url: string, options: RequestInit = {}) =>
  fetch(url, options)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .catch((error) => {
      console.error("Fetcher error:", error);
      throw error;
    });

const discordLookup = async (userName: string) => {
    const discordUrl = "https://server.rakibshahid.com/api/discord_lookup";
    const discordOptions: RequestInit = {
      method: "GET",
      headers: {
        "discord-username": userName 
        }
    };
    const response = await fetch(discordUrl, discordOptions);
    return response;
}

const leetcodeLookup = async (userName: string) => {
    const leetcodeUrl = "https://server.rakibshahid.com/api/leetcode_lookup";
    const leetcodeOptions: RequestInit = {
      method: "GET",
      headers: {
        "leetcode-username": userName,
      },
    };
    return await fetch(leetcodeUrl, leetcodeOptions);
}

const fetchUser = async (userName: string) => {
    // The function will first try to fetch the discord userName and if there is no match it willf fetch the leetcode userName
    let response = await discordLookup(userName);
    if (!response.ok) {
        response = await leetcodeLookup(userName);
    }
    if (!response.ok) {
        throw new Error("Both APIs failed to fetch user data.");
    }

    const output = await response.json();
    return output;
}

const fetchLeaderboard = async () => {
    const leaderboardUrl = "https://server.rakibshahid.com/leaderboard";
    return fetcher(leaderboardUrl);
}

const fetchLeaderboardHistory = async () => {
    const historyUrl = "https://server.rakibshahid.com/leaderboard/leaderboard_history";
    return fetcher(historyUrl);
}

export { fetchUser, fetchLeaderboard, fetchLeaderboardHistory, fetcher };
