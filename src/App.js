import React, { useState, useEffect } from "react";
import { Flex, Box, Heading, Text, Button } from "@chakra-ui/react";

const Counter = ({ title }) => {
  const [count, setCount] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState("transparent");
  const [isRunning, setIsRunning] = useState(false);

  let timer;

  useEffect(() => {
    if (isRunning) {
      timer = setInterval(() => {
        setCount((prevCount) => prevCount + 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning]);

  useEffect(() => {
    if (count >= 3600) {
      setBackgroundColor("red");
      clearInterval(timer);
    } else if (count >= 1800) {
      setBackgroundColor("yellow");
    }
  }, [count]);

  const handleStartStop = () => {
    setIsRunning((prevState) => !prevState);
  };

  const handleReset = () => {
    setCount(0);
    setIsRunning(false);
    setBackgroundColor("transparent");
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
      borderBottom={"2px solid aqua"}
    >
      <Heading
        size="md"
        className="bg-slate-500 h-10 flex justify-center items-center font-bold text-3xl"
      >
        {title}
      </Heading>
      <Text fontSize="2xl" className="text-red-500 text-2xl font-bold">
        {Math.floor(count / 60)}:
        {count % 60 < 10 ? `0${count % 60}` : count % 60}
      </Text>
      <Flex justify="space-evenly" mt="4">
        <Button
          onClick={handleStartStop}
          colorScheme={isRunning ? "red" : "green"}
          w="80px"
          mr="20"
          className="flex justify-center items-center font-bold overflow-hidden"
        >
          {isRunning ? "Duraklat" : "Başlat"}
        </Button>
        <Button onClick={handleReset} colorScheme="blue" className="font-bold">
          Sıfırla
        </Button>
      </Flex>
    </Box>
  );
};

const App = () => {
  return (
    <Flex justify="center" align="center" h="100vh" className="bg-gray-400 ">
      <Flex
        direction="column"
        align="center"
        className=" my-20"
        border={"4px solid aqua"}
      >
        <Heading className="font-bold text-lg mx-10 border-b-4 border-blue-500 text-blue-700">
          {" "}
          Death Valley Monument
        </Heading>
        <Counter title="Dv-1" />
        <Counter title="Dv-2" />
        <Counter title="Dv-3" />
        <Counter title="Dv-4" />
        <Counter title="Dv-5" />
      </Flex>
    </Flex>
  );
};

export default App;
