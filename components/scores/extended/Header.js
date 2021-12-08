import React from "react";
import { ActivityIndicator } from "react-native";
import { HStack, Image, Text, VStack } from "native-base";
import { colorScheme } from "../../../constants";

const Header = ({
  gameArena,
  awayTeam,
  awayLogo,
  awayScore,
  homeTeam,
  homeLogo,
  homeScore,
}) => {
  return (
    <VStack alignItems="center">
      <HStack alignItems="center" alignSelf="center" m={5} mb={5}>
        <VStack>
          <Text color={colorScheme.text} mb={5} fontWeight={900}>
            {awayTeam} - {awayScore}
          </Text>
          <Image
            accessibilityLabel={awayTeam}
            source={awayLogo}
            w={50}
            h={50}
            m={2}
            PlaceholderContent={<ActivityIndicator />}
            alt="Away Team Logo"
          />
        </VStack>

        <Text
          color={colorScheme.text}
          justifyContent="center"
          ml={5}
          mr={5}
          fontWeight={500}
        >
          @
        </Text>

        <VStack>
          <Text color={colorScheme.text} mb={5} fontWeight={900}>
            {homeTeam} - {homeScore}{" "}
          </Text>
          <Image
            accessibilityLabel={homeTeam}
            source={homeLogo}
            w={50}
            h={50}
            m={2}
            PlaceholderContent={<ActivityIndicator />}
            alt="Home Team Logo"
          />
        </VStack>
      </HStack>
      <Text color={colorScheme.text} m={1} fontWeight={300} fontStyle="italic">
        Arena: {gameArena.arena}
      </Text>
      <Text color={colorScheme.text} mb={3} fontWeight={300} fontStyle="italic">
        City: {gameArena.city}, {gameArena.country}
      </Text>
    </VStack>
  );
};

export default Header;
