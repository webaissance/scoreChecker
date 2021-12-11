import React, { useEffect, useState } from "react";
import { Box, VStack, HStack, Heading, Text, Image } from "native-base";
import { Dimensions } from "react-native";
import { colorScheme } from "../../../constants";
import DropDown from "./DropDown";
import { color } from "react-native-reanimated";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const StatLeaders = ({
  awayLeadValue,
  awayPic,
  awayPlayer,
  homePlayer,
  homeLeadValue,
  homePic,
  statState,
  scoreInfo,
  changeStats,
  date,
}) => {
  const leaderHeading = statState.slice(0, -1);

  return (
    <VStack w={windowWidth} alignItems="center" justifyContent="center">
      <DropDown statState={statState} changeStats={changeStats} />
      <Box
        justifyContent="center"
        alignItems="center"
        borderRadius={3}
        mb={1}
        p={2.2}
        w={windowWidth * 0.45}
        h={25}
        bg={colorScheme.foreground}
        shadowColor="#000"
        shadowOffset={{ width: 1, height: 2 }}
        shadowOpacity={0.65}
        shadowRadius={2.84}
        elevation={4}
      >
        <Heading color={colorScheme.text} fontSize="lg" fontWeight={600}>
          {leaderHeading} Leaders
        </Heading>
      </Box>
      <HStack mb={1} alignItems="center" justifyContent="center" m={2}>
        <VStack alignItems="center" m={2} bg="transparent">
          <Heading color={colorScheme.text} size="sm" fontWeight={300}>
            Away
          </Heading>
          <Image
            height={65}
            width={65}
            borderColor={colorScheme.divider}
            borderWidth={0.6}
            borderRadius={50}
            source={{ uri: awayPic }}
            key={awayPlayer + "_img"}
            alt="Away Player"
          />
          <Heading color={colorScheme.text} size="md" fontWeight={700}>
            {awayPlayer}
          </Heading>
          <Text
            color={colorScheme.text}
            fontSize="md"
            fontWeight={300}
            fontStyle="italic"
          >
            {awayLeadValue.StatValue} {statState}
          </Text>
        </VStack>
        <VStack alignItems="center" m={2} bg="transparent">
          <Heading color={colorScheme.text} size="sm" fontWeight={300}>
            Home
          </Heading>
          <Image
            height={65}
            width={65}
            borderColor={colorScheme.divider}
            borderWidth={0.6}
            borderRadius={50}
            source={{ uri: homePic }}
            key={homePlayer + "_img"}
            alt="Home Player"
          />
          <Heading size="md" color={colorScheme.text} fontWeight={700}>
            {homePlayer}
          </Heading>

          <Text
            fontSize="md"
            color={colorScheme.text}
            fontWeight={300}
            fontStyle="italic"
          >
            {homeLeadValue.StatValue} {statState}
          </Text>
        </VStack>
      </HStack>
    </VStack>
  );
};

export default StatLeaders;
