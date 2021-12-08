import React, { useState, useEffect } from "react";
import { Dimensions, ActivityIndicator } from "react-native";
import {
  Text,
  Image,
  Divider,
  VStack,
  Stack,
  HStack,
  Heading,
} from "native-base";
import InfoButton from "./InfoButton";
import NBA from "nba";
import logos from "../../logoManager";
import { colorScheme } from "../../constants";
// WebP only images currently, todo: png/jpeg backups
// logo 35 x 50
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
import { MotiView, MotiText } from "moti";

const ScoreItem = ({ u, navigation }) => {
  const [homeScore, setHome] = useState(0);
  const [extendedState, setExtended] = useState(0);
  const [awayScore, setAway] = useState(0);
  const splitAt = (index) => (x) => [x.slice(0, index), x.slice(index)];
  let comp = u.gamecode.slice(-6);
  let date = u.gamecode.slice(0, 8);
  let splitTeam = splitAt(3)(comp);
  let [awayTeam, homeTeam] = [splitTeam[0], splitTeam[1]];
  let [awayLogo, homeLogo] = [logos[awayTeam], logos[homeTeam]];

  useEffect(() => {
    async function initData() {
      NBA.data
        .boxScore(date, u.gameId)
        .then((res) => res.sports_content)
        .then((res) => res.game)
        .then((res) => {
          setAway(res.visitor.score);
          setHome(res.home.score);
        });
    }
    initData();
  }, [u.gameId]);

  return (
    <VStack
      width={windowWidth * 0.935}
      bg={colorScheme.foreground}
      alignItems="center"
      alignSelf="center"
      justifyContent="center"
      borderRadius={6}
      mb={20}
      bottom={0}
      shadowColor="#000"
      shadowOffset={{ width: 0, height: 2 }}
      shadowOpacity={0.55}
      shadowRadius={3.84}
      elevation={5}
      p={1}
    >
      <HStack alignItems="center" my={5}>
        <VStack alignItems="center">
          <MotiView
            alignItems="center"
            from={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "timing",
              duration: 1050,
            }}
          >
            <Heading
              color={colorScheme.text}
              fontSize="xl"
              fontFamily="heading"
              fontWeight={700}
              mb={2}
            >
              {awayTeam} {awayScore == 0 ? "" : "-  " + awayScore}
            </Heading>
            {/* Team Logos */}
            <Image
              accessibilityLabel={awayTeam}
              source={awayLogo}
              w={50}
              h={50}
              m={1}
              PlaceholderContent={<ActivityIndicator />}
              alt="Away Logo"
            />
          </MotiView>
        </VStack>

        <Heading
          color={colorScheme.text}
          mx={25}
          fontWeight={700}
          fontFamily="body"
        >
          @
        </Heading>

        <VStack alignItems="center">
          <MotiView
            alignItems="center"
            from={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "timing",
              duration: 1050,
            }}
          >
            <Heading
              color={colorScheme.text}
              fontSize="xl"
              mb={2}
              fontFamily="heading"
              fontWeight={700}
            >
              {homeTeam} {homeScore == 0 ? "" : "-  " + homeScore}
            </Heading>
            <Image
              accessibilityLabel={homeTeam}
              source={homeLogo}
              w={50}
              h={50}
              m={1}
              PlaceholderContent={<ActivityIndicator />}
              alt="Home Logo"
            />
          </MotiView>
        </VStack>
      </HStack>
      {/* Game Status(Shows postponed, game times in EST and info is selectable only if game is already played ) */}
      <Text
        color={colorScheme.text}
        alignSelf="center"
        fontSize="lg"
        fontWeight={500}
        fontStyle="italic"
      >
        {u.gameStatusText != "PPD" ? u.gameStatusText : "Postponed"}
      </Text>
      <Divider
        bg="#D8572A"
        w={windowWidth * 0.8}
        h={1}
        alignSelf="center"
        mb={5}
      />
      <VStack alignItems="center">
        <Text alignSelf="center" fontSize="md" fontWeight="light">
          {u.gameStatusText != "Final" &&
          u.gameStatusText != "PPD" &&
          u.livePeriodTimeBcast.charAt(1) != "0"
            ? u.livePeriodTimeBcast
            : ""}
        </Text>
        <InfoButton navigation={navigation} u={u} />
      </VStack>
    </VStack>
  );
};

export default ScoreItem;
