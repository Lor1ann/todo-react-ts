import { TextField, Button, Checkbox } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export const AddField = (props: {
  addTask: any;
  text: string;
  getText: any;
  getCheck: any;
  checked: boolean;
}) => {
  return (
    <div className="field">
      <Checkbox
        checked={props.checked}
        className="checkbox"
        onClick={props.getCheck}
        icon={<RadioButtonUncheckedIcon />}
        checkedIcon={<CheckCircleIcon />}
      />
      <TextField
        placeholder="Введите текст задачи..."
        value={props.text}
        onChange={props.getText}
        variant="standard"
        fullWidth
      />
      <Button onClick={() => props.addTask(props.text)}>
        <AddIcon />
      </Button>
    </div>
  );
};
