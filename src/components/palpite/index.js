import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Palpites() {

    const [teams, setTeams] = useState([]);

    useEffect(() => {
        // Recuperar os dados salvos no AsyncStorage quando o componente montar
        retrieveTeams();
    }, []);

    const saveTeams = async () => {
        try {
            const jsonValue = JSON.stringify(teams);
            await AsyncStorage.setItem('teams', jsonValue);
        } catch (error) {
            console.error('Error saving teams:', error);
        }
    };

    const retrieveTeams = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('teams');
            const savedTeams = jsonValue != null ? JSON.parse(jsonValue) : [];
            setTeams(savedTeams);
        } catch (error) {
            console.error('Error retrieving teams:', error);
        }
    };

    const addTeam = () => {
        setTeams([...teams, { home: '', away: '' }]);
    };

    const removeTeam = () => {
        if (teams.length > 1) {
            setTeams(teams.slice(0, -1));
        }
    };

    const handleInputChange = (index, key, value) => {
        const newTeams = [...teams];
        newTeams[index][key] = value;
        setTeams(newTeams);
    };

    const handleSave = () => {
        saveTeams(); // Salva os dados dos inputs no AsyncStorage quando o botão "Salvar" é clicado
    };

    useEffect(() => {
        // Salvar os dados sempre que o estado teams for alterado
        saveTeams();
    }, [teams]);

    return (
        <View style={styles.container}>
            {teams.map((team, index) => (
                <View key={index} style={styles.teamContainer}>
                    <View style={styles.inputContainer}>
                        <Text>Time Casa:</Text>
                        <TextInput
                            style={styles.input}
                            value={team.home}
                            onChangeText={(value) => handleInputChange(index, 'home', value)}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text>Time Fora:</Text>
                        <TextInput
                            style={styles.input}
                            value={team.away}
                            onChangeText={(value) => handleInputChange(index, 'away', value)}
                        />
                    </View>
                </View>
            ))}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={addTeam}>
                    <Text>Adicionar Time</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={removeTeam}>
                    <Text>Remover Time</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text>Salvar</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    teamContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    inputContainer: {
        flex: 1,
        marginRight: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    button: {
        backgroundColor: '#56c4e3',
        padding: 10,
        alignItems: 'center',
    },
    saveButton: {
        backgroundColor: 'green',
        padding: 10,
        alignItems: 'center',
        marginTop: 20,
    },
})