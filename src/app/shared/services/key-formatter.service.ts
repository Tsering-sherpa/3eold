// key-formatter.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class KeyFormatterService {
  toCamelCase(input: string): string {
    return input.replace(/_([a-z])/g, (match, group1) => group1.toUpperCase());
  }

  toSnakeCase(input: string): string {
    return input.replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`);
  }
}
