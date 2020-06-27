import moment from "moment";
export function organizeWeatherData(organizedData) {
	return [...organizedData].map((e, i) => {
		let u = 1;
		const lastIndex = organizedData.length - 1;
		let newData = [...e.data];
		let neededData = 10 - newData.length;
		while (newData.length < 10 && i !== lastIndex) {
			newData = [
				...newData,
				...organizedData[i + u].data.slice(0, neededData),
			];
			u++;
			neededData = 10 - newData.length;
		}
		return newData;
	});
}
export function extractWeatherInformation(data) {
	const { main, description, icon } = data.weather[0];
	const { temp, pressure, humidity, feels_like } = data.main;
	const wind_speed = data.wind.speed;
	const country = data.sys.country;
	const time = moment(data.dt_txt).format("h:mm A");
	const day = moment(data.dt_txt).format("dddd");
	return {
		main,
		feels_like,
		description,
		icon,
		temp,
		pressure,
		humidity,
		wind_speed,
		time,
		day,
		country,
	};
}
