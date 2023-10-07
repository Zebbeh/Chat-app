// SingleBoardPage.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Text,
  Button,
  Input,
  VStack,
  HStack,
  Collapse,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import Note from "../components/miscellaneous/Note";
import { useHistory } from "react-router-dom";
import { useAppState } from "../Context/AppProvider";
import NoteModal from "../components/miscellaneous/NoteModal";
import NoteEditModal from "../components/miscellaneous/NoteEditModal";
import { getSender } from "../config/ChatLogics";

const SingleBoardPage = () => {
  const [notes, setNotes] = useState([]);
  const [editedNote, setEditedNote] = useState(null);
  const [newNote, setNewNote] = useState("");
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const history = useHistory();
  const { selectedBoard, setSelectedBoard, user } = useAppState();
  const [editedNoteTitle, setEditedNoteTitle] = useState("");
  const [editedNoteContent, setEditedNoteContent] = useState("");
  const [editingNote, setEditingNote] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const openEditModal = (note) => {
    setEditedNote(note);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditedNote(null);
    setIsEditModalOpen(false);
  };

  const handleUpdateNote = async (editedNote) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      console.log(editedNote);
      const { data } = await axios.put(
        `/api/note/${editedNote._id}`,
        {
          title: editedNote.title,
          content: editedNote.content,
        },
        config
      );
      console.log("Server response:", data);

      setNotes((prevNotes) =>
        prevNotes.map((note) => (note.id === data._id ? data : note))
      );

      closeEditModal();
      fetchBoardNotes();
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const fetchBoardNotes = async () => {
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

      setNotes(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching board notes:", error);
    }
  };
  useEffect(() => {
    console.log("Selected board:", selectedBoard);
    fetchBoardNotes();
  }, [selectedBoard._id]);

  const openNoteModal = () => {
    setIsNoteModalOpen(true);
  };

  const closeNoteModal = () => {
    setIsNoteModalOpen(false);
  };

  const createNote = async (noteData) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      console.log(noteData);
      const { data } = await axios.post(
        "/api/note",
        {
          title: noteData.title,
          content: noteData.content,
          boardId: noteData.boardId,
        },
        config
      );
      setNotes((prevNotes) => [...prevNotes, data]);
      console.log(data);
      closeNoteModal(); // Close the modal after creating the note
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  const navigateToMyBoards = () => {
    setSelectedBoard(null);
    history.push("/boards");
  };

  const handleRemoveNote = async (noteId) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.delete(`/api/note/${noteId}`, config);

      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== noteId));
    } catch (error) {
      console.error("Error removing note:", error);
    }
  };

  return (
    <Box p={6}>
      {/* Heading section (you can add it later) */}
      <VStack align="stretch" spacing={4}>
        <HStack>
          <Button onClick={navigateToMyBoards}>Back to My Boards</Button>
          <Text fontFamily="Work sans" fontSize="2xl" fontWeight="bold">
            {selectedBoard.boardName}
          </Text>
          <Button onClick={openNoteModal}>New note</Button>
        </HStack>
        {notes.map((note) => (
          <Note
            key={note._id}
            title={note.title}
            content={note.content}
            createdAt={note.createdAt}
            updatedAt={note.updatedAt}
            onEdit={() => openEditModal(note)}
            onRemove={() => handleRemoveNote(note._id)}
          />
        ))}
      </VStack>

      <NoteModal
        isOpen={isNoteModalOpen}
        onClose={closeNoteModal}
        onCreateNote={createNote}
        boardId={selectedBoard._id}
      />

      <Modal isOpen={isEditModalOpen} onClose={closeEditModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Note</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Title</Text>
            <Input
              placeholder="New title..."
              value={editedNote?.title}
              onChange={(e) =>
                setEditedNote((prev) => ({ ...prev, title: e.target.value }))
              }
            />
            <Text>Content</Text>
            <Input
              placeholder="New content..."
              value={editedNote?.content}
              onChange={(e) =>
                setEditedNote((prev) => ({ ...prev, content: e.target.value }))
              }
            />
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handleUpdateNote(editedNote)}
            >
              Save
            </Button>
            <Button onClick={closeEditModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default SingleBoardPage;
