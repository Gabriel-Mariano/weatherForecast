import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator, Alert, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { COLORS } from '../../themes/colors';
import { styles } from './styles';

import { useRoute } from '@react-navigation/native';
import { IRouteProps } from '../../routes/types/index.d';
import { fetchOpenWeatherDaily } from '../../services/openWeatherApi';

import Card from '../../components/Card';
import Header from '../../components/Header';
import moment from 'moment';
import uuid from 'react-native-uuid';

const DetailsScreen: React.FC = () => {
    const [dailyForecast, setDailyForecast] = useState([] as any);
    const [isLoading, setIsLoading] = useState(false);
    const { params, name } = useRoute<IRouteProps>();

    moment.locale('pt-br')
    moment.updateLocale('pt', {
        calendar: {
            sameDay: 'Hoje',
            nextDay: '[Amanhã às] LT',
            nextWeek: 'dddd [às] LT',
            lastDay: '[Ontem às] LT',
        },
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D [de] MMMM',
            LLL: 'D [de] MMMM [de] YYYY [às] LT',
            LLLL: 'dddd, D [de] MMMM [de] YYYY [às] LT'
        },
        weekdays: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
        months: [
            "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho",
            "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
        ]
    });

    useEffect(() => {
        getDailyForecast();
    }, [params.id]);

    const getDailyForecast = async () => {
        setIsLoading(true);
        const res = await fetchOpenWeatherDaily(String(params.lat), String(params.lon));
        setIsLoading(false);

        res.success
            ? successResponse(res.data)
            : failedResponse()
    }

    const successResponse = (data: any) => {
        const changeData = data.daily.map((values: any) => {
            const today = new Date();
            const date = moment.unix(values.dt).format("DD-MM-YYYY");
            let day = moment.unix(values.dt).format("dddd");

            const start = moment(date, "DD-MM-YYYY");
            const end = moment(today, "DD-MM-YYYY");;

            if (end.diff(start, 'day') === 0) {
                day = 'Amanhã'
            }

            if (date === moment(today).format("DD-MM-YYYY")) {
                day = 'Hoje'
            }

            return {
                id: uuid.v4(),
                title: day,
                subtitle: moment.unix(values.dt).format('LL'),
                description: values.weather[0].description,
                temperature: values.temp.day.toFixed(0),
                temp_min: values.temp.min.toFixed(0),
                temp_max: values.temp.max.toFixed(0),
            }
        });

        setDailyForecast(changeData)
    }

    const failedResponse = () => {
        Alert.alert('Opss..', 'Houve uma falha ao buscar dados, tente novamente mais tarde.')
    }

    const renderCard = () => {
        return isLoading
            ? <ActivityIndicator
                size="large"
                color={COLORS.primary}
                style={styles.loading}
              />
            : <FlatList
                data={dailyForecast}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id}
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
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header route={name} title={params.title} />
            <View style={styles.body}>
                {renderCard()}
            </View>
        </SafeAreaView>
    );
}

export default DetailsScreen;