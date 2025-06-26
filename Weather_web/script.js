// const url = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=Delhi';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'ad42c2a54emshef127192f629aa8p1c2d7ejsn2cbc39c5cfda',
		'x-rapidapi-host': 'weather-by-api-ninjas.p.rapidapi.com'
	}
};

fetch('https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=Delhi',options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
// try {
// 	const response = await fetch(url, options);
// 	const result = await response.text();
// 	console.log(result);
// } catch (error) {
// 	console.error(error);
// }