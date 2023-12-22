import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Enseignant } from 'src/models/enseignant';
import { Member } from 'src/models/member';
import { MemberService } from 'src/services/member.service';
import { MyErrorStateMatcher } from '../app.module';

@Component({
  selector: 'app-enseignant-form',
  templateUrl: './enseignant-form.component.html',
  styleUrls: ['./enseignant-form.component.css']
})
export class EnseignantFormComponent {
  matcher = new MyErrorStateMatcher();
  form!: FormGroup;
  enseignantGlobal!: Member;
  enseignants : Enseignant[] = []
  constructor(private MS: MemberService, private router:Router, private activatedRoute: ActivatedRoute) { }

  initForm(): void{
    this.form = new FormGroup({
      cin: new FormControl(null, [Validators.required]),
      nom: new FormControl(null, [Validators.required]),
      prenom: new FormControl(null, [Validators.required]),
      dateNaissance: new FormControl(null, [Validators.required]),
      cv: new FormControl(null, [Validators.required]),
      // email: new FormControl(null, [Validators.required]),
      // password: new FormControl(null, [Validators.required]),
      // role : new FormControl("enseignant", [Validators.required]),
      grade : new FormControl(null, [Validators.required]),
      etablissement : new FormControl(null, [Validators.required]),

    })
  }

  initForm2(enseignant: Member): void{
    this.form = new FormGroup({
      cin: new FormControl(enseignant.cin, [Validators.required]),
      nom: new FormControl(enseignant.nom, [Validators.required]),
      prenom: new FormControl(enseignant.prenom, [Validators.required]),
      dateNaissance: new FormControl(enseignant.dateNaissance, [Validators.required]),
      cv: new FormControl(enseignant.cv, [Validators.required]),
      // email: new FormControl(enseignant.email, [Validators.required, Validators.email]),
      // password: new FormControl(enseignant.password, [Validators.required]),
      // role : new FormControl(enseignant.role, [Validators.required]),
      grade : new FormControl(enseignant.grade, [Validators.required]),
      etablissement : new FormControl(enseignant.etablissement, [Validators.required]),

    })

  }
  ngOnInit():void{

    this.MS.getEnseignants().subscribe((enseignants)=>{this.enseignants = enseignants});
    const idCourant1 = this.activatedRoute.snapshot.params['id']; // "1234"
    console.log(idCourant1);
    if (!!idCourant1) // if truly idCourant  // je suis dans edit
    {
      this.MS.getMemberById(idCourant1).subscribe((enseignant)=>{
          this.enseignantGlobal = enseignant;
          this.initForm2(enseignant);
      })

    }else{ // je suis dans create
      this.initForm();
    }
  }

  OnSubmit():void{
    // récupérer le contenu
    console.log(this.form.value);

    const enseignant = {...this.enseignantGlobal, ...this.form.value};
    // const enseignantNew = {...enseignant,
    //   //  id: enseignant.id ?? Math.ceil(Math.random()*1000),
    //     // createdDate: enseignant.createdDate ?? new Date().toISOString()
    // };
    
    this.MS.saveMember("enseignant", enseignant).subscribe(()=> {this.router.navigate(['/members'])});




    }
}
