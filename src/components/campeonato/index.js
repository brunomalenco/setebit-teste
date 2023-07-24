import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

export default function Campeonato() {

    const navigator = useNavigation()
    const [campeonato, setCampeonato] = useState('');
    const [ano, setAno] = useState('');

    const handleViewGameDetails = () => {
        navigator.navigate('Detalhes', { campeonato, ano });
    };

    return (
        <View style={styles.container}>

            <Text style={styles.textInput}>Selecione o campeonato:</Text>
            <TextInput style={styles.fieldInput} value={campeonato} onChangeText={setCampeonato} />
            <Text style={styles.textInput} >Selecione o ano:</Text>
            <TextInput inputMode='numeric' maxLength={4} style={styles.fieldInput} value={ano} onChangeText={setAno} />

            <Button title="Ver detalhes do jogo" onPress={handleViewGameDetails} />

            <TouchableOpacity onPress={() => {navigator.navigate("Palpites")}} style={styles.btnPalpite}>
                <Text style={{ fontSize: 20 ,textAlign: 'center', justifyContent: 'center', marginTop: 'auto', marginBottom: 'auto' }}>
                    PALPITE
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    textInput: {
        fontSize: 20,
        fontWeight: 500,
        marginLeft: 5
    },
    fieldInput: {
        borderBottomWidth: 1,
        width: '70%',
        marginLeft: 5,
        marginBottom: '8%'
    },
    btnPalpite: {
        marginTop: '10%',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: '#f2d2a1',
        width: '60%',
        height: '7%',
        marginLeft: 'auto',
        marginRight: 'auto'
    }
})