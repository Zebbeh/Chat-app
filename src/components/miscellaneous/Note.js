// Note.js
import React from "react";
import { Box, Text, Card, CardBody } from "@chakra-ui/react";

const Note = ({ title, content }) => {
  return (
    <Box mb={4}>
      <Card>
        <CardBody>
          {title && (
            <Text fontSize="lg" fontWeight="bold" mb={2}>
              {title}
            </Text>
          )}
          <Text>{content}</Text>
        </CardBody>
      </Card>
    </Box>
  );
};

export default Note;
