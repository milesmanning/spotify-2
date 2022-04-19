import { atom } from 'recoil';

export const playlistState = atom({
  key: "playlistState",
  default: null
});

export const playlistIdState = atom({
  key: "playlistIdState",
  default: "37i9dQZEVXcHXi4IA5ojNp"
});

export const playlistArrayState = atom({
  key: "playlistArrayState",
  default: []
});