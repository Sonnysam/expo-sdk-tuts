import { View } from "react-native";
import Contacts from "../components/Contacts";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <Contacts />
    </View>
  );
}
