import React, { useState, useEffect } from "react";
import { Box, Text } from "native-base";
import { MotiView, AnimatePresence } from "moti";
import PlayerHeader from "../PlayerHeader";
import Info from "../ExtendedInfo";
import { SubmitButton, LoadingButton } from "../../Buttons";
import { colorScheme } from "../../../constants";
import { windowHeight, windowWidth } from "../../../utils/dimensions";
import type { PlayerInfoType } from "../../../types";

type ProfileProps = {
  playerInfo: PlayerInfoType;
  navigation: {
    navigate: (arg0: string, arg1: object) => void;
  }
}

const Profile = ({ playerInfo, navigation }: ProfileProps) => {
  const [loading, setLoading] = useState(true);
  const { pl } = playerInfo;

  const infoList = {
    "Team:": `${pl.tc} ${pl.tn}`,
    "Height:": `${pl.ht}`,
    "Weight:": `${pl.wt}`,
    "PPG:": `${pl.ca.pts}`,
    "APG:": `${pl.ca.ast}`,
    "RPG:": `${pl.ca.reb}`,
  };

  useEffect(() => {
    const checkInfo = () => {
      return playerInfo.pl !== undefined ? setLoading(false) : setLoading(true);
    };
    return () => {
      checkInfo();
    };
  }, [pl]);

  return (
    <Box
      alignSelf="center"
      w={windowWidth * 0.98}
      h={windowHeight * 0.65}
      borderRadius={3}
      px={5}
      mt={2}
      bg={colorScheme.foreground}
      shadow="4"
    >
      <AnimatePresence exitBeforeEnter>
        {loading && (
          <MotiView
            key="loading"
            from={{ opacity: 0.4, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "timing",
              duration: 150,
              delay: 50,
            }}
            exit={{
              opacity: 0,
            }}
          >
            <LoadingButton />
          </MotiView>
        )}
        {!loading && (
          <MotiView
            from={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "timing",
              duration: 250,
              delay: 200,
            }}
            exit={{ opacity: 0 }}
          >
            <PlayerHeader pl={pl} />
            {Object.entries(infoList).map(([item, value]) => (
              <Info
                name={item}
                value={value}
                colorScheme={colorScheme}
                key={value + 'key'}
              />
            ))}
            <SubmitButton
                /* Navigate to the Extended Profile route with params */
              onPress={() => { navigation.navigate("Extended Profile", { pl });}}
            >
              <Text
                color={colorScheme.text}
                fontStyle="italic"
                fontWeight={300}
              >
                CLICK FOR MORE INFO{" "}
              </Text>
            </SubmitButton>
          </MotiView>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default Profile;
