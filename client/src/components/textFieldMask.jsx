import React, { Component, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import { IMaskInput } from "react-imask";

const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
	const { onChange, mask, ...other } = props;
	return (
		<IMaskInput
			{...other}
			mask={mask} //"(#00) 000-0000"
			definitions={{
				"#": /[0-9]/,
			}}
			inputRef={ref}
			onAccept={(value) => onChange({ target: { name: props.name, value } })}
			overwrite
		/>
	);
});

export const TextMaskCustomCreate = (mask, prefix) => {
	const comp = React.forwardRef(function TextMaskCustom(props, ref) {
		const { onChange, ...other } = props;
		return (
			<IMaskInput
				{...other}
				mask={mask} //"(#00) 000-0000"
				definitions={{
					"#": /[0-9]/,
				}}
				inputRef={ref}
				onAccept={(value) => onChange({ target: { name: props.name, value } })}
				overwrite
				prefix={prefix}
			/>
		);
	});
	return comp;
};

TextMaskCustom.propTypes = {
	name: PropTypes.number.isRequired,
	onChange: PropTypes.func.isRequired,
};

export default TextMaskCustom;
