import { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState();
  const [selectedBoard, setSelectedBoard] = useState(); // Add selectedBoard state
  const [user, setUser] = useState();
  const [chats, setChats] = useState([]);
  const [boards, setBoards] = useState([]); // Add boards state

  const history = useHistory();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);

    if (!userInfo) {
      history.push("/");
    }
  }, [history]);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        selectedChat,
        setSelectedChat,
        selectedBoard,
        setSelectedBoard,
        chats,
        setChats,
        boards,
        setBoards,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppState = () => {
  return useContext(AppContext);
};

export default AppProvider;
