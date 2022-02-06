import React from 'react';
import { View, Text, Alert } from 'react-native';
import { ICardProps } from './types';
import { styles } from './styles';

import moment from 'moment';
import Button from '../Button';
import Icon from 'react-native-vector-icons/Ionicons'
import { COLORS } from '../../themes/colors';
import CardFooter from '../CardFooter';
import { fetchOpenWeather } from '../../services/openWeatherApi';

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
        content,
        lat,
        lng,
        location,
        setLocation
    } = props;

    const add = async(id:string) => {
        const res = await fetchOpenWeather(lat,lng);

        res.success
        ?successResponse(res.data,id)
        :failedResponse()
    }

    const successResponse = (data:any, id:string) => {
       const newData = data.list.map((item:any)=> {

             return {
                 dt:moment(item.dt_txt).format('DD-MM-YYYY'),
                 temp:item.main.temp,
                 temp_max:item.main.temp_max,
                 temp_min:item.main.temp_min,
                 description:item.weather.filter((values:any)=> values.description  )
             }
        });

        const filterData = data.list.filter((values:any)=> {
            const today = new Date();
            const formatDate = moment(today).format('DD-MM-YYYY');
       
             if(values.dt === formatDate){
                return values.dt;
            }
        });

        const object = filterData.reduce( (obj:any, item:any) => item, {} );
       
        const novo = location.map((values:any)=>{
            return values.id !== id
            ? values
            : {
                ...values, 
                id:id,
                description:object.description[0].description,
                temperature:object.temp.toFixed(0),
                temp_min:object.temp_min.toFixed(0),
                temp_max:object.temp_max.toFixed(0),
                match:false,
                content:true,
              }
        });
        
  
        setLocation(novo);
    }

    const failedResponse = () => {
        Alert.alert('Opss..', 'Houve uma falha ao buscar dados, tente novamente mais tarde.')
    }

    const renderCardFooter = (id:string) => {
        return !content
            ? <Button title="ADICIONAR" onPress={()=>add(id)}/>
            : <CardFooter {...{description, temp_min, temp_max, match } } />
    }

    return (
        <View style={styles.container}>
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
                {renderCardFooter(id)}
            </View>
        </View>
    );
}

export default Card;