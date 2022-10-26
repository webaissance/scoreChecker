import React from "react";
import { VStack, FlatList, Text } from "native-base";
import ScoreItem from "./ScoreItem";
import ScoresLoading from "./ScoresLoading";
import { colorScheme } from "../../constants";
import { windowWidth } from "../../utils/dimensions";
import type { GameType } from "../../types/scores";

const Scores = ({ games }: { games: GameType[] }) => {
  const numOfGames = games.length;
  const renderGame = ({ item }: { item: GameType }) => (
    <ScoreItem key={item.gameId} game={item} />
  );

  return (
    <VStack
      flex={1}
      w={windowWidth}
      alignSelf="center"
      justifyContent="center"
    >
      <VStack safeArea>
        {numOfGames >= 1 ? (
          <Text
            alignSelf="center"
            fontSize="md"
            fontWeight={100}
            fontStyle="italic"
            mb={4}
            color={colorScheme.text}
          >
            {numOfGames + " Games"}
          </Text>
        ) : (
          <ScoresLoading />
        )}
        <FlatList
          data={games}
          renderItem={renderGame}
          keyExtractor={(item) => item.gameId.toString()}
        />
      </VStack>
    </VStack>
  );
};

export default Scores;
