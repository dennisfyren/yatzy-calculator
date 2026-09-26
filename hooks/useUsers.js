import useLocalStorage from "./useLocalStorage";

function useUsers() {
  const [users, setUsers] = useLocalStorage("users", {});

  function addUser(user) {
    const userFields = {
      wins: 0,
      losses: 0,
      gamesPlayed: 0,
      minScore: Infinity,
      maxScore: -Infinity,
      totalScore: 0,
      avgScore: 0,
      numYatzy: 0,
    };
    setUsers((prev) => ({ ...prev, [user]: userFields }));
  }

  function updateUsers(gameData) {
    Object.keys(gameData.players).forEach((user) => {
      setUsers((prev) => {
        const totalScore = prev[user].totalScore + gameData.players[user].score;
        const gamesPlayed = prev[user].gamesPlayed + 1;
        const newStats = {
          wins: prev[user].wins + (gameData.players[user].win ? 1 : 0),
          losses: prev[user].losses + (gameData.players[user].win ? 0 : 1),
          gamesPlayed: gamesPlayed,
          minScore: Math.min(prev[user].minScore, gameData.players[user].score),
          maxScore: Math.max(prev[user].maxScore, gameData.players[user].score),
          totalScore: totalScore,
          avgScore: Math.round((totalScore / gamesPlayed) * 10) / 10,
          numYatzy:
            prev[user].numYatzy + (gameData.players[user].yatzy ? 1 : 0),
        };
        return { ...prev, [user]: newStats };
      });
    });
  }

  function removeUser(user) {
    setUsers((prev) => {
      const updated = { ...prev };
      delete updated[user];
      return updated;
    });
  }

  function resetUser(user) {
    addUser(user);
  }

  return [users, addUser, updateUsers, removeUser, resetUser];
}

export default useUsers;
