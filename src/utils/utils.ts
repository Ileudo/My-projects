export function delay(timeout: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

export function addZero(num: number): string {
  return num <= 9 ? `0${num}` : `${num}`;
}

export function navigate(hash: string): void {
  window.location.hash = `#${hash}`;
}
