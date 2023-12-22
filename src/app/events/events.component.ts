import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { EvenementService } from 'src/services/event.service';
import { Evenement } from 'src/models/event';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';



@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent  implements AfterViewInit {
  displayedColumns: string[] = [ "id",
  "titre",
  "dateDebut",
  "dateFin",
  "lieu"];
  dataSource: MatTableDataSource<Evenement>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor (private ES: EvenementService){
    this.ES.getEvenements().subscribe(events => {
      this.dataSource = new MatTableDataSource(events)
    });
  }



  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}


