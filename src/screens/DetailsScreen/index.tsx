import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { fetchOpenWeatherDaily } from '../../services/openWeatherApi';
import { styles } from './styles';

interface IRouteProps {
    key:string,
    name:string,
    path?:string,
    params:{
        lat:number;
        lon:number;
        id:string;
    }
}

const DetailsScreen:React.FC = () => {
    const [dailyForecast, setDailyForecast] = useState([]);
    const { params } = useRoute<IRouteProps>();

    useEffect(()=>{
        getDailyForecast();
    },[params.id]);

    const getDailyForecast = async () => {
        const res = await fetchOpenWeatherDaily(String(params.lat), String(params.lon));

    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.body}>
                
            </View>
        </SafeAreaView>
    );
}

export default DetailsScreen;