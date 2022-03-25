import React, { Component, useEffect, useRef, useState } from "react";

import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { LoadingButton } from "@mui/lab";
import Grid from "@mui/material/Grid";
import FormHelperText from "@mui/material/FormHelperText";
import { useDispatch, useSelector } from "react-redux";

import TextMaskCustom, {
	TextMaskCustomCreate,
} from "../components/textFieldMask";
import Copyright from "../components/copyright";
import SimpleDialog from "../components/simpleDialog";
import { actionsCreator } from "../store/payment.reducer";
import {
	selectSendOrderLoading,
	selectSendResponse,
	selectSendError,
} from "../store/payment.selector";

/**
 * Fields
 */
const FieldCardNumber = TextMaskCustomCreate("0000 0000 0000 0000");
const FieldExpDate = TextMaskCustomCreate("##/####");
const FieldCvv = TextMaskCustomCreate("###");
const FieldAmount = TextMaskCustomCreate("000000");

const errorMessages = {
	"0x0": "Card number field not a number",
	"0x1": "Card number should contain 16 digits",
	"0x2": "Expiration date field not a number",
	"0x3": "Expiration date should contain month and year in MM/YYYY format",
	"0x4": "Cvv field not a number",
	"0x5": "Cvv should contain 3 digits",
	"0x6": "Amount field not a number",
	"0x7": "Amount should be less than $100000",
};

/**
 * Component
 */
const PaymentPage = () => {
	const [paymentData, setPaymentData] = useState({
		cardNumber: "",
		expDate: "",
		cvv: "",
		amount: "",
	});

	const isLoading = useSelector(selectSendOrderLoading);
	const dialogResponse = useSelector(selectSendResponse);
	const inputErrors = useSelector(selectSendError);

	useEffect(() => {
		setPaymentData({
			cardNumber: "",
			expDate: "",
			cvv: "",
			amount: "",
		});
	}, [dialogResponse]);

	const dispatch = useDispatch();

	const validateEmptyFields = () => {
		return (
			paymentData.cardNumber !== "" &&
			paymentData.expDate !== "" &&
			paymentData.cvv !== "" &&
			paymentData.amount !== ""
		);
	};

	const handleChange = (event) => {
		setPaymentData({
			...paymentData,
			[event.target.name]: formatPayment(event.target),
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = {
			CardNumber: ReplaceAll(paymentData.cardNumber, " ", ""),
			ExpDate: ReplaceAll(paymentData.expDate, "/", ""),
			Cvv: paymentData.cvv,
			Amount: paymentData.amount,
		};
		dispatch(actionsCreator.sendOrder(data));
		//console.log("SUBMIT");
	};

	return (
		<React.Fragment>
			<Container maxWidth="xs">
				<Box
					sx={{
						"& > :not(style)": {
							m: 1,
							width: "100%",
						},
					}}
				>
					<form onSubmit={handleSubmit}>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<Typography variant="h3" component="h2">
									Order Form
								</Typography>
							</Grid>
							<Grid item xs={12}>
								<FormControl
									error={inputErrors.CardNumber !== undefined}
									variant="standard"
									disabled={isLoading}
									style={{ width: "100%" }}
								>
									<InputLabel htmlFor="formatted-text-mask-input">
										Card Number:
									</InputLabel>
									<Input
										value={paymentData.cardNumber}
										onChange={handleChange}
										name="cardNumber"
										id="formatted-text-mask-input"
										inputComponent={FieldCardNumber}
									/>
									<FormHelperText id="component-error-text">
										{errorMessages[inputErrors.CardNumber]}
									</FormHelperText>
								</FormControl>
							</Grid>

							<Grid item xs={12}>
								<FormControl
									error={inputErrors.ExpDate !== undefined}
									variant="standard"
									disabled={isLoading}
								>
									<InputLabel htmlFor="formatted-text-mask-input">
										Expiration Date:
									</InputLabel>
									<Input
										value={paymentData.expDate}
										onChange={handleChange}
										name="expDate"
										id="formatted-text-mask-input"
										inputComponent={FieldExpDate}
									/>
									<FormHelperText id="component-error-text">
										{errorMessages[inputErrors.ExpDate]}
									</FormHelperText>
								</FormControl>
							</Grid>

							<Grid item xs={12}>
								<FormControl
									error={inputErrors.Cvv !== undefined}
									variant="standard"
									disabled={isLoading}
								>
									<InputLabel htmlFor="formatted-text-mask-input">
										CVV
									</InputLabel>
									<Input
										value={paymentData.cvv}
										onChange={handleChange}
										name="cvv"
										id="formatted-text-mask-input"
										inputComponent={FieldCvv}
									/>
									<FormHelperText id="component-error-text">
										{errorMessages[inputErrors.Cvv]}
									</FormHelperText>
								</FormControl>
							</Grid>

							<Grid item xs={12}>
								<FormControl
									error={inputErrors.Amount !== undefined}
									variant="standard"
									disabled={isLoading}
									style={{ width: "100%" }}
								>
									<InputLabel htmlFor="formatted-text-mask-input">
										Amount
									</InputLabel>
									<Input
										value={paymentData.amount}
										onChange={handleChange}
										name="amount"
										id="formatted-text-mask-input"
										inputComponent={FieldAmount}
										startAdornment={
											<InputAdornment position="start">$</InputAdornment>
										}
									/>
									<FormHelperText id="component-error-text">
										{errorMessages[inputErrors.Amount]}
									</FormHelperText>
								</FormControl>
							</Grid>

							<Grid item xs={12}>
								<LoadingButton
									disabled={!validateEmptyFields()}
									sx={{ m: 5 }}
									style={{ width: "100%" }}
									type="submit"
									loading={isLoading}
									loadingIndicator="Loading..."
									variant="outlined"
								>
									Pay Now
								</LoadingButton>
							</Grid>
						</Grid>
					</form>
				</Box>
				<Copyright sx={{ mt: 8, mb: 4 }} />
			</Container>

			<SimpleDialog
				open={dialogResponse.length !== 0}
				onClose={() => dispatch(actionsCreator.clearResponse())}
				data={dialogResponse}
			/>
		</React.Fragment>
	);
};

/**
 * Handlers
 */

function ReplaceAll(target, search, replacement) {
	return target.split(search).join(replacement);
}

function formatPayment(target) {
	let inputStr = target.value;

	if (target.name === "expDate") {
		let dateStr = Array.from(inputStr ?? "").filter((c) =>
			Number.isInteger(parseInt(c))
		);
		let monthStr = "";
		let yearStr = "";
		for (let i = 0; i < 4; i++) {
			let set = i < dateStr.length ? dateStr[i] : "0";
			if (i < 2) monthStr += set;
			else yearStr += set;
		}

		let month = parseInt(monthStr);
		let year = parseInt(yearStr);

		var currentTime = new Date();
		let current_month = currentTime.getMonth() + 1;
		let current_year = currentTime.getFullYear();

		const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
		year = clamp(year, current_year, current_year + 10);
		if (current_year === year) month = clamp(month, current_month, 12);
		else month = clamp(month, 1, 12);

		monthStr = month.toString();
		yearStr = year.toString();

		let result = "";
		for (let i = 0; i < dateStr.length; i++) {
			if (i < 2) result += monthStr[i % 2];
			else result += yearStr[i - 2];
		}

		inputStr = result;
	}
	return inputStr;
}

/**
 * Export
 */
export default PaymentPage;

/**
 * Tasks
 */
/*1) Приложение должно выводить форму с полями:
- Card Number
- Expiration Date
- CVV
- Amount

2) Валидация:
- Card Number - (только цифры, длина значения 16)
- Expiration Date (формат даты MM/YYYY)
- CVV (только цифры, длина значения 3)
- Amount (только цифры)

3) Кнопка "оплатить":
- должна быть активно если все поля введены корректно
- при нажатии идет запрос на сервер с данными формы в формате JSON

4) сервер: (expess/featherjs)
- должен сохранять данные в mongoDB
- при успешном сохранении должнен возвращать ответ ID записи и Amount в формате JSON
пример запроса { "CardNumber": '0000000000000000', ExpDate: '04/2022', Cvv: '123', Amount: 100 }
пример ответа { "RequestId": '61b248040041bc64b411a691', Amount: 100 } (edited)
*/
