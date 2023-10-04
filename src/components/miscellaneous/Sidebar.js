import React from "react";
import { Link } from "react-router-dom";
import { VStack, Text } from "@chakra-ui/react";

const Sidebar = () => {
  const boards = [];

  return (
    <VStack align="start" spacing={4} p={4}>
      <Text fontSize="lg" fontWeight="bold" mb={4}></Text>
      {boards.map((board) => (
        <Link key={board.id} to={`/boards/${board.id}`}>
          <Text>{board.name}</Text>
        </Link>
      ))}
    </VStack>
  );
};

export default Sidebar;
