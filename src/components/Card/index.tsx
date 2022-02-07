import React from 'react';
import { View, Text, Alert, Pressable } from 'react-native';
import { ICardProps } from './types';
import { styles } from './styles';

import moment, { locale } from 'moment';
import Button from '../Button';
import CardFooter from '../CardFooter';
import { fetchOpenWeather } from '../../services/openWeatherApi';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackProps } from '../../routes/types';

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
        content,
        lat,
        lng,
        location,
        setLocation
    } = props;

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
                    content:true,
                }
            });

    //     const newData = data.list.map((item:any)=> {
    //         const today = new Date();
    //         const formatDate = moment(today).locale('pt-br').format('DD-MM-YYYY');
    //         const date = moment(item.dt_txt).locale('pt-br').format("DD-MM-YYYY");

    //         if(date === formatDate){
    //             return {
    //                 dt:date,
    //                 temp:item.main.temp,
    //                 temp_max:item.main.temp_max,
    //                 temp_min:item.main.temp_min,
    //                 description:item.weather.filter((values:any)=> values.description  )
    //             } 
    //         }
    //    });

    //    const filterData = newData.filter((values:any)=> values !== undefined );

    // //    const filterData = newData.filter((values:any)=> {
    // //        const today = new Date();
    // //        const formatDate = moment(today).format('DD-MM-YYYY');
      
    // //         if(values.dt === formatDate){
    // //            return values.dt;
    // //        }
    // //    });

    // //    const newData = data.list.map((item:any)=> {
    // //          return {
    // //              dt:moment(item.dt_txt).format('DD-MM-YYYY'),
    // //              temp:item.main.temp,
    // //              temp_max:item.main.temp_max,
    // //              temp_min:item.main.temp_min,
    // //              description:item.weather.filter((values:any)=> values.description  )
    // //          }
    // //     });

    // //     const filterData = newData.filter((values:any)=> {
    // //         const today = new Date();
    // //         const formatDate = moment(today).format('DD-MM-YYYY');
       
    // //          if(values.dt === formatDate){
    // //             return values.dt;
    // //         }
    // //     });

    //     const object = filterData.reduce( (obj:any, item:any) => item, {} );
       
    //     const novo = location.map((values:any)=>{
    //         return values.id !== id
    //         ? values
    //         : {
    //             ...values, 
    //             id:id,
    //             description:object.description[0].description,
    //             temperature:object.temp.toFixed(0),
    //             temp_min:object.temp_min.toFixed(0),
    //             temp_max:object.temp_max.toFixed(0),
    //             match:false,
    //             content:true,
    //           }
    //     });
        
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
                location, 
                setLocation, 
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

    return (
        <Pressable 
            onPress={goToDetails}
            style={styles.container}
        >
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