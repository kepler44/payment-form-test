import * as React from "react";
import axiosRequest from "../components/axios";

const OrderHistory = () => {
	const [history, setHistory] = React.useState(undefined);
	React.useEffect(() => {
		const fetchHistory = async () => {
			const res = await axiosRequest.get("/payments");
			setHistory(res.data);
		};
		fetchHistory();
	}, []);

	if (!history) return <div>Loading...</div>;
	return (
		<div>
			{history.map((e, i) => {
				return <div key={i}>{JSON.stringify(e)}</div>;
			})}
		</div>
	);
};

export default OrderHistory;
