export function onOnline(callback: () => void) {
  window.addEventListener('online', callback);
}

export function onOffline(callback: () => void) {
  window.addEventListener('offline', callback);
}

export const isOnline = () => {
  return navigator.onLine;
};
