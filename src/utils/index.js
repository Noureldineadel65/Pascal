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
export function compareStrings(string1, string2) {
	return string1.toLowerCase().trim() === string2.toLowerCase().trim();
}
export function cityNameData(data) {
	const organized = [];
	for (const [key, value] of Object.entries(data)) {
		organized.push([key, { data: value }]);
	}
	return organized;
}
