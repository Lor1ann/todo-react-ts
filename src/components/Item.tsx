import React from "react";
import { IconButton, Checkbox, ListItem, Typography } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

type Props = {
  text: string;
  checked: boolean;
  onDelete: any;
  id: number;
  onCheck: any;
  onEdit: any;
};

export const Item: React.FC<Props> = (props) => {
  return (
    <ListItem>
      <div className="d-flex item">
        <Checkbox
          onChange={() => props.onCheck(props.id)}
          checked={props.checked}
          icon={<RadioButtonUncheckedIcon />}
          checkedIcon={<CheckCircleIcon />}
        />
        <Typography className="item-text">{props.text}</Typography>
        <div className="item-buttons d-flex">
          <IconButton onClick={() => props.onEdit(props.text, props.id)}>
            <EditIcon style={{ fontSize: 20 }} />
          </IconButton>
          <IconButton onClick={() => props.onDelete(props.id)}>
            <DeleteOutlineIcon style={{ fontSize: 20 }} />
          </IconButton>
        </div>
      </div>
    </ListItem>
  );
};
