import React, { Component } from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

function Copyright(props) {
	return (
		<Typography
			variant="body2"
			color="text.secondary"
			align="center"
			{...props}
		>
			{"Data Subsystems Copyright © Victor CardForm-Test "}

			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

export default Copyright;
