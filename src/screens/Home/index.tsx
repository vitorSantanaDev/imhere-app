import {
  Text,
  View,
  Alert,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { Participant } from "../../components/Participant";

import { styles } from "./styles";
import { useState } from "react";

export function Home() {
  const [participants, setParticipants] = useState<string[]>([]);
  const [nameOfTheNewParticipant, setNameOfTheNewParticipant] = useState("");

  function handleParticipantAdd(name: string) {
    if (participants.includes(name)) {
      return Alert.alert(
        "Participant already exists",
        "A participant with this name already exists in the list."
      );
    }
    setParticipants((prev) => [...prev, name]);
    setNameOfTheNewParticipant("");
  }

  function handleParticipantRemove(name: string) {
    Alert.alert(`Do you want to remove the participant ${name}?`, "", [
      {
        text: "Yes",
        onPress: () =>
          setParticipants((prevState) =>
            prevState.filter((item) => item !== name)
          ),
      },
      { text: "No", style: "cancel" },
    ]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>List of participants</Text>
      <Text style={styles.eventDate}>
        {new Intl.DateTimeFormat("en-US", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }).format(new Date())}
      </Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          value={nameOfTheNewParticipant}
          placeholder="Participant name"
          placeholderTextColor="#6b6b6b"
          onChangeText={setNameOfTheNewParticipant}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleParticipantAdd(nameOfTheNewParticipant)}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={participants}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Participant
            name={item}
            onRemove={() => handleParticipantRemove(item)}
          />
        )}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Has anyone arrived at the event yet? Add participants to your list
            of presence.
          </Text>
        )}
      />
    </View>
  );
}
