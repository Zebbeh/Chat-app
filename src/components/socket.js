// socket.js
import io from "socket.io-client";

const ENDPOINT = "http://localhost:5000";
let socket;

export const initSocket = () => {
  socket = io(ENDPOINT);
  return socket;
};

export const subscribeToNoteAdded = (callback) => {
  socket.on("noteAdded", callback);
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
  }
};
