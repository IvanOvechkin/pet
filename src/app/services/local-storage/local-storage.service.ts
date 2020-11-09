import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private readonly storage: Storage;

  constructor() {
    this.storage = window.localStorage;
  }

  get length(): number {
    return this.storage.length;
  }

  clear(): void {
    this.storage.clear();
  }

  key(index: number): string | null {
    return this.storage.key(index);
  }

  getItem(key: string): any {
    return JSON.parse(this.storage.getItem(key));
  }

  setItem(key: string, value: any): void {
    this.storage.setItem(key, JSON.stringify(value));
  }

  removeItem(key: string): void {
    this.storage.removeItem(key);
  }
}
