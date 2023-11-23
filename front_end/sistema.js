const axios = require("axios");
const appid = "e559193b398baa1bda7d0fe77a45c945";
const nomeCidade = "Rio de Janeiro";
const limit = "1";
const geocoding_url = `http://api.openweathermap.org/geo/1.0/direct?q=${nomeCidade}&limit=${limit}&appid=${appid}`;

axios
    .get(geocoding_url)
    .then(res => {
        const cidade = res.data[0];
        if (cidade) {
            const { lat, lon } = cidade;
            console.log(`As coordenadas da cidade são Latitude: ${lat} e Longitude: ${lon}`);
            const current_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appid}&units=metric`;

            axios
                .get(current_url)
                .then(resWeather => {
                    const sensacaoTermica = resWeather.data.main.feels_like;
                    const descricao = resWeather.data.weather[0].description;
                    console.log(`Sensação Térmica: ${sensacaoTermica}ºC`);
                    console.log(`Descrição: ${descricao}`);
                })
                .catch(errorWeather => {
                    console.error('Erro ao obter condições atuais:', errorWeather.message);
                });
        } else {
            console.error('Cidade não encontrada.');
        }
    })
    .catch(error => {
        console.error('Erro ao fazer a requisição de geocodificação:', error.message);
    });
