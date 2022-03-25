const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
	{
		CardNumber: { type: String, required: true },
		ExpDate: { type: String, required: true },
		Cvv: { type: String, required: true },
		Amount: { type: String, required: true },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);

/* 
{ "CardNumber": '0000000000000000', ExpDate: '04/2022', Cvv: '123', Amount: 100 }
пример ответа { "RequestId": '61b248040041bc64b411a691', Amount: 100 } (edited) */
