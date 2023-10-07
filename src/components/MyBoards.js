// MyBoards.js
import React, { useEffect, useState } from "react";
import { Box, Stack, Text, Button } from "@chakra-ui/react";
import axios from "axios";
import { AddIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import BoardModal from "./miscellaneous/BoardModal";
import { ChatLoading } from "./ChatLoading";
import { useAppState } from "../Context/AppProvider";
import NotesDisplay from "./NotesDisplay";
import NoteModal from "./miscellaneous/NoteModal";

const MyBoards = ({ fetchAgain }) => {
  const { selectedBoard, setSelectedBoard, user, boards, setBoards } =
    useAppState();
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [isNewBoardModalOpen, setIsNewBoardModalOpen] = useState(false);
  const [notes, setNotes] = useState([]);

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
    }
  };

  const clearSelectedBoard = () => {
    setSelectedBoard(null);
  };

  const closeNewBoardModal = () => {
    setIsNewBoardModalOpen(false);
  };

  const openNoteModal = () => {
    console.log("Opening note modal");
    setIsNoteModalOpen(true);
  };

  const closeNoteModal = () => {
    setIsNoteModalOpen(false);
  };

  useEffect(() => {
    fetchBoards();
  }, [user.token, fetchAgain]);

  return (
    <Box p={3} bg="white" w="100%" borderRadius="lg" borderWidth="1px">
      {selectedBoard ? (
        <>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Button
              onClick={clearSelectedBoard}
              variant="link"
              leftIcon={<ChevronLeftIcon />}
            >
              Back
            </Button>
            <Text>{selectedBoard.boardName}</Text>
            <Button onClick={openNoteModal}>New Note</Button>

            <NoteModal
              isOpen={isNoteModalOpen}
              onClose={closeNoteModal}
            ></NoteModal>
          </Box>
          <NotesDisplay />
        </>
      ) : (
        <>
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
            <BoardModal onClose={closeNewBoardModal}>
              <Button
                display="flex"
                fontSize={{ base: "17px", md: "10px", lg: "17px" }}
                rightIcon={<AddIcon />}
              >
                New Board
              </Button>
            </BoardModal>
          </Box>

          <Stack overflowY="scroll">
            {boards ? (
              boards.map((board) => (
                <Box
                  onClick={() => {
                    console.log("Board clicked:", board);
                    setSelectedBoard(board);
                  }}
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
              ))
            ) : (
              <ChatLoading />
            )}
          </Stack>
        </>
      )}
    </Box>
  );
};

export default MyBoards;
