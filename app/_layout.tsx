import { SonnyToastProvider } from "@/components/SonnyToast";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <SonnyToastProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </SonnyToastProvider>
  );
}
