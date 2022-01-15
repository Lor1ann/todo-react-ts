import { TextField, Button, Checkbox } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export const AddField = (props: {
  onAdd: (text: string, checked: boolean) => void;
}) => {
  const [checkAddField, setCheckAddField] = React.useState(false);
  const [text, setText] = React.useState<string>("");

  const onClickAdd = (text: string, checked: boolean) => {
    props.onAdd(text, checked);
    setCheckAddField(false);
    setText("");
  };

  return (
    <div className="field">
      <Checkbox
        checked={checkAddField}
        className="checkbox"
        onChange={(e: any) => setCheckAddField(e.target.checked)}
        icon={<RadioButtonUncheckedIcon />}
        checkedIcon={<CheckCircleIcon />}
      />
      <TextField
        placeholder="Введите текст задачи..."
        value={text}
        onChange={(e: any) => setText(e.target.value)}
        variant="standard"
        fullWidth
      />
      <Button onClick={() => onClickAdd(text, checkAddField)}>
        <AddIcon />
      </Button>
    </div>
  );
};
