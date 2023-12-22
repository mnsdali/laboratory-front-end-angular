import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { GLOBAL } from '../app-config';
import { Member } from 'src/models/member';
import { MemberService } from 'src/services/member.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Enseignant } from 'src/models/enseignant';
import { Etudiant } from 'src/models/etudiant';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AffecterEnseignantComponent } from '../affecter-enseignant/affecter-enseignant.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements AfterViewInit{
  enseignantSource: MatTableDataSource<Enseignant>;
  etudiantSource: MatTableDataSource<Etudiant>;

  enseignantColumns: string[] = ['id', 'cin', 'nom','prenom','dateNaissance','cv', 'grade', 'etablissement', 'actions'];
  etudiantColumns: string[] = ['id', 'cin', 'nom','prenom','dateNaissance','cv','encadrant','dateInscription','diplome','sujet', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor (private MS: MemberService,private dialog: MatDialog,  private router: Router){
    this.MS.getEnseignants().subscribe(members => {
      this.enseignantSource = new MatTableDataSource(members)
    });
    this.MS.getEtudiants().subscribe(members => {
      this.etudiantSource = new MatTableDataSource(members)
    });
  }

  ngAfterViewInit() {
    this.enseignantSource.paginator = this.paginator;
    this.enseignantSource.sort = this.sort;

    this.etudiantSource.paginator = this.paginator;
    this.etudiantSource.sort = this.sort;
  }

  applyFilterOnEnseignants(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.enseignantSource.filter = filterValue.trim().toLowerCase();

    if (this.enseignantSource.paginator) {
      this.enseignantSource.paginator.firstPage();
    }
  }

  applyFilterOnEtudiants(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.etudiantSource.filter = filterValue.trim().toLowerCase();

    if (this.etudiantSource.paginator) {
      this.etudiantSource.paginator.firstPage();
    }
  }

  affecter(etudiant: Member): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(AffecterEnseignantComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) =>
    {
      console.log(data);
      this.MS.affectEtudiantToEnseignant(etudiant, data.encadrant).subscribe(()=>{
        // or manually add the tool to the existing list
        // this.dataSource.push(toolNew);
        this.router.navigate(['/dashboard']);
        // Close the dialog

      });
    });


  }

}
