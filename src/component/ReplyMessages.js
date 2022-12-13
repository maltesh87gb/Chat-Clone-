import { Box, Button, Paper, TextField } from "@mui/material";
import React, { useState } from "react";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";

const ReplyMessages = (props) => {
  const { handelSubmit, subMitLabel, intialText = "" } = props;

  const [text, setText] = useState(intialText);
  const isTextareaDisabled = text.length === 0;

  const onSubmit = (event) => {
    event.preventDefault();
    handelSubmit(text);
    setText("");
  };
  return (
    <>
      <Box
        component="div"
        sx={{
          left: "101px",
          width: "550px",
        }}
      >
        <Paper
          sx={{
            width: "513px",
            height: "158px",
            display: "flex",
            flexDirection: "row",
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
            style={{
              display: "flex",
              flexDirection: "column",
              width: 476,
              height: 86,
            }}
          >
            <TextField
              rows={2}
              multiline={true}
              sx={{ padding: "16px 0px 6px 16px" }}
              variant="outlined"
              id="mui-theme-provider-outlined-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <Button
              variant="contained"
              size="medium"
              sx={{ marginLeft: "auto", marginTop: "12px" }}
              onClick={onSubmit}
              disabled={isTextareaDisabled}
            >
              {subMitLabel}
            </Button>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default ReplyMessages;
