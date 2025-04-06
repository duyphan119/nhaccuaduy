import { Playlist, Song } from "@/types";
import { create } from "zustand";

type State = {
  playlists: Playlist[];
  playingPlaylist: Playlist;
  playlistDetailVisible: boolean;
  modalPlaylistsVisible: boolean;
  playlistDetail: Playlist | null;
  selectingPlaylistNames: string[];
  currentPlaylistAction: Playlist | null;
  modalCreateEditPlaylistVisible: boolean;
  modalAddSongsVisible: boolean;
  selectingSongs: Song[];

  selectPlaylist: (name: string) => void;
  toggleModalSongs: () => void;
  openModalPlaylists: () => void;
  closeModalPlaylists: () => void;
  setPlaylists: (playlists: Playlist[]) => void;
  setPlayingPlaylist: (playlist: Playlist) => void;
  addSongs: (playlistName: string, songs: Song[]) => void;
  removeSongs: (playlistName: string, songs: Song[]) => void;
  hidePlaylistDetail: () => void;
  showPlaylistDetail: (playlist: Playlist) => void;
  addSongToPlaylists: (song: Song, playlistNams: string[]) => void;
  deletePlaylists: (playlistNames: string[]) => void;
  setCurrentPlaylistAction: (playlist: Playlist | null) => void;
  openModalPlaylistForm: () => void;
  closeModalPlaylistForm: () => void;
  createPlaylist: (playlist: Playlist) => void;
  editPlaylist: (newName: string, oldPlaylist?: Playlist) => void;
  openModalAddSongs: (playlist: Playlist) => void;
  closeModalAddSongs: () => void;
  selectSong: (song: Song) => void;
};

export const usePlaylistsStore = create<State>((set) => ({
  playlists: [],
  playingPlaylist: {
    name: "Tất cả bài hát",
    songs: [],
  },
  playlistDetailVisible: false,
  modalPlaylistsVisible: false,
  playlistDetail: null,
  selectingPlaylistNames: [],
  currentPlaylistAction: null,
  modalCreateEditPlaylistVisible: false,
  modalAddSongsVisible: false,
  selectingSongs: [],

  selectPlaylist: (name: string) =>
    set((state) => {
      const isSelected = state.selectingPlaylistNames.includes(name);
      if (isSelected) {
        return {
          selectingPlaylistNames: state.selectingPlaylistNames.filter(
            (value) => value !== name
          ),
        };
      }
      return {
        selectingPlaylistNames: [...state.selectingPlaylistNames, name],
      };
    }),
  setPlaylists: (playlists: Playlist[]) => set({ playlists }),
  setPlayingPlaylist: (playlist: Playlist) =>
    set({ playingPlaylist: playlist }),
  toggleModalSongs: () =>
    set((state) => ({ playlistDetailVisible: !state.playlistDetailVisible })),
  openModalPlaylists: () =>
    set((state) => ({
      modalPlaylistsVisible: true,
    })),
  closeModalPlaylists: () =>
    set((state) => ({
      modalPlaylistsVisible: false,
      selectingPlaylistNames: [],
    })),
  addSongs: (playlistName: string, songs: Song[]) =>
    set((state) => {
      const newPlaylists = [...state.playlists];
      const index = newPlaylists.findIndex((p) => p.name === playlistName);
      if (index === -1) return state;
      newPlaylists[index].songs = [...songs, ...newPlaylists[index].songs];
      return {
        playlists: newPlaylists,
      };
    }),
  removeSongs: (playlistName: string, songs: Song[]) =>
    set((state) => {
      const newPlaylists = [...state.playlists];
      const index = newPlaylists.findIndex((p) => p.name === playlistName);
      if (index === -1) return state;
      newPlaylists[index].songs = newPlaylists[index].songs.filter(
        (song) => songs.findIndex((item) => item.id === song.id) === -1
      );
      return {
        playlists: newPlaylists,
      };
    }),
  hidePlaylistDetail: () => set({ playlistDetailVisible: false }),
  showPlaylistDetail: (playlist: Playlist) =>
    set({ playlistDetail: playlist, playlistDetailVisible: true }),
  addSongToPlaylists: (song: Song, playlistNames: string[]) =>
    set((state) => {
      return {
        playlists: state.playlists.map((playlist) => {
          if (playlistNames.includes(playlist.name)) {
            return {
              ...playlist,
              songs: [song, ...playlist.songs],
            };
          }
          return playlist;
        }),
      };
    }),
  deletePlaylists: (playlistNames: string[]) =>
    set((state) => {
      let newplayingPlaylist = state.playingPlaylist;
      let newPlaylists = [...state.playlists];
      if (playlistNames.includes(state.playingPlaylist.name)) {
        newplayingPlaylist = state.playlists[0];
      }
      newPlaylists = newPlaylists.filter(
        (p) => !playlistNames.includes(p.name)
      );
      return {
        playlists: newPlaylists,
        playingPlaylist: newplayingPlaylist,
      };
    }),
  setCurrentPlaylistAction: (playlist: Playlist | null) =>
    set({ currentPlaylistAction: playlist }),
  openModalPlaylistForm: () => set({ modalCreateEditPlaylistVisible: true }),
  closeModalPlaylistForm: () =>
    set({
      modalCreateEditPlaylistVisible: false,
      currentPlaylistAction: null,
    }),
  createPlaylist: (playlist: Playlist) =>
    set((state) => ({
      playlists: [...state.playlists, playlist],
    })),
  editPlaylist: (newName: string, oldPlaylist?: Playlist) =>
    set((state) => {
      const newPlaylists = [...state.playlists];
      const playlist = oldPlaylist || state.currentPlaylistAction;
      if (!playlist) return {};
      const index = newPlaylists.findIndex((p) => p.name === playlist.name);
      if (index === -1) return {};
      newPlaylists[index].name = newName;
      return {
        playlists: newPlaylists,
      };
    }),
  openModalAddSongs: (playlist: Playlist) =>
    set({ currentPlaylistAction: playlist, modalAddSongsVisible: true }),
  closeModalAddSongs: () =>
    set({
      modalAddSongsVisible: false,
      currentPlaylistAction: null,
      selectingSongs: [],
    }),
  selectSong: (song: Song) =>
    set((state) => {
      const newSelectingSongs = [...state.selectingSongs];
      const index = newSelectingSongs.findIndex((s) => s.id === song.id);
      if (index !== -1) {
        newSelectingSongs.splice(index, 1);
      } else {
        newSelectingSongs.push(song);
      }
      return {
        selectingSongs: newSelectingSongs,
      };
    }),
}));
