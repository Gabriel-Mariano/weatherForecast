import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { styles } from './styles';

import Card from '../../components/Card';

import { useWeatherData } from '../../hooks/useWeatherData';
import { IWeatherProps } from '../../hooks/useWeatherData/index.d';

const FavoritesScreen: React.FC = () => {
    const [favorites, setFavorites] = useState<IWeatherProps[]>([]);
    const { weatherData } = useWeatherData();

    useEffect(()=>{
        renderFavorites();
    },[weatherData]);

    const renderFavorites = () => {
        const filterFavorites = weatherData.filter((values)=>
            values.match
        );
        
        setFavorites(filterFavorites);
    }

    const renderContent = () => {
        return !favorites.length
            ? <View style={styles.wrapper}>
                <Text style={styles.info}>
                    Nenhuma cidade favoritada
                </Text>
            
                <Text style={styles.description}>
                    Nenhuma cidade favoritada foi encontrada. Tente favoritar dando um like em uma das cidade disponíveis.
                </Text>
              </View> 
            : <FlatList
                data={favorites}
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
                            temp_min={item.temp_min}
                            temp_max={item.temp_max}
                            match={item.match}
                            matchIsVisible={false}
                            lat={item.lat}
                            lng={item.lng}
                            content={item.content}
                        />
                    );
                }}
            />
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.body}>
                <Text style={styles.title}>
                    Lista de Favoritos
                </Text>
                {renderContent()}
            </View>
        </SafeAreaView>
    );
}

export default FavoritesScreen;