import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';

import { ProfesoresService } from './Services/profesores.service';

import {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit {
  constructor(private _profesoresServicio: ProfesoresService,
    private router:Router,
    private dialog: MatDialog
  ){

  }

  ngOnInit(): void {
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
  }

  isHomePage(): boolean {
    return this.router.url === '/';
  }
  

}

