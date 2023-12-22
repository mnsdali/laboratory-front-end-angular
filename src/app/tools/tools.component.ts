import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToolService } from 'src/services/tool.service';
import { ToolsCreateComponent } from '../tools-create/tools-create.component';
import { Router } from '@angular/router';
import { Tool } from 'src/models/tool';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css'],
})
export class ToolsComponent implements AfterViewInit {


  dataSource: MatTableDataSource<Tool>;
  displayedColumns: string[] = [ "id",
  "date",
  "source",
  "createur"];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private TS: ToolService,
    private dialog: MatDialog,
    private router: Router,
  ) {
    this.TS.getTools().subscribe(tools => {
      this.dataSource = new MatTableDataSource(tools)
    });
  }

  openToolCreate(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(ToolsCreateComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) =>

    {
      const tool = { ...data };
      const toolNew = {
        id: tool.id ?? Math.ceil(Math.random() * 1000).toString(),
        ...tool,
      };
      this.TS.saveTool(toolNew).subscribe(() => {
        // Update the data source after saving the tool
        this.TS.getTools().subscribe((tools) => {
          this.dataSource= new MatTableDataSource(tools);
        });

        // or manually add the tool to the existing list
        // this.dataSource.push(toolNew);

        // Close the dialog

      });
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
