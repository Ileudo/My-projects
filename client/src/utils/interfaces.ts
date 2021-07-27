export interface IWordCardNewAdmin {
  element: HTMLDivElement;
  form: HTMLFormElement;
  init(): IWordCardNewAdmin;
  listenFormSubmit(): void;
}

export interface IAdminPanelWords {
  element: HTMLElement;
  categoryName: string;
  cardsField: HTMLDivElement;
  init(): void;
  render(): void;
  listenEvents(): void;
}

export interface IAdminPanelCategories {
  element: HTMLElement;
  init(): void;
  render(): void;
  listenEvents(): void;
}

export interface ICategory {
  name: string;
  img: string;
  cards: [
    {
      en: string;
      ru: string;
      img: string;
      audio: string;
    }
  ];
}

export interface ICard {
  element: HTMLElement;
  en: string;
  ru: string;
  img: string;
  audio: string;
  init(): ICard;
}

export interface ICardData {
  en: string;
  ru: string;
  img: string;
  audio: string;
}

export interface IToggler {
  element: HTMLLabelElement;
  togglingClass: string;
  targetElement: HTMLElement;
  init(): IToggler;
}

export interface ICardsField {
  element: HTMLElement;
  cards: ICard[];
  audioList: HTMLAudioElement[];
  guessedCard?: HTMLElement;
  chosenCard?: HTMLElement;
  categoryRow: HTMLDivElement;
  categoryStars: HTMLDivElement;
  startGameBtn: HTMLButtonElement;
  repeatAudioBtn: HTMLButtonElement;
  correctAnswerSound: HTMLAudioElement;
  wrongAnswerSound: HTMLAudioElement;
  init(): Promise<ICardsField>;
  setCards(): Promise<ICardsField>;
  addCards(): ICardsField;
  getAudioList(): HTMLAudioElement[];
  listenGameStart(): ICardsField;
  shuffleAudioList(): ICardsField;
  playAudio(): ICardsField;
  checkAnswer(): ICardsField;
  isGameFinished(): ICardsField;
  listenRepeatWord(): ICardsField;
  addStar(type: TStar): ICardsField;
  clear(): ICardsField;
}

export interface ICatField {
  element: HTMLElement;
  categoriesRow: HTMLDivElement;
  cards: ICatCard[];
  init(): Promise<ICatField>;
  setCards(): Promise<ICatField>;
  addCards(): ICatField;
  clear(): ICatField;
}

export interface ICatCard {
  element: HTMLAnchorElement;
  card: HTMLDivElement;
}

export type TStar = '+' | '-';

export interface ICloseIcon {
  element: HTMLElement;
  target: string;
  togglingClass: string;
  overlay: string;
  targetElement: HTMLElement;
  overlayElement: HTMLElement;
  init(): ICloseIcon;
}

export interface IOffcanvas {
  element: HTMLElement;
  list: HTMLUListElement;
  init(): Promise<IOffcanvas>;
  saveCategory(): IOffcanvas;
}

export interface IAuthModal {
  element: HTMLDivElement;
  init(): IAuthModal;
  listenModalClose(): IAuthModal;
}

export interface IHeader {
  element: HTMLElement;
  headerRow: HTMLDivElement;
  offcanvas: IOffcanvas;
  closeIcon: ICloseIcon;
  toggler: IToggler;
  init(): IHeader;
}
