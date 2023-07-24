// src/screens/GameDetailsScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import axios from 'axios';

export default function Detalhes({ route }) {

    const { campeonato, ano } = route.params;
    const [gameDetails, setGameDetails] = useState([]);

    const renderGame = ({ item }) => {
        return (
            <View style={{ marginVertical: 10, borderBottomWidth: 1 }}>
                <Text>Nome do Campeonato: {item.competition?.name}</Text>
                <Text>Data do Jogo: {item.resultSet?.first}</Text>
                
                <Text>Time da Casa: {item.matches?.homeTeam.name}</Text>
                <Text>Formação: {item.matches?.homeTeam.formation}</Text>
                <Text>Tecnico: {item.matches?.homeTeam.coach.name}</Text>

                <Text>Time Visitante: {item.matches?.awayTeam.name}</Text>
                <Text>Formação: {item.matches?.awayTeam.formation}</Text>
                <Text>Tecnico: {item.matches?.awayTeam.coach.name}</Text>

                <Text>Gols: {item.matches?.score.home + item.matches?.score.away}</Text>
                <Text>Jogador: {item.matches?.goals.scorer.name} </Text>
                
            </View>
        );
    };

    useEffect(() => {
        const showGamesDetails = async () => {
            try {
                const response = await axios.get(`v4/competitions/${ano}/matches`);
                setGameDetails(response.data);
            } catch (error) {
                console.error('Aqui está o erro:', error);
            }
        };


        showGamesDetails();
    }, [campeonato, ano]);

    return (
        <View>
            <Text>Campeonato: {gameDetails[0]?.competition?.name}</Text>
            <FlatList
                data={gameDetails}
                renderItem={renderGame}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    )
}
