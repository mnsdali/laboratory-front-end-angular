import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OnInit } from '@angular/core';
import { ToolService } from 'src/services/tool.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tools-create',
  templateUrl: './tools-create.component.html',
  styleUrls: ['./tools-create.component.css']
})
export class ToolsCreateComponent implements OnInit {

  form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ToolsCreateComponent>,
    private TS: ToolService,
    private router: Router,
    ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      date: new FormControl(null, []),
      createur: new FormControl(null, []),
      source: new FormControl(null, [])
    })
  }

  close(){
    this.dialogRef.close();
  }

  save(){
    
    this.dialogRef.close(this.form.value);

  }
}
