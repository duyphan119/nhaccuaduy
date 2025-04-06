import { IconCreatePlaylist } from "@/components/ButtonCreatePlaylist";
import FloatingPlayer from "@/components/FloatingPlayer";
import ModalPlaylists from "@/components/modals/ModalPlaylists";
import MusicPlayer from "@/components/modals/MusicPlayer";
import { useGetAllPlaylists } from "@/hooks/useGetAllPlaylists";
import { useGetAllSongs } from "@/hooks/useGetAllSongs";
import { usePlaylistsStore } from "@/hooks/usePlaylistsStore";
import { COLOR } from "@/utils/constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useEffect } from "react";

export default function TabsLayout() {
  const { data: songs } = useGetAllSongs();

  const { data: playlists } = useGetAllPlaylists();

  const { setPlaylists } = usePlaylistsStore();

  useEffect(() => {
    if (songs && playlists) {
      setPlaylists([
        {
          name: "Tất cả bài hát",
          songs,
        },
        ...playlists,
      ]);
    }
  }, [songs, playlists]);

  if (!songs || !playlists) return null;
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: COLOR.PRIMARY,
          tabBarInactiveTintColor: COLOR.WHITE,
          headerTintColor: COLOR.WHITE,
          headerStyle: {
            backgroundColor: COLOR.BLACK,
          },
          tabBarStyle: {
            backgroundColor: COLOR.BLACK,
            borderTopWidth: 0,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Tất cả bài hát",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="playlist"
          options={{
            title: "Danh sách phát",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="playlist-music"
                size={24}
                color={color}
              />
            ),
            headerRight: () => <IconCreatePlaylist />,
          }}
        />
      </Tabs>
      <FloatingPlayer />
      <MusicPlayer />
      <ModalPlaylists />
    </>
  );
}
