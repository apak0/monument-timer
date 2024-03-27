import React, { useState, useEffect } from "react";
import { Flex, Box, Heading, Text, Button } from "@chakra-ui/react";
import Navbar from "./navbar/Navbar";

const Counter = ({ title }) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [remainingTime, setRemainingTime] = useState(90 * 60); // 90 dakika
  const [backgroundColor, setBackgroundColor] = useState("transparent");
  const [isRunning, setIsRunning] = useState(false);

  let timer;

  useEffect(() => {
    if (isRunning) {
      timer = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
        setRemainingTime((prevRemainingTime) => prevRemainingTime - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning]);

  useEffect(() => {
    if (elapsedTime >= 3600) {
      setBackgroundColor("red");
      clearInterval(timer);
    } else if (elapsedTime >= 1800) {
      setBackgroundColor("yellow");
    }
  }, [elapsedTime]);

  const handleStartStop = () => {
    setIsRunning((prevState) => !prevState);
  };

  const handleReset = () => {
    setElapsedTime(0);
    setRemainingTime(90 * 60);
    setIsRunning(false);
    setBackgroundColor("transparent");
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <Box
      w="200px"
      p="4"
      m="4"
      bg={backgroundColor}
      borderRadius="lg"
      textAlign="center"
      className="this"
      borderRight={"5px solid aqua"}
      borderLeft={"5px solid aqua"}
    >
      <Heading
        size="md"
        className="bg-slate-500 h-10 flex justify-center items-center font-bold text-3xl"
      >
        {title}
      </Heading>
      {isRunning && (
        <>
        <Text fontSize="2xl" className="text-red-200 text-lg font-bold font-mono">
        Geçen Süre: {formatTime(elapsedTime)} Kalan Süre:{" "}
        {formatTime(remainingTime)}
      </Text>
      </>
      )}
      
      <Flex justify="space-evenly" mt="10">
        <Button
          onClick={handleStartStop}
          colorScheme={isRunning ? "red" : "green"}
          w="80px"
          mr="20"
          border={"2px solid blue"}
          className="flex justify-center items-center font-bold overflow-hidden bg-orange-400"
        >
          {isRunning ? "Duraklat" : "Başlat"}
        </Button>
        <Button
          onClick={handleReset}
          colorScheme="blue"
          className="font-bold p-4 text-white bg-red-400"
          border={"2px solid red"}
        >
          Sıfırla
        </Button>
      </Flex>
    </Box>
  );
};

const App = () => {
  return (
    <div>

      <Navbar />
    <Flex justify="center" align="center" h="100vh" className="bg-gray-400  ">
      <Flex
        direction="row"
        align="center"
        className=" my-20 h-56  "
        border={"4px solid aqua"}
        >
        <Heading className="font-bold text-2xl   mx-10 border-b-4 border-blue-500 text-blue-700">
          Death Valley Monument
        </Heading>
        <Counter title="Dv-1" />
        <Counter title="Dv-2" />
        <Counter title="Dv-3" />
        <Counter title="Dv-4" />
        <Counter title="Dv-5" />
      </Flex>
    </Flex>
        </div>
  );
};

export default App;
