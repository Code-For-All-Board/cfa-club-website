const BASE_URL = import.meta.env.VITE_LEETCODE_API_BASE;
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

const lookupUser = async (
  type: "discord" | "leetcode",
  userName: string
) => {
  const url = `${BASE_URL}/api/${type}_lookup`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      [`${type}-username`]: userName,
    },
  });

  return response;
};


const fetchUser = async (userName: string) => {
    // The function will first try to fetch the discord userName and if there is no match it willf fetch the leetcode userName
    let response = await lookupUser("discord", userName);
    if (!response.ok) {
        response = await lookupUser("leetcode", userName);
    }
    if (!response.ok) {
        throw new Error("Both APIs failed to fetch user data.");
    }

    const output = await response.json();
    return output;
}

const fetchLeaderboard = async () => {
    const leaderboardUrl = `${BASE_URL}/leaderboard`;
    return fetcher(leaderboardUrl);
}

const fetchLeaderboardHistory = async () => {
    const historyUrl = `${BASE_URL}/leaderboard/leaderboard_history`;
    return fetcher(historyUrl);
}

export { fetchUser, fetchLeaderboard, fetchLeaderboardHistory, fetcher };
