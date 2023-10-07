// NoteModal.js
import React, { useState, useCallback } from "react";
import {
  Button,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useAppState } from "../../Context/AppProvider";
import axios from "axios";

const NoteModal = ({ isOpen, onClose }) => {
  const [noteContent, setNoteContent] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const { user, selectedBoard, setBoards } = useAppState();
  const toast = useToast();

  const fetchNotes = useCallback(async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/board/${selectedBoard._id}/notes`,
        config
      );

      setBoards((prevBoards) =>
        prevBoards.map((board) =>
          board._id === selectedBoard._id ? { ...board, notes: data } : board
        )
      );
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  }, [user.token, selectedBoard._id, setBoards]);

  const handleNoteContentChange = (e) => {
    setNoteContent(e.target.value);
  };

  const handleNoteTitleChange = (e) => {
    setNoteTitle(e.target.value);
  };

  const handleAddNote = async () => {
    if (!noteTitle || !noteContent) {
      toast({
        title: "Error occurred!",
        description: "Failed to send the note",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        "/api/note",
        {
          title: noteTitle,
          content: noteContent,
          boardId: selectedBoard._id,
        },
        config
      );

      setBoards((prevBoards) =>
        prevBoards.map((board) =>
          board._id === selectedBoard._id
            ? { ...board, notes: [...board.notes, data] }
            : board
        )
      );

      // Fetch notes after a short delay to allow the server to update
      setTimeout(() => {
        fetchNotes();
      }, 500);

      onClose();
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: "Failed to load the messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add a New Note</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            value={noteTitle}
            onChange={handleNoteTitleChange}
            placeholder="Note title"
          />
          <Textarea
            value={noteContent}
            onChange={handleNoteContentChange}
            placeholder="Enter your note here"
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleAddNote}>
            Add Note
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NoteModal;
