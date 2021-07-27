export interface ImageThemeModel {
  theme: string,
  images: string[],
}

export interface Config {
  tag: keyof HTMLElementTagNameMap,
  classes: string[],
  id: string,
}

export interface DataDB {
  player: {
    firstName: string,
    lastName: string,
    email: string,
    avatar: string,
  },
  minutes: number,
  seconds: number,
  rightAnswers: number,
  wrongAnswers: number,
  points: number
}
