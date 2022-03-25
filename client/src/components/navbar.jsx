import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";

function Navbar() {
	const navigate = useNavigate();
	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
						<Button
							onClick={() => navigate("/", { replace: false })}
							sx={{ my: 2, color: "white", display: "block" }}
						>
							{"Home"}
						</Button>
						<Button
							onClick={() => navigate("/orders", { replace: false })}
							sx={{ my: 2, color: "white", display: "block" }}
						>
							{"Orders"}
						</Button>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
export default Navbar;
