import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Image, Pressable } from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import { StackProps } from '../../routes/types';

import Logo from '../../assets/logo.png';

const WelcomeScreen:React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<StackProps>>();

    const goToHome = () => {
        navigation.replace('Home');
    }

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Image 
                    source={Logo} 
                    accessibilityLabel="Identidade Visual" 
                    style={styles.image}
                />
                <Text style={styles.title}>
                    Olá,
                </Text>
                <Text style={styles.description}>
                    Seja-bem vindo ao app <Text style={styles.bold}>Weather Forecast.</Text>
                </Text>
                <Text style={styles.description}>
                    Nosso aplicativo de previsão do tempo.
                </Text>
            </View>
            <Pressable 
                onPress={goToHome}
                style={styles.button}
            >
                <Text style={styles.textButton}>
                    Próximo
                </Text>
            </Pressable>
        </SafeAreaView>
    );
}

export default WelcomeScreen;