// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

import { runSaga } from "redux-saga";

export async function recordSaga(saga, initialAction) {
	const dispatched = [];

	await runSaga(
		{
			dispatch: (action) => dispatched.push(action),
		},
		saga,
		initialAction
	).done;

	return dispatched;
}

beforeEach(() => {
});

afterEach(() => {
});

test("city database has Vienna", () => {
	expect(isCity("Vienna")).toBeTruthy();
});

test("city database has San Juan", () => {
	expect(isCity("San Juan")).toBeTruthy();
});

/* 
import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders learn react link", () => {
	render(<App />);
	const linkElement = screen.getByText(/learn react/i);
	expect(linkElement).toBeInTheDocument();
});
 */
