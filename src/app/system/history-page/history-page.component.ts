import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Note } from '../shared/models/note.model';
import { NoteService } from '../shared/services/note.service';
import { Message } from 'src/app/shared/models/message.model';


@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit {
  @ViewChild('formdata') myForm!: NgForm;

  updateForm!:FormGroup;

  @ViewChild('abcd')
  private abcd = {} as ElementRef;

  constructor(private noteService: NoteService, private router: Router) { }

  noteValue!: Array<Note>;
  i!:number;

  noteNew!: Note;
  noteDelete!: Note;
  noteChange!: Note;
  noteValueChange!: Array<Note>;
  noteValueDelete!: Array<Note>;
  noteValueUpdate!: Array<Note>;

  public nullObjDel = false;
  public nullObjUpdate = false;

  public str = "ssss";

  message: Message = new Message("danger", "");

  public serverError = false;


  ngOnInit(): void {
    this.updateForm = new FormGroup({
      'name': new FormControl('', [Validators.required]),
      'value': new FormControl('', [Validators.required])
    });

    this.getValues();
  }


  private showMessage(message: Message) {
    this.message = message;
    window.setTimeout(() => {
      this.message.text = '';
    }, 6000);
  }

  getValues()
  {
    this.noteService.getNote().subscribe((note: any) => {
      if (note)
      {
        this.noteValue = note;
      }
    },
    (error) => {
        error = error.message;
        console.log(error);
        this.showMessage({text: "Ошибка работы с сервером", type: 'danger'});
    });
  }


  valueInForm(index: any)
  {
    this.noteService.getNote().subscribe((note: any) => {
      if (note)
      {
        this.noteValueChange = note;

        for (let b = 0; b < this.noteValueChange.length; b++)
        {
          if (this.noteValueChange[b].id == index)
          {
            this.updateForm.get('name')?.setValue(this.noteValueChange[b].name);
            this.updateForm.get('value')?.setValue(this.noteValueChange[b].value);
            this.noteChange = new Note(this.noteValueChange[b].name, this.noteValueChange[b].value, this.noteValueChange[b].date, index);
          }
        }
      }
    },
    (error) => {
        error = error.message;
        console.log(error);
        this.showMessage({text: "Ошибка работы с сервером", type: 'danger'});
    });
  }

  updateNote()
  {
    const { name, value } = this.updateForm.value;
    this.noteService.getNote().subscribe((note: any) => {
      if (note)
      {
        this.noteValueUpdate = note;

        for (let b = 0; b < this.noteValueUpdate.length; b++)
        {
          if (this.noteValueUpdate[b].name == name)
            this.noteNew = new Note(name, value, this.noteValueUpdate[b].date, this.noteValueUpdate[b].id);
        }

        if (this.noteNew != null)
        {
          this.noteService.uploadInfo(this.noteNew).subscribe(() => {
            this.getValues();
            this.showMessage({text: "Заметка отредактирована", type: 'success'});
            this.updateForm.reset();
          });
        }
      }
    },
    (error) => {
        error = error.message;
        console.log(error);
        this.showMessage({text: "Ошибка работы с сервером", type: 'danger'});
    });
  }


  deleteNote(index: any)
  {
    this.noteService.getNote().subscribe((note: any) => {
      if (note)
      {
        this.noteValueDelete = note;

        for (let b = 0; b < this.noteValueDelete.length; b++)
        {
          if (this.noteValueDelete[b].id == index)
          {
            this.noteDelete = new Note(this.noteValueDelete[b].name, this.noteValueDelete[b].value, this.noteValueDelete[b].date, index);
            console.log("123");
          }
        }

        if (this.noteDelete != null)
        {
          this.noteService.deleteNoteData(this.noteDelete).subscribe((note: any) => {
            this.getValues();
            console.log(note);
          });
        }
      }
    });
  }
}
