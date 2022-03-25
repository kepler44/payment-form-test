import axios from "axios";
/**
 * Axios
 */
const axiosRequest = axios.create({
	baseURL: "http://localhost:8080",
	validateStatus: function (status) {
		return status === 200 || status === 400;
	},
});

export default axiosRequest;
