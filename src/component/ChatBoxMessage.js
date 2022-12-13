import React, { useEffect, useState } from "react";
import PostMessage from "./PostMessage";
import ReplyMessages from "./ReplyMessages";
import { Box } from "@mui/system";
import {
  getMessages,
  CreateMessage,
  deleteMessage,
  updateMessage,
} from "./MeesageApi";

const ChatBoxMeesage = (props) => {
  const { currentUserId } = props;

  // const [reply, setReply] = useState(false);
  // const handleReply = () => {
  //     setReply(true);
  // };
  const [backendMessages, setBackendMessages] = useState([]);
  const [activeMessage, setActiveMessage] = useState(null);

  const rootMessages = backendMessages.filter(
    (backendMessage) => backendMessage.parentId === null
  );

  const replyMessage = (commenId) => {
    return backendMessages
      .filter((backendMessage) => backendMessage.parentId === commenId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  };

  const addMessage = (text, parentId) => {
    console.log("addMessage", text, parentId);
    CreateMessage(text, parentId).then((comment) => {
      setBackendMessages([comment, ...backendMessages]);
      setActiveMessage(null);
    });
  };

  const deleteComment = (commentId) => {
    if (window.confirm("are you sure that you want to remove message ?")) {
      deleteMessage(commentId).then(() => {
        const updateBackendMessage = backendMessages.filter(
          (backendMessage) => backendMessage.id !== commentId
        );
        setBackendMessages(updateBackendMessage);
      });
    }
  };
  const updateCommitMessage = (text, commentId) => {
    updateMessage(text, commentId).then(() => {
      const updateBackendMessage = backendMessages.map((backendMessage) => {
        if (backendMessage.id === commentId) {
          return { ...backendMessage, body: text };
        }
        return backendMessage;
      });
      setBackendMessages(updateBackendMessage);
      setActiveMessage(null);
    });
  };
  useEffect(() => {
    getMessages().then((data) => {
      setBackendMessages(data);
    });
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          marginTop: "50px",
          marginBottom: "40px",
          border: "1px solid #dee2e6",
          boxShadow: "none",
          borderBottomLeftRadius: "0px",
          borderBottomRightRadius: "0px",
          backgroundColor: "#ffffff",
          width: "799px",
       
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ margin: "auto", marginTop: "50px", marginBottom: "50px" }}>
          <ReplyMessages subMitLabel="Send" handelSubmit={addMessage} />

          {rootMessages.length > 0 &&
            rootMessages.map((rootMessage) => {
              return (
                <PostMessage
                  key={rootMessage.id}
                  comment={rootMessage}
                  replies={replyMessage(rootMessage.id)}
                  currentUserId={currentUserId}
                  deleteMessage={deleteMessage}
                  activeMessage={activeMessage}
                  setActiveMessage={setActiveMessage}
                  deleteComment={deleteComment}
                  // handleReply={handleReply}
                  addMessage={addMessage}
                  updateCommitMessage={updateCommitMessage}
                />
              );
            })}
        </Box>
      </Box>
    </div>
  );
};
export default ChatBoxMeesage;
