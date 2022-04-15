import { atom } from 'recoil';

export const playlistState = atom({
  key: "playlistAtomState",
  default: []
});

export const selectedPlaylistState = atom({
  key: "selectedPlaylistAtomState",
  default:  null
})

export const playlistIdState = atom({
  key: "playlistIdState",
  default: "37i9dQZF1DX8S0uQvJ4gaa"
});