import React from 'react';
import { View, Text, Alert, Pressable } from 'react-native';
import { ICardProps } from './types';
import { styles } from './styles';

import moment, { locale } from 'moment';
import Button from '../Button';
import CardFooter from '../CardFooter';
import Icon from 'react-native-vector-icons/Ionicons';

import { fetchOpenWeather } from '../../services/openWeatherApi';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackProps } from '../../routes/types';
import { COLORS } from '../../themes/colors';
import { useLocation } from '../../hooks/useLocation';

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
        closeIsVisible,
        content,
        lat,
        lng,
    } = props;

    const { location, setLocation } = useLocation();

    const navigation = useNavigation<NativeStackNavigationProp<StackProps>>();

    const add = async () => {
        const res = await fetchOpenWeather(lat,lng);

        res.success
        ?successResponse(res.data,id)
        :failedResponse()
    }

    const successResponse = (data:any, id:string) => {

            const changeData = location.map((values:any)=>{
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
                    closeIsVisible:true,
                    content:true,
                }
            });

    //     const newData = data.list.map((item:any)=> {
    //         const today = new Date();
    //         const formatDate = moment(today).locale('pt-br').format('DD-MM-YYYY');
    //         const date = moment(item.dt_txt).locale('pt-br').format("DD-MM-YYYY");
        
        setLocation(changeData);
    }

    const failedResponse = () => {
        Alert.alert('Opss..', 'Houve uma falha ao buscar dados, tente novamente mais tarde.')
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

    const goToDetails = () => {
        return !content
            ? null
            : navigation.navigate('Details', {
                id:id,
                title:title,
                lat:lat,
                lon:lng
            }); 
    }

    const onCloseCard = () => {
        const changeData = location.filter((values:any)=> values.id !== id )

        setLocation(changeData);
    }

    return (
        <Pressable 
            onPress={goToDetails}
            style={[ styles.container,
                {
                    paddingVertical: closeIsVisible ? 4 : 15
                }
            ]}
        >   
            { closeIsVisible
                ? <Pressable style={styles.buttonClose} onPress={onCloseCard}>
                    <Icon name="close" size={14} color={COLORS.white}/>
                  </Pressable>
                : null
            }
            
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
                        {
                            !content
                                ? null
                                : `${temperature}°`
                        }
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