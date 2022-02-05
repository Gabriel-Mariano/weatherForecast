import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';

import Header from '../../components/Header';
import Card from '../../components/Card';
import { FlatList } from 'react-native-gesture-handler';

const HomeScreen = () => {

    const DATA = [
        {
            id: '1',
            city: 'Blumenau',
            country: 'Brasil',
            temperature: 18,
            description:'Chuva fraca',
            media:'14° - 22°',
            match:false,
            content:true,
        }
    ]

    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <View style={styles.body}>
                <FlatList
                    data={DATA}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                        return (
                            <Card 
                                title={item.city}
                                subtitle={item.country}
                                temperature={item.temperature}
                                description={item.description}
                                media={item.media}
                                match={item.match}
                                content={item.content}
                            />
                        );
                    }}
                />
            </View>
        </SafeAreaView>
    );
}

export default HomeScreen;