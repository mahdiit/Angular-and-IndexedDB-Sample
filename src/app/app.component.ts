import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatButton } from '@angular/material/button';
import { Dexie } from "dexie"
import { DbEntity, Repository } from "sample-repository-pattern"
import { defer, from, Observable } from 'rxjs';
import { NgForm, ValidationErrors } from '@angular/forms';

class PersonInfo extends DbEntity {
  public Id?: number;
  public FirstName: string;
  public LastName: string;
  public MobileNumber?: string;
  public CreatedDate: Date

  constructor(firstName: string, lastName: string) {
    super();

    this.FirstName = firstName;
    this.LastName = lastName;
    this.CreatedDate = new Date();
  }
}

class PersonListDb extends Dexie {
  Person: Repository<PersonInfo, number>;

  constructor() {
    super("PersonListDb");

    this.version(2).stores({
      person: "++Id,FirstName,LastName,MobileNumber,CreatedDate"
    });

    this.Person = new Repository<PersonInfo, number>(this, "person");
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  IsEditMode: boolean = false;
  FormPerson: PersonInfo = new PersonInfo('', '');

  OnRowEdit(rowElement: any) {
    this.FormPerson = rowElement;
    this.IsEditMode = true;
  }

  OnRowDelete(rowElement: any) {
    var id = rowElement.Id;
    (async () => {
      if (this.Db == null)
        return;

      await this.Db?.Person.Remove(id);
      this.dataSource.data = await this.Db.Person.GetAll();
    })();
  }

  Db?: PersonListDb;
  public dataSource = new MatTableDataSource<PersonInfo>();
  public displayedColumns = ['Id', "FullName", 'MobileNumber', 'CreatedDate', "ActionList"];

  constructor() {
    (async () => {
      console.log("constructor");
    })();
  }

  Cancel() {
    this.IsEditMode = false;
  }

  ErrorMessage : string[]= [];

  Save(form: NgForm) {
    if (!form.valid) {
      this.ErrorMessage = [];
      Object.keys(form.controls).forEach(key => {
        let controlErrors = form.controls[key].errors;
        if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            //console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', 
            //controlErrors != null ? controlErrors[keyError]: "");
            this.ErrorMessage.push(`${key} ${keyError}`);
          });
        }
      });
      alert('invalid =>' + this.ErrorMessage.length);
      return;
    }

    (async () => {
      if (this.Db == null)
        return;

      if (this.FormPerson.Id != null)
        await this.Db.Person.Update(this.FormPerson, this.FormPerson.Id);
      else
        await this.Db.Person.Add(this.FormPerson);

      this.dataSource.data = await this.Db.Person.GetAll();
    })();
    this.IsEditMode = false;
  }

  NewMode() {
    this.FormPerson = new PersonInfo('', '');
    this.FormPerson.CreatedDate = new Date();
    this.FormPerson.MobileNumber = undefined;
    this.IsEditMode = true;
  }

  ngOnInit(): void {
    this.Db = new PersonListDb();
    var dbObject = this.Db;
    var data = from(dbObject.Person.GetAll());
    data.subscribe(x => this.dataSource.data = x);

    (async () => {
      console.log("ngOnInit");
      //this.Db = new PersonListDb();
      //await this.Db.Person.Add(new PersonInfo("Alireza", "S-" + (new Date()).getTime().toString()));
      //await this.Db.Person.Add(new PersonInfo("Saeed", "TY-" + (new Date()).getMinutes().toString()));      
      //this.dataSource.data = await this.Db.Person.GetAll();
      //console.table(this.Source.localdata);
    })();
  }

  ngAfterViewInit() {
    console.log("ngAfterViewInit");
    if (this.paginator != null)
      this.dataSource.paginator = this.paginator;
  }

  title = 'First Angular App';
}
