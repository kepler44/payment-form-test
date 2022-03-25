import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

function SimpleDialog(props) {
	const { onClose, data, open } = props;

	const handleClose = () => {
		onClose();
	};

	if (!data) return null;
	return (
		<Dialog onClose={handleClose} open={open}>
			<DialogTitle>Order Successful</DialogTitle>
			<List sx={{ pt: 0 }}>
				{data.map((v) => (
					<ListItem key={v.key}>
						<ListItemText primary={v.key + ": " + v.value} />
					</ListItem>
				))}
			</List>
		</Dialog>
	);
}

export default SimpleDialog;
