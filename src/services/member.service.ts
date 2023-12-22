import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API, GLOBAL } from 'src/app/app-config';
import { Enseignant } from 'src/models/enseignant';
import { Etudiant } from 'src/models/etudiant';
import { Member } from 'src/models/member';


@Injectable({
  providedIn: 'root'
})

export class MemberService {

  //Injection de HTTP CLIENT
  constructor(private httpClient: HttpClient) {

  }

  saveMember(type:string, member: Member): Observable<Member>{
    if (type == "etudiant") {
      return this.httpClient.post<Member>(`${API.url}/${API.member}/members/etudiant/create`, member);
    } else if (type == "enseignant") {
      return this.httpClient.post<Member>(`${API.url}/${API.member}/members/enseignant/create`, member);
    } else {
      return new Observable(observer => observer.error('Invalid member type'));
    }
    //ken maandekch back-end

    //this.tab.unshift(member);
    //this.tab = [member, ...this.tab.filter(item=> item.id!= member.id)];
    //return new Observable (observer => {observer.next()});
  }

  updateMember(type:string, member: Member): Observable<Member>{
    if (type == "etudiant") {
      return this.httpClient.put<Member>(`${API.url}/${API.member}/members/etudiant/${member.id}/update`, member);
    } else if (type == "enseignant") {
      return this.httpClient.put<Member>(`${API.url}/${API.member}/members/enseignant/${member.id}/update`, member);
    } else {
      return new Observable(observer => observer.error('Invalid member type'));
    }
    //ken maandekch back-end

    //this.tab.unshift(member);
    //this.tab = [member, ...this.tab.filter(item=> item.id!= member.id)];
    //return new Observable (observer => {observer.next()});
  }

  getMemberById(id: number): Observable<Member>{
    return this.httpClient.get<Member>(`${API.url}/${API.member}/members/${id}`);
    //return new Observable((observer) => {observer.next(this.tab.find((member)=>member.id === id))});
  }

  getMembers(): Observable<Member[]>{
    return this.httpClient.get<Member[]>(`${API.url}/${API.member}/members`);
    //return new Observable((observer) => {observer.next(this.tab.find((member)=>member.id === id))});
  }

  getEnseignants(): Observable<Enseignant[]>{
    return this.httpClient.get<Enseignant[]>(`${API.url}/${API.member}/members/enseignants`);
    //return new Observable((observer) => {observer.next(this.tab.find((member)=>member.id === id))});
  }

  getEtudiants(): Observable<Etudiant[]>{
    return this.httpClient.get<Etudiant[]>(`${API.url}/${API.member}/members/etudiants`);
    //return new Observable((observer) => {observer.next(this.tab.find((member)=>member.id === id))});
  }


  getNbPubMembers(): Observable<number[]>
  {
    return this.httpClient.get<number[]>(`${API.url}/${API.member}/members/numberpublications`);
  }

  getNumberPerMemberType(): Observable<Map<string,number>>
  {
    return this.httpClient.get<Map<string,number>>(`${API.url}/${API.member}/members/members-per-role`);
  }

  affectMemberToEvent(idMember: number, idEvent: number): Observable<void>
  {
    return this.httpClient.get<void>(`${API.url}/${API.member}/members/affect-event/${idMember}/${idEvent}`);
  }
  affectMemberToTool(idMember: number, idTool: number): Observable<void>
  {
    return this.httpClient.get<void>(`${API.url}/${API.member}/members/affect-tool/${idMember}/${idTool}`);
  }
  affectMemberToPub(idMember: number, idPub: number): Observable<void>
  {
    return this.httpClient.get<void>(`${API.url}/${API.member}/members/affect-pub/${idMember}/${idPub}`);
  }
}