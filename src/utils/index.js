import moment from "moment";
export function organizeWeatherData(organizedData) {
	return [...organizedData].map((e, i) => {
		let u = 1;
		const lastIndex = organizedData.length - 1;
		let newData = [...e.data];
		const wantedNum = 8;
		let neededData = wantedNum - newData.length;
		while (newData.length < wantedNum && i !== lastIndex) {
			newData = [
				...newData,
				...organizedData[i + u].data.slice(0, neededData),
			];
			u++;
			neededData = wantedNum - newData.length;
		}
		return newData;
	});
}
export function extractWeatherInformation(data) {
	const { main, description, icon, id } = data.weather[0];
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
		id,
	};
}
export function getHour(time) {
	return time.split(":")[0];
}
export function cityNameData(data) {
	return data.map((e) => [e.country, { cities: e.cities }]);
}
export function removeDataAttribute(element, attr) {
	console.log(element);
}
export function compareStrings(string1, string2) {
	return string1.toLowerCase().trim() === string2.toLowerCase().trim();
}
