export default class LocalStorage {
  get(key: string): any {
    const result: string | null = localStorage.getItem(key);
		if (result !== null) {
      return JSON.parse(result);
    }
    return [];
  }
  set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  remove(key: string) {
    localStorage.removeItem(key);
  }
}