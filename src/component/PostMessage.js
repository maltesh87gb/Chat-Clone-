import React, { useState } from "react";
import {
  Avatar,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import ReplyIcon from "@mui/icons-material/Reply";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import ReplyMessages from "./ReplyMessages";

const PostMessage = (props) => {
  const {
    comment,
    replies,
    currentUserId,
    updateCommitMessage,
    deleteComment,
    activeMessage,
    setActiveMessage,
    // handleReply,
    addMessage,
    parentId = null,
  } = props;
  // const tenMinutes = 600000;
  // const timePassed = new Date() - new Date(comment.createdAt) >tenMinutes;
  const canReply = Boolean(currentUserId);
  const canEdit = currentUserId === comment.userId;
  const canDelete = currentUserId === comment.userId;
  const createdAt = new Date(comment.createdAt).toLocaleDateString();
  const [count, setCount] = useState(0);
  const setDecrease = () => {
    if (count > 0) {
      setCount(count - 1);
    } else {
      setCount(0);
    }
  };

  const setIncrease = () => {
    setCount(count + 1);
  };

  const isReplying =
    activeMessage &&
    activeMessage.type === "replying" &&
    activeMessage.id === comment.id;
  const isEditing =
    activeMessage &&
    activeMessage.type === "editing" &&
    activeMessage.id === comment.id;
  const replyId = parentId ? parentId : comment.id;

  return (
    <div>
      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "550px",
          height: "115px",
          marginBottom: "auto",
          marginTop: "60px",
        }}
      >
        <Avatar>{comment.photo}</Avatar>
        <Paper
          sx={{
            width: "513px",
            height: "115px",
            alignItems: "baseline",
            position: "relative",
            marginLeft: "20px",
          }}
        >
          <ArrowLeftIcon
            sx={{
              position: "absolute",
              top: "10px",
              left: "-10px",
              width: "15px",
              height: "15px",
              color: "#F5F5F5",
            }}
          />

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#F5F5F5",
                borderRadius: "40px",
                width: "28px",
                marginLeft: "10px",
                marginRight: "10px",
              }}
            >
              <IconButton>
                <AddIcon onClick={setIncrease} fontSize="small" />
              </IconButton>
              <Typography sx={{ fontSize: "12px" }}>{count}</Typography>
              <IconButton>
                <RemoveIcon onClick={setDecrease} fontSize="small" />
              </IconButton>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box
                gap={5}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  position: "relative",
                  marginLeft: "15px",
                }}
              >
                <Box
                  gap={1}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: "auto",
                  }}
                >
                  <Typography sx={{ color: "#000000DE", fontSize: "14px" }}>
                    {comment.username}
                  </Typography>
                  <Typography sx={{ fontSize: "12px", color: "#616161" }}>
                    {" "}
                    {createdAt}
                  </Typography>
                </Box>
                <Box
                  gap={1}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft: "90px",
                  }}
                >
                  <Stack
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      color: "#FF2929DE",
                      fontSize: "12px",
                    }}
                  >
                    <DeleteOutlineOutlinedIcon fontSize="12px" />
                    {canDelete && (
                      <span onClick={() => deleteComment(comment.id)}>
                        Delete
                      </span>
                    )}
                  </Stack>
                  <Stack
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      color: "#0075C4DE",
                      fontSize: "12px",
                    }}
                  >
                    <EditOutlinedIcon fontSize="12px" />
                    {canEdit && (
                      <span
                        onClick={() =>
                          setActiveMessage({
                            id: comment.id,
                            type: "editing",
                          })
                        }
                      >
                        Edit
                      </span>
                    )}
                  </Stack>
                  <Stack
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      color: "#0075C4DE",
                      fontSize: "12px",
                    }}
                  >
                    <ReplyIcon fontSize="12px" />
                    {canReply && (
                      <span
                        onClick={() =>
                          setActiveMessage({
                            id: comment.id,
                            type: "replying",
                          })
                        }
                      >
                        Reply
                      </span>
                    )}
                  </Stack>
                </Box>
              </Box>

              <Box sx={{ position: "absolute", marginTop: "15px" }}>
                {!isEditing && (
                  <TextField
                    sx={{
                      width: "414px",
                      border: "none",
                      "& fieldset": { border: "none" },
                    }}
                    inputProps={{
                      style: {
                        fontSize: "12px",
                        letterSpacing: "normal",
                        color: "#616161",
                      },
                    }}
                    value={comment.body}
                    multiline
                  />
                )}
                {isEditing && (
                  <ReplyMessages
                    subMitLabel="Update"
                    intialText={comment.body}
                    handelSubmit={(text) =>
                      updateCommitMessage(text, comment.id)
                    }
                  />
                )}
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
      <Box
        sx={{
          marginLeft: "30px",
        }}
      >
        {isReplying && (
          <ReplyMessages
            subMitLabel="Reply"
            handelSubmit={(text) => addMessage(text, replyId)}
          />
        )}
        {replies.length > 0 &&
          replies.map((reply) => {
            return (
              <PostMessage
                comment={reply}
                key={reply.id}
                replies={[]}
                currentUserId={currentUserId}
                deleteComment={deleteComment}
                parentId={comment.id}
                updateCommitMessage={updateCommitMessage}
                addMessage={addMessage}
                activeMessage={activeMessage}
                setActiveMessage={setActiveMessage}
              />
            );
          })}
      </Box>
    </div>
  );
};
export default PostMessage;
