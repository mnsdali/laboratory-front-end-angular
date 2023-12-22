import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { EvenementService } from 'src/services/event.service';
import { Evenement } from 'src/models/event';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit, OnDestroy, AfterViewInit {
  displayedColumns: string[] = ["id", "titre", "dateDebut", "dateFin", "lieu"];
  dataSource: MatTableDataSource<Evenement>;
  obs: Observable<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private ES: EvenementService, private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.ES.getEvenements().subscribe(events => {
      this.dataSource = new MatTableDataSource(events);
      this.obs = this.dataSource.connect();

      // Move paginator initialization inside the subscription block
      if (this.dataSource) {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  ngAfterViewInit() {
    // No additional logic needed for ngAfterViewInit at the moment
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }
}

