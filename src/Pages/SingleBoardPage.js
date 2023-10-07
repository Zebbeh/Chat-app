// SingleBoardPage.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Text, Button, Input, VStack, HStack } from "@chakra-ui/react";
import Note from "../components/miscellaneous/Note"; // You'll need to create this component

const SingleBoardPage = ({ match }) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    // Fetch notes for the board based on match.params.boardId
    const fetchBoardNotes = async () => {
      try {
        const response = await axios.get(
          `/api/boards/${match.params.boardId}/notes`
        );
        setNotes(response.data);
      } catch (error) {
        console.error("Error fetching board notes:", error);
      }
    };

    fetchBoardNotes();
  }, [match.params.boardId]);

  const createNote = async () => {
    try {
      const response = await axios.post(
        `/api/boards/${match.params.boardId}/notes`,
        {
          content: newNote,
        }
      );

      // Update the notes state with the newly created note
      setNotes((prevNotes) => [...prevNotes, response.data]);

      // Clear the newNote input field
      setNewNote("");
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  return (
    <Box p={6}>
      {/* Heading section (you can add it later) */}

      {/* Notes section */}
      <VStack align="stretch" spacing={4}>
        <HStack>
          <Input
            placeholder="New note..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
          />
          <Button onClick={createNote}>Add Note</Button>
        </HStack>

        {/* Display existing notes */}
        {notes.map((note) => (
          <Note key={note._id} content={note.content} />
        ))}
      </VStack>
    </Box>
  );
};

export default SingleBoardPage;
