import { Component } from '@angular/core';
import { PublicationService } from 'src/services/publication.service';
import { EvenementService } from 'src/services/event.service';
import { MemberService } from 'src/services/member.service';
import { ToolService } from 'src/services/tool.service';
import { ChartDataset, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  nb_members :number= 0;
  nb_articles :number= 0;
  nb_events:number= 0;
  nb_tools :number= 0;


  // line
  chartData: ChartDataset[] = [
    {
      // ⤵️ Add these
      label: 'articles par membre',
      data: [ ]
    }
  ];
  chartLabels: string[] = [];
  chartOptions: ChartOptions = {};
  // pie
  chartTypeData: ChartDataset[] = [
    {
      // ⤵️ Add these
      label: 'Number',
      data: [ ]
    }
  ];
  chartTypesLabel: string[] = ["etudiant", "enseignant"];


  constructor (private ES: EvenementService, private TS: ToolService, private PS: PublicationService, private MS: MemberService)
  {
    MS.getMembers().subscribe(members =>{
      members.forEach(element => {
        this.chartLabels.push(element.nom + " " + element.prenom);
      });
      this.nb_members = members.length;
    })

    this.MS.getNbPubMembers().subscribe((tab) => { this.chartData[0].data = tab });
    this.MS.getNumberPerMemberType().subscribe((mapRole) => {
      const etudiantValue = mapRole.get('etudiant');
      const enseignantValue = mapRole.get('enseignant');

      if (etudiantValue !== undefined) {
        this.chartTypeData[0].data.push(etudiantValue);
      }

      if (enseignantValue !== undefined) {
        this.chartTypeData[0].data.push(enseignantValue);
      }
    })
    // this.nb_events = ES.tab.length;
    // this.nb_tools = TS.tabOutils.length;


  }

}
