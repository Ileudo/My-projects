export function flip(e: Event): void {
  if (
    e.target instanceof HTMLElement &&
    e.currentTarget instanceof HTMLElement &&
    e.target.classList.contains('bi-arrow-repeat')
  ) {
    e.currentTarget.classList.add('flipped');
  }
}

export function flipBack(e: Event): void {
  if (e.currentTarget instanceof HTMLElement && e.currentTarget.classList.contains('flipped')) {
    e.currentTarget.classList.remove('flipped');
  }
}

export function playAudio(e: Event): void {
  if (
    e.target instanceof HTMLElement &&
    e.currentTarget instanceof HTMLElement &&
    !e.target.classList.contains('bi-arrow-repeat') &&
    localStorage.getItem('mode') !== 'play'
  ) {
    const audio = e.currentTarget.querySelector('audio') as HTMLAudioElement;
    audio.currentTime = 0;
    audio.play();
  }
}
