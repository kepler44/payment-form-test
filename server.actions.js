const validator = require("validator");
const orderDatabase = require("./database/order.model");

const actions = {
	payment_post: async (req, res) => {
		let document = {
			CardNumber: req.body.CardNumber,
			ExpDate: req.body.ExpDate,
			Cvv: req.body.Cvv,
			Amount: req.body.Amount,
		};

		const validateErrors = validatePaymentForm(req.body);
		if (validateErrors.errors !== undefined) {
			const errorJson = {
				message: "Cannot add payment",
				data: validateErrors,
			};
			res.status(400).json({ errors: errorJson });
			throw new Error(JSON.stringify(errorJson));
		}

		try {
			const answer = await orderDatabase.create(document);
			return res.json({
				RequestId: answer._id,
				Amount: answer.Amount,
			});
		} catch (err) {
			const errorJson = {
				message: "Cannot add payment",
				data: err,
			};
			res.status(400).json({ errors: errorJson });
			throw new Error(JSON.stringify(errorJson));
		}
	},
	payment_get: async (req, res) => {
		const loadedData = await orderDatabase
			.find({}, { _id: 0, __v: 0, updatedAt: 0 })
			.sort({ createdAt: -1 });
		return res.json(loadedData);
	},
	payment_validate_post: async (req, res) => {
		const validateErrors = validatePaymentForm(req.body);
		if (validateErrors.errors !== undefined) {
			return res.status(200).json(validateErrors);
		}
		return res.json({ success: "ok" });
	},
};
/**
 * Handlers
 */
function validatePaymentForm(body) {
	let res = {};

	if (!validator.isNumeric(body.CardNumber))
		res = { ...res, CardNumber: "0x0" };
	else if (body.CardNumber.length !== 16) res = { ...res, CardNumber: "0x1" };

	if (!validator.isNumeric(body.ExpDate)) res = { ...res, ExpDate: "0x2" };
	else if (body.ExpDate.length !== 6) res = { ...res, ExpDate: "0x3" };

	if (!validator.isNumeric(body.Cvv)) res = { ...res, Cvv: "0x4" };
	else if (body.Cvv.length !== 3) res = { ...res, Cvv: "0x5" };

	if (!validator.isNumeric(body.Amount)) res = { ...res, Amount: "0x6" };
	else if (body.Amount.length > 6) res = { ...res, Amount: "0x7" };

	/* if (validationErrors.length) {
		req.flash("errors", validationErrors);
		return res.redirect("/");
	} */
	if (Object.keys(res).length === 0) return {};
	return { errors: res };
}

module.exports = actions;
