export class Note {
  constructor(
    public name: string,
    public value: string,
    public date: Date,
    public id?: number
  ) {}
}