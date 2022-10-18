import React, { useEffect, useReducer } from "react";
import { StackNavigationProp } from '@react-navigation/stack';
import { Box, ScrollView, KeyboardAvoidingView } from "native-base";
import NBA from "nba";
import PlayerProfile from "../components/players/PlayerProfile";
import PlayerSearch from "../components/players/PlayerSearch";
import { DEFAULT_PLAYER_INFO, colorScheme } from "../constants";
import { PlayerInfoType, PlayerStatsType } from "../types";


type PlayerProps = {
  "availableSeasons"?:
  {
    "seasonId": string;
  }[],
  "commonPlayerInfo"?: PlayerInfoType
  "playerHeadlineStats"?: PlayerStatsType
}

type ScreenProps = {
  navigation: StackNavigationProp<{ item: object }>
}

type ACTIONTYPE =
  | { type: "FETCH_SUCCESS"; payload: any }
  | { type: "FETCH_ERROR"; payload: string };

const initialState = {
  // Obi Toppin as default profile
  playerInfo: DEFAULT_PLAYER_INFO,
};

const reducer = (state: typeof initialState, action: ACTIONTYPE) => {
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
      console.log(state);
      return state;
  }
};

const PlayerScreen = ({ navigation }: ScreenProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const loadPlayerInfo = (playerName: string) => {
    NBA.stats
      .playerInfo({ PlayerID: NBA.findPlayer(playerName).playerId })
      .then((res: PlayerProps) => {
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

  const handleInput = (item: { player: string }) => {
    // regex to test if 2 words were submitted
    const regNameTest = /^[a-zA-Z]+ [a-zA-Z]+$/;
    let trimmedInput = item.player.trim();
    let newPlayer = NBA.findPlayer(trimmedInput);

    if (!regNameTest.test(trimmedInput)) {
      alert("Please enter the full name of the player.");
      return false;
    } else {
      if (newPlayer != undefined) {
        loadPlayerInfo(trimmedInput);
      } else {
        alert("Player not found, Try again.");
      }
    }
  };
  // initial api call to set Toppin profile
  useEffect(() => {
    const initData = loadPlayerInfo(initialState.playerInfo.fullName);
    return () => {
      initData;
    };
  }, []);

  return (
    <Box bg={colorScheme.background}>
      <ScrollView>
        <KeyboardAvoidingView>
          <PlayerProfile
            playerInfo={state.playerInfo}
            navigation={navigation}
          />
          <PlayerSearch handleInput={handleInput} />
        </KeyboardAvoidingView>
      </ScrollView>
    </Box>
  );
};

export default PlayerScreen;