import React, { useState } from 'react';
import { View, Text, Keyboard, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-gesture-handler';
import { fetchGooglePlace } from '../../services/googlePlaceApi';
import { styles } from './styles';

import Header from '../../components/Header';
import Card from '../../components/Card';
import uuid from 'react-native-uuid';

const HomeScreen = () => {
    const [address, setAddress] = useState('');
    const [location, setLocation] = useState([] as any);

    const getAddress = async ()=> {
        if(!address){
            return null;
        }

        const res = await fetchGooglePlace(address);
    
        res.success
        ? successResponse(res.data)
        : failedResponse()
    }

    const successResponse = (data:any) => {

        const changeData = data.candidates.map((items:any)=> {
            const country = items.formatted_address.split(',');

            return {
                id:uuid.v4(),
                title:items.name,
                subtitle:country[country.length -1].trim(),
                lat:items.geometry.location.lat,
                lng:items.geometry.location.lng,
                content:false,
            }
        });
    
        const object = changeData.reduce( (obj:any, item:any) => item, {} );

        setLocation([...location,object]);
        setAddress('');
        Keyboard.dismiss();
    }

    const failedResponse = () => {
        Alert.alert('Opss..', 'Houve uma falha ao buscar dados, tente novamente mais tarde.')
    }

    const onChange = (text:string) => {
        setAddress(text);
    }

    const renderContent = () => {
        return !location.length 
        ? <View style={styles.wrapper}>
            <Text style={styles.title}>
                Parece que você ainda não adicionou uma cidade
            </Text>
        
            <Text style={styles.description}>
                Tente adicionar uma cidade usando o botão de busca
            </Text>
          </View> 
        : <FlatList
            data={location}
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
                        closeIsVisible={item.closeIsVisible}
                        lat={item.lat}
                        lng={item.lng}
                        location={location}
                        setLocation={setLocation}
                        content={item.content}
                    />
                );
            }}
        />
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header 
                inputValue={address}
                onPress={getAddress}
                onChangeText={onChange}
            />
            <View style={styles.body}>
                {renderContent()}
            </View>
        </SafeAreaView>
    );
}

export default HomeScreen;