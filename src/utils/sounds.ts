import { Howl } from "howler";

export const successSound = new Howl({
  src: "/success.mp3",
  volume: 0.5,
});

export const falseSound = new Howl({
  src: "/error.mp3",
  volume: 0.5,
});
