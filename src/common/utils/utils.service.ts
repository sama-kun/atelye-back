import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UtilsService {
  private possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  private filePath = path.join(__dirname, 'counter.json'); // Adjust the path as needed

  private generateRandomPart(length: number): string {
    let randomPart = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * this.possibleChars.length);
      randomPart += this.possibleChars.charAt(randomIndex);
    }
    return randomPart;
  }

  generateString(length: number): string {
    if (length < 1) {
      return '';
    }

    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }

    return result;
  }

  findDuplicates(arr: string[]): string[] {
    const seen = new Set<string>();
    const duplicates = new Set<string>();

    for (const item of arr) {
      if (seen.has(item)) {
        duplicates.add(item);
      } else {
        seen.add(item);
      }
    }

    return Array.from(duplicates);
  }

  private readJSONFile(): any {
    if (fs.existsSync(this.filePath)) {
      const data = fs.readFileSync(this.filePath, 'utf8');
      return JSON.parse(data);
    }
    return {};
  }

  writeJSONFile(data: any): void {
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
  }

  updateJSONFile(newData: any): void {
    const currentData = this.readJSONFile();
    const updatedData = { ...currentData, ...newData };
    this.writeJSONFile(updatedData);
  }
}
