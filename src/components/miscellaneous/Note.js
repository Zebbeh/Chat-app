import React from "react";
import { Box, Text, Badge, Flex, Button } from "@chakra-ui/react";

const Note = ({
  title,
  content,
  sender,
  createdAt,
  updatedAt,
  onEdit,
  onRemove,
}) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      width="300px"
      backgroundColor="white"
      boxShadow="md"
      transition="transform 0.2s"
      _hover={{ transform: "scale(1.02)" }}
    >
      <Button onClick={onEdit}>Edit</Button>
      <Button size="sm" colorScheme="red" onClick={onRemove}>
        Remove
      </Button>
      <Text fontWeight="bold" fontSize="xl" mb={2}>
        {title}
      </Text>
      <Text fontSize="md" color="gray.600" mb={4}>
        {content}
      </Text>
      <Flex justify="space-between">
        <Badge colorScheme="teal">{`Created: ${createdAt}`}</Badge>
      </Flex>
      <Badge colorScheme="teal">{`Last updated:  ${updatedAt}`}</Badge>
    </Box>
  );
};

export default Note;
