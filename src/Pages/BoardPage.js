import React from "react";
import { useAppState } from "../Context/AppProvider";
import { Box } from "@chakra-ui/react";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import BoardArea from "../components/BoardArea";
import MyBoards from "../components/MyBoards"; // Import MyBoards component
import { useParams } from "react-router-dom";

const BoardPage = () => {
  const { user } = useAppState();
  const { boardId } = useParams();

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="91.5vh"
        p="10px"
      >
        {!boardId && user && <MyBoards />}{" "}
        {/* Render MyBoards if no board is chosen */}
        {user && boardId && <BoardArea />}{" "}
        {/* Render BoardArea when boardId is present */}
      </Box>
    </div>
  );
};

export default BoardPage;
