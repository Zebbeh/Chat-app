import React, { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/toast";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import axios from "axios";
import { AddIcon } from "@chakra-ui/icons";
import BoardModal from "./miscellaneous/BoardModal"; // Import the BoardModal component
import { ChatLoading } from "./ChatLoading";
import { useAppState } from "../Context/AppProvider";

const MyBoards = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedBoard, setSelectedBoard, user, boards, setBoards } =
    useAppState();

  const toast = useToast();

  const fetchBoards = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/board", config);
      console.log("Boards data:", data);
      setBoards(data);
    } catch (error) {
      console.error("Error fetching boards:", error);
      toast({
        title: "Error occurred!",
        description: "Failed to load the boards",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchBoards();
  }, [fetchAgain]);

  return (
    <Box
      display={{ base: selectedBoard ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Boards
        <BoardModal>
          <Button
            display="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            New Board
          </Button>
        </BoardModal>
      </Box>

      <Box
        display="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflow="hidden"
      >
        {boards ? (
          <Stack overflowY="scroll">
            {boards.map((board) => (
              <Box
                onClick={() => setSelectedBoard(board)}
                cursor="pointer"
                bg={selectedBoard === board ? "#38B2AC" : "#E8E8E8"}
                color={selectedBoard === board ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={board._id}
              >
                <Text>{board.boardName}</Text>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyBoards;
