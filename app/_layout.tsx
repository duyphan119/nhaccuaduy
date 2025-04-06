import QueryProvider from "@/components/QueryProvider";
import SoundProvider from "@/components/SoundProvider";
import { initDatabase } from "@/db";
import useRequestPermissions from "@/hooks/useRequestPermissions";
import useSetupAudio from "@/hooks/useSetupAudio";
import { COLOR } from "@/utils/constants";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { StatusBar } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  useRequestPermissions();

  useSetupAudio();
  return (
    <SQLiteProvider databaseName="test.db" onInit={initDatabase}>
      <QueryProvider>
        <SoundProvider>
          <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>
              <Stack>
                <Stack.Screen
                  name="(tabs)"
                  options={{
                    headerShown: false,
                  }}
                />
              </Stack>

              <StatusBar backgroundColor={COLOR.BLACK} />
            </SafeAreaView>
          </SafeAreaProvider>
        </SoundProvider>
      </QueryProvider>
    </SQLiteProvider>
  );
}
