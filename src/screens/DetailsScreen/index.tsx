import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Alert, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { fetchOpenWeatherDaily } from '../../services/openWeatherApi';
import { styles } from './styles';
import Header from '../../components/Header';
import moment, { locale } from 'moment';
import { FlatList } from 'react-native-gesture-handler';
import Card from '../../components/Card';

interface IRouteProps {
    key:string,
    name:string,
    path?:string,
    params:{
        id:string;
        title:string;
        lat:number;
        lon:number;
    }
}

const DetailsScreen:React.FC = () => {
    const [dailyForecast, setDailyForecast] = useState([] as any);
    const { params, name } = useRoute<IRouteProps>();

    moment.locale('pt-br')
    moment.updateLocale('pt', {
        calendar : {
            sameDay: 'Hoje',
            nextDay: '[Amanhã às] LT',
            nextWeek: 'dddd [às] LT',
            lastDay: '[Ontem às] LT',
        },
        longDateFormat : {
            LT : 'HH:mm',
            LTS: 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D [de] MMMM',
            LLL : 'D [de] MMMM [de] YYYY [às] LT',
            LLLL : 'dddd, D [de] MMMM [de] YYYY [às] LT'
        },
        weekdays:[ "Domingo", "Segunda", "Terça", "Quarta","Quinta","Sexta","Sábado"],
        months : [
            "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho",
            "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
        ]
    });

    useEffect(()=>{
        getDailyForecast();
    },[params.id]);

    const getDailyForecast = async () => {
        const res = await fetchOpenWeatherDaily(String(params.lat), String(params.lon));

        res.success
        ? successResponse(res.data) 
        : failedResponse()
    }

    const successResponse = (data:any) => {
        const changeData = data.daily.map((values:any)=> {
            const today = new Date();
            const date = moment.unix(values.dt).format("DD-MM-YYYY");
            let day = moment.unix(values.dt).format("dddd");

            if(date === moment(today).format("DD-MM-YYYY")){
                day = 'Hoje'
            }

            if(moment(date).diff(1,'days')){
                day = 'Amanhã'
            }

            return {
                title:day,
                subtitle:moment.unix(values.dt).format('LL'),
                description:values.weather[0].description,
                temperature:values.temp.day.toFixed(0),
                temp_min:values.temp.min.toFixed(0),
                temp_max:values.temp.max.toFixed(0),
            }
        });

        setDailyForecast(changeData)
    }

    const failedResponse = () => {
        Alert.alert('Opss..', 'Houve uma falha ao buscar dados, tente novamente mais tarde.')
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header route={name} title={params.title}/>
            <View style={styles.body}>
            <FlatList
                data={dailyForecast}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id }
                renderItem={({ item }) => {
                    return (
                        <Card 
                            id={item.id}
                            title={item.title}
                            subtitle={item.subtitle}
                            temperature={item.temperature}
                            description={item.description}
                            media={item.media}
                            temp_min={item.temp_min}
                            temp_max={item.temp_max}
                            match={item.match}
                            matchIsVisible={item.matchIsVisible}
                            lat={item.lat}
                            lng={item.lng}
                            location={dailyForecast}
                            setLocation={setDailyForecast}
                            content={true}
                        />
                    );
                }}
            />
            </View>
        </SafeAreaView>
    );
}

export default DetailsScreen;