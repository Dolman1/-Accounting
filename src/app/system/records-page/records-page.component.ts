import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Message } from 'src/app/shared/models/message.model';
import { Note } from '../shared/models/note.model';

import { NoteService } from '../shared/services/note.service';

@Component({
  selector: 'app-records-page',
  templateUrl: './records-page.component.html',
  styleUrls: ['./records-page.component.scss']
})
export class RecordsPageComponent implements OnInit {

  @ViewChild('formdata') myForm!: NgForm;

  message: Message = new Message("danger", "");

  constructor(private noteService: NoteService) { }

  ngOnInit(): void {
    
  }

  private showMessage(message: Message) {
    this.message = message;
    window.setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }

  onSubmit(form: NgForm) {
    console.log(this.myForm.value);

    const {name, value} = this.myForm.value;
    const note = new Note(name, value, new Date());

    this.noteService.createNewNote(note).subscribe(() => {
      this.showMessage({text: "Заметка создана", type: 'success'});
      this.myForm.reset();
    },
    (error) => {
        error = error.message;
        console.log(error);
        this.showMessage({text: "Ошибка работы с сервером", type: 'danger'});
    });;
  }
}
