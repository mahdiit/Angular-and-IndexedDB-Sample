import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatButton} from '@angular/material/button';

import { Dexie } from "dexie"
import { DbEntity, Repository } from "sample-repository-pattern"

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

  OnRowClick(el: any){
    alert(el);
  }

  Db?: PersonListDb;
  public dataSource = new MatTableDataSource<PersonInfo>();
  public displayedColumns = ['Id', "FullName", 'MobileNumber', 'CreatedDate', "ActionList"];

  constructor() {
    (async () => {
      console.log("constructor");
    })();
  }

  ngOnInit(): void {
    (async () => {
      console.log("ngOnInit");
      this.Db = new PersonListDb();
      //await this.Db.Person.Add(new PersonInfo("Alireza", "S-" + (new Date()).getTime().toString()));
      //await this.Db.Person.Add(new PersonInfo("Saeed", "TY-" + (new Date()).getMinutes().toString()));
      this.dataSource.data = await this.Db.Person.GetAll();      
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
