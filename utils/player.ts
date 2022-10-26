import NBA from "nba";
import { DEFAULT_PLAYER_INFO } from "../constants";
import type { ExtendedInfoType, PlayerResType, ACTIONTYPE } from "../types";

export const initialState = {
  // Obi Toppin as default profile
  playerInfo: DEFAULT_PLAYER_INFO,
};

export const reducer = (state: typeof initialState, action: ACTIONTYPE) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        playerInfo: action.payload,
        error: "",
      };
    case "FETCH_ERROR":
      return {
        playerInfo: {},
        error: "Something went wrong",
      };
    default:
      return state;
  }
};

const experience = (item: number) => {
  if (item < 1) return "Rookie";
  if (typeof item === "number" && item > 1) {
    return item + " Previous Seasons";
  } else return "1 Previous Season";
};


export const collegeCheck = (item: string, itemData: string | number) => {
  // changes school title if no college(future needed for euroleaguers?)
  if (
    !itemData ||
    (typeof itemData === "string" && itemData.includes("HS"))
  ) {
    return "High School";
  } else return item;
};

export const getPlayerInfo = (player: ExtendedInfoType) => {
  return {
    Team: player.teamCity + " " + player.teamName,
    Height: player.height,
    Weight: player.weight,
    PPG: player.pts,
    RPG: player.reb,
    APG: player.ast,
    Season: player.timeFrame,
    Experience: experience(player.seasonExp),
    Position: player.position,
    "Jersey #": player.jersey,
    College: player.school,
    "Draft Round": player.draftRound,
    "Draft Number": player.draftNumber,
    "Draft Year": player.draftYear,
    Country: player.country
  };
};

export const loadPlayerInfo = (playerName: string, dispatch: (value: ACTIONTYPE) => void) => {
  NBA.stats
    .playerInfo({ PlayerID: NBA.findPlayer(playerName).playerId })
    .then((res: PlayerResType) => {
      dispatch({
        type: "FETCH_SUCCESS",
        payload: Object.assign(
          res.commonPlayerInfo[0],
          res.playerHeadlineStats[0]
        ),
      });
    })
    .catch((error: string) => {
      dispatch({ type: "FETCH_ERROR", payload: error });
    });
};


export const handleInput = (item: { player: string }, dispatch: (value: ACTIONTYPE) => void) => {
  // regex to test if 2 words were submitted
  const regNameTest = /^[a-zA-Z]+ [a-zA-Z]+$/;
  let trimmedInput = item.player.trim();
  let newPlayer = NBA.findPlayer(trimmedInput);

  if (!regNameTest.test(trimmedInput)) {
    alert("Please enter the full name of the player.");
    return false;
  } else {
    if (newPlayer != undefined) {
      loadPlayerInfo(trimmedInput, dispatch);
    } else {
      alert("Player not found, Try again.");
    }
  }
};
