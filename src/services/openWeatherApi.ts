import axios from 'axios';
import { OPEN_WEATHER_KEY } from '@env';
import { failedObject, successObject } from '../utils/buildResponseObject';

export const fetchOpenWeather = async (lat: string, lon: string) => {
    try {
        const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_KEY}&lang=pt&units=metric`);

        return successObject(data);

    } catch (error) {
        return failedObject(error)
    }
}

export const fetchOpenWeatherDaily = async (lat: string, lon: string) => {
    try {
        // const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_KEY}&lang=pt&units=metric`);

        const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,alerts&appid=${OPEN_WEATHER_KEY}&lang=pt&units=metric`);

       

        return successObject(data);

    } catch (error) {
        return failedObject(error)
    }

}