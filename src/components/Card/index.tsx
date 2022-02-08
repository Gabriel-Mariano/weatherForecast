import React from 'react';
import { View, Text, Alert, Pressable } from 'react-native';
import { ICardProps } from './types';
import { COLORS } from '../../themes/colors';
import { styles } from './styles';
import { fetchOpenWeather } from '../../services/openWeatherApi';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { IRouteProps, StackProps } from '../../routes/types';
import { useWeatherData } from '../../hooks/useWeatherData';

import Button from '../Button';
import CardFooter from '../CardFooter';
import Icon from 'react-native-vector-icons/Ionicons';

const Card:React.FC<ICardProps> = props => {
    const { 
        id,
        title, 
        subtitle, 
        temperature,
        description,
        temp_min,
        temp_max,
        match,
        matchIsVisible,
        closeButtonIsVisible,
        content,
        lat,
        lng,
    } = props;

    const { weatherData, setWeatherData } = useWeatherData();
    const { name } = useRoute<IRouteProps>();

    const navigation = useNavigation<NativeStackNavigationProp<StackProps>>();

    const add = async () => {
        const res = await fetchOpenWeather(lat,lng);

        res.success
        ? successResponse(res.data,id)
        : failedResponse()
    }

    const successResponse = (data:any, id:string) => {
        
            const changeData = weatherData.map((values)=>{
                return values.id !== id
                ? values
                : {
                    ...values, 
                    id:id,
                    description:data.weather[0].description,
                    temperature:data.main.temp.toFixed(0),
                    temp_min:data.main.temp_min.toFixed(0),
                    temp_max:data.main.temp_max.toFixed(0),
                    match:false,
                    matchIsVisible:true,
                    closeButtonIsVisible:true,
                    content:true,
                }
            });
        
        setWeatherData(changeData);
    }

    const failedResponse = () => {
        Alert.alert('Opss..', 'Houve uma falha ao buscar dados, tente novamente mais tarde.')
    }

    const goToDetails = () => {
        return content && name !== 'Details' 
            ? navigation.navigate('Details', {
                id:id,
                title:title,
                lat:lat,
                lon:lng
            })
            :  null
    }

    const onCloseCard = () => {
        const removeFilteredData = weatherData.filter((values)=> 
            values.id !== id 
        );

        setWeatherData(removeFilteredData);
    }

    const renderCloseButton = () => {
        return closeButtonIsVisible
                ? <Pressable style={styles.buttonClose} onPress={onCloseCard}>
                    <Icon name="close" size={14} color={COLORS.white}/>
                  </Pressable>
                : null
    }

    const renderInfoTemperature = () => {
        return !content
            ? null
            : `${temperature}°`
    }

    const renderCardFooter = () => {
        return !content
            ? <Button title="ADICIONAR" onPress={add}/>
            : <CardFooter {...{
                description, 
                temp_min, 
                temp_max, 
                match, 
                matchIsVisible,
                id 
            } } />
    }

    return (
        <Pressable 
            onPress={goToDetails}
            style={[ styles.container,
                {
                    paddingVertical: closeButtonIsVisible ? 4 : 15
                }
            ]}
        >   
            {renderCloseButton()}

            <View style={styles.cardHeader}>
                <View>
                    <Text style={styles.city}>
                        {title}
                    </Text>
                    <Text style={styles.country}>
                        {subtitle}
                    </Text>
                </View>
                <View>
                    <Text style={styles.temperature}>
                        {renderInfoTemperature()}
                    </Text>
                </View>
            </View>
            <View style={styles.cardFooter}>
                {renderCardFooter()}
            </View>
        </Pressable>
    );
}

export default Card;