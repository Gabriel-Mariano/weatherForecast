import axios from 'axios';
import { GOOGLE_PLACE_KEY } from '@env';
import { failedObject, successObject } from '../utils/buildResponseObject';

export const fetchGooglePlace = async (address: string) => {
    try {
        const { data } = await axios.get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${address}&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&&key=${GOOGLE_PLACE_KEY}`);

        return successObject(data);

    } catch (error) {
        return failedObject(error)
    }
}