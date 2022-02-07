import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator, Alert, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { COLORS } from '../../themes/colors';
import { styles } from './styles';

import { useRoute } from '@react-navigation/native';
import { IRouteProps } from '../../routes/types/index.d';
import { fetchOpenWeatherDaily } from '../../services/openWeatherApi';

import Card from '../../components/Card';
import Header from '../../components/Header';
import { useLocation } from '../../hooks/useLocation';
import { ILocationProps } from '../../hooks/useLocation/index.d';

const FavoritesScreen: React.FC = () => {
    const [favorites, setFavorites] = useState<ILocationProps[]>([]);
    const { location, setLocation } = useLocation();

    useEffect(()=>{
        renderFavorites();
    },[location]);

    const renderFavorites = () => {
        const filterFavorites = location.filter((values)=>
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
            { renderContent() }
            
            </View>
        </SafeAreaView>
    );
}

export default FavoritesScreen;