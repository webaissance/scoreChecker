import React, { useEffect, useReducer } from "react";
import { StackNavigationProp } from '@react-navigation/stack';
import { Box, ScrollView, KeyboardAvoidingView } from "native-base";
import PlayerProfile from "../components/players/PlayerProfile";
import PlayerSearch from "../components/players/PlayerSearch";
import { handleInput, initialState, loadPlayerInfo, reducer } from "../utils/player";
import { colorScheme } from "../constants";

const PlayerScreen = ({ navigation }: {
  navigation: StackNavigationProp<{ item: object }>
}) => {

  const [state, dispatch] = useReducer(reducer, initialState);
  // initial api call to set Toppin profile
  useEffect(() => {
    const initData = loadPlayerInfo(initialState.playerInfo.fullName, dispatch);
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
          <PlayerSearch
            handleInput={handleInput}
            dispatch={dispatch}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    </Box>
  );
};

export default PlayerScreen;
