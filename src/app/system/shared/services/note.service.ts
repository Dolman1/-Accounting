import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

import { Note } from "../models/note.model";

@Injectable()
export class NoteService {
    constructor(private http: HttpClient) {}

    getNote():Observable<Note>{
        return this.http.get<Note>(`http://localhost:3000/text`).pipe(map((note: any) => note ? note : undefined));
    }

    createNewNote(note: Note):Observable<Note>{
        return this.http.post<Note>('http://localhost:3000/text', note);
    }

    uploadInfo (note: Note):Observable<Note> {
        return this.http.put<Note>('http://localhost:3000/text/' + note.id, note);
    }

    deleteNoteData(note: Note):Observable<Note> {
        return this.http.delete<Note>('http://localhost:3000/text/' + note.id);
    }
}
