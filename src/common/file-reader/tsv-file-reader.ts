import { FileReaderInterface } from './file-reader-interface.js';
import { EventEmitter } from 'events';
import { createReadStream } from 'fs';

export default class TSVFileReader extends EventEmitter implements FileReaderInterface {

  constructor(public filename: string) {
    super();
  }

  public async read(): Promise<void> {
    const steam = createReadStream(this.filename, {
      highWaterMark: 16384,
      encoding: 'utf-8',
    });

    let lineRead = '';
    let endLinePosition = -1;
    let importedRowCount = 0;

    for await (const chunk of steam) {
      lineRead += chunk.toString();

      while ((lineRead.indexOf('\n')) >= 0) {
        endLinePosition = lineRead.indexOf('\n');

        const completeRow = lineRead.slice(0, endLinePosition + 1);
        lineRead = lineRead.slice(++endLinePosition);
        importedRowCount++;

        await new Promise((resolve) => {
          this.emit('line', completeRow, resolve);
        });
      }
    }

    this.emit('end', importedRowCount);
  }
}
