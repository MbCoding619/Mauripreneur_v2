import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FaProps } from '@fortawesome/angular-fontawesome';
import { isThisSecond } from 'date-fns';
import { ToastrService } from 'ngx-toastr';
import { ProgressComponent } from 'src/app/multi-step-form/progress/progress.component';
import { Professional } from 'src/app/_models/professional';
import { subField } from 'src/app/_models/subField';
import { AccountsService } from 'src/app/_services/accounts.service';
import { SharedService } from 'src/app/_services/shared.service';


interface qualificationType {
  qualId : number;
  qualiType : string;
}

@Component({
  selector: 'app-register-professional',
  templateUrl: './register-professional.component.html',
  styleUrls: ['./register-professional.component.css']
})
export class RegisterProfessionalComponent implements OnInit {

  testForm = new FormGroup({
    food: new FormControl('', Validators.required),
    comment: new FormControl('', Validators.required),
  });
  @Output() cancelRegister = new EventEmitter();
  model: any ={}; 
  fieldList: any;
  subFieldList : subField[];
  username:any;
  formDataSubmit = new FormData();
  workFormDataSubmit = new FormData();
  testUse = this.accountService.currentUser$.subscribe(response =>{

    this.username = response.username;

  })  
  registerForm: FormGroup;
  personalForm : FormGroup;
  socialForm: FormGroup;
  qualForm : FormGroup;
  skillForm : FormGroup;
  workForm : FormGroup;
  qualificationType : qualificationType[];
  Prof : Professional;

  constructor(private sharedService : SharedService,
    private accountService: AccountsService,
    private router : Router,
    private toastr : ToastrService,
    private fb : FormBuilder) {}

  ngOnInit(): void {

    this.accountService.currentUser$.subscribe(response =>{

      this.username = response.username;
  
    }) 
    
    this.initializePersonalDet();
    this.initializeSocialForm();
    this.initializeQualForm();
    this.initializeWorkForm();
    this.getFields();
    this.getSubFields();
    this.getQualificationType();

    
  }

  initializePersonalDet(){
    this.personalForm = this.fb.group({
      FName : ['',Validators.required],
      LName: ['',Validators.required],
      Email: ['',Validators.required,Validators.email],
      Address: ['',Validators.required],
      IDNum: ['',Validators.required],     
      Phone: ['',Validators.required],
      linkedInLink : ['', Validators.required],
      briefDesc: ['',Validators.required]
      //imagePath : ['']
    }) 

  }

  getPersonalFormData(){
    this.formDataSubmit.append('username',this?.username);
    this.formDataSubmit.append('fName',this.personalForm.controls["FName"]?.value);
    this.formDataSubmit.append('lName',this.personalForm.controls["LName"]?.value);
    this.formDataSubmit.append('email',this.personalForm.controls["Email"]?.value);
    this.formDataSubmit.append('address',this.personalForm.controls["Address"]?.value);
    this.formDataSubmit.append('idNum',this.personalForm.controls["IDNum"]?.value);
    this.formDataSubmit.append('phone',this.personalForm.controls["Phone"]?.value);
    this.formDataSubmit.append('linkedInLink',this.personalForm.controls["linkedInLink"]?.value);
    this.formDataSubmit.append('briefDesc',this.personalForm.controls["briefDesc"]?.value);
    this.formDataSubmit.append('fieldId',this.workForm.controls["fieldId"]?.value);
    //this.formDataSubmit.append('fieldId','1');

    this.accountService.registerProf(this.formDataSubmit).subscribe(response =>{
      
      //console.log(response);
      this.Prof = response;
      console.log(this.Prof.professionalId);
      
        this.onQualFormSubmit();        
        this.onWorkFormSubmit();
      
      //this.router.navigateByUrl('/');

    },error =>{
      this.toastr.error(error.error);
    })
    
  }

  initializeSocialForm(){
    this.socialForm = this.fb.group({
      linkedInLink : ['', Validators.required],
      briefDesc: ['',Validators.required]
    })
  }

  initializeQualForm(){
    this.qualForm = this.fb.group({
      qualifications : this.fb.array([
        this.addQualFormGroup()
      ])
    })
  }

  // initializeSkillForm(){
  //   this.skillForm = this.fb.group({
  //     skills : this.fb.array([
  //       this.addSkillFormGroup()
  //     ])
  //   })
  // }

  initializeWorkForm(){
    this.workForm = this.fb.group({
      fieldId : ['',Validators.required],
      skills : this.fb.array([
               this.addSkillFormGroup()
            ]),
        experiences : this.fb.array([
          this.addWorkFormGroup()
        ])
    })
  }

  registerProfFieldId(){
    let profFieldData = {
      'fielId' : this.workForm.controls["fieldId"]?.value,
      'professionalId' : this.Prof?.professionalId
    }
    this.accountService.registerProfFieldId(profFieldData).subscribe(response =>{
      console.log(response);
    })
  }



  get qualifications() : FormArray{
    return this.qualForm.get('qualifications') as FormArray;
  }

  get experiences() : FormArray{
    return this.workForm.get('experiences') as FormArray;
  }

  get skills() : FormArray{
    return this.workForm.get('skills') as FormArray;
  }

  addQualFormGroup() : FormGroup{
    return this.fb.group({
      qualType : ['',Validators.required],
      courseName : ['',Validators.required],
      institution : ['',Validators.required],      
      yearEnding : ['',Validators.required]
    })
  }

  addQualButtonClick(){
    (<FormArray>this.qualForm.get('qualifications')).push(this.addQualFormGroup());
   
  }

  onQualFormSubmit(){
    for(let i=0; i< this.qualifications.length; i++){
      let qualFormData = this.qualifications.at(i).value;
      let qualFormSubmit = {
        'qualType' : qualFormData['qualType'],
        'courseName' : qualFormData['courseName'],
        'yearEnding' : qualFormData['yearEnding'],
        'profId' : this.Prof?.professionalId        
      };

      this.accountService.registerProfQual(qualFormSubmit).subscribe(response =>{
        console.log(response);
      });
      console.log(qualFormSubmit);
    }
  }

  removeQualFormGroup(qualIndex : number) : void{
    (<FormArray>this.qualForm.get('qualifications')).removeAt(qualIndex);
  }

  addSkillFormGroup(): FormGroup{
    return this.fb.group({
      subFieldId : ['',Validators.required],
      proficiency : ['',Validators.required]
    })
  }

  addSkillButtonClick(){
    (<FormArray>this.workForm.get('skills')).push(this.addSkillFormGroup());
  }

  removeSkillFormGroup(skillIndex : number){
    (<FormArray>this.workForm.get('skills')).removeAt(skillIndex);
  }

  addWorkFormGroup(): FormGroup{

    return this.fb.group({ 
      title : ['',Validators.required],
      compName : ['',Validators.required],
      years : ['',Validators.required],
      //cvPath : ['',Validators.required]
    })
  }

  addWorkButtonClick(){
    (<FormArray>this.workForm.get('experiences')).push(this.addWorkFormGroup());
  }

  removeWorkFormGroup(workIndex : number){
    (<FormArray>this.workForm.get('experiences')).removeAt(workIndex);
  }

  onWorkFormSubmit(){
    for(let i=0; i < this.experiences.length;i++){
      let workFormData = this.experiences.at(i).value;
      this.workFormDataSubmit.append('jobTitle',workFormData['title']);
      this.workFormDataSubmit.append('compName',workFormData['compName']);
      this.workFormDataSubmit.append('yearsExperience',workFormData['years']);
      this.workFormDataSubmit.append('profId',this.Prof?.professionalId);
      
      this.accountService.registerProfExperience(this.workFormDataSubmit).subscribe(response =>{
        console.log(response);
      })         
    }

    for(let i=0;i<this.skills.length;i++){
      let skillFormData = this.skills.at(i).value;
      let skillFormSubmit ={
        'subFieldId' : skillFormData['subFieldId'],
        'proficiency' : skillFormData['proficiency'],
        'profId' : this.Prof?.professionalId
      }
      //console.log(skillFormSubmit);
      this.accountService.registerProfSubField(skillFormSubmit).subscribe(response =>{
        console.log(response);
      })
    }
  }

registerProfNew(){
  this.getPersonalFormData();

}
  testClick(){
    console.log("WA");
    console.log(this.qualForm.value);
  }

  initiliazeForm(){
    this.registerForm = new FormGroup({
      username: new FormControl(this.username),
      FName : new FormControl(),
      LName: new FormControl(),
      Email: new FormControl(),
      Address: new FormControl(),
      IDNum: new FormControl(),
      FieldId: new FormControl(),
      Phone: new FormControl(),
      Qual1: new FormControl(),
      Qual2: new FormControl(),
      LinkedInLink: new FormControl(),
      EducationInstition: new FormControl(),
      BriefDesc : new FormControl(),
      EmploymentHistory: new FormControl(),
      EmploymentStatus: new FormControl()
    })
  }


  registerProf(){
    this.formDataSubmit.append('username',this.registerForm.controls["username"]?.value);
    this.formDataSubmit.append('fName',this.registerForm.controls["FName"]?.value);
    this.formDataSubmit.append('lName',this.registerForm.controls["LName"]?.value);
    this.formDataSubmit.append('address',this.registerForm.controls["Address"]?.value);
    this.formDataSubmit.append('iDNum',this.registerForm.controls["IDNum"]?.value);
    this.formDataSubmit.append('phone',this.registerForm.controls["Phone"]?.value);
    this.formDataSubmit.append('qual1',this.registerForm.controls["Qual1"]?.value);
    this.formDataSubmit.append('qual2',this.registerForm.controls["Qual2"]?.value);
    this.formDataSubmit.append('fieldId',this.registerForm.controls["FieldId"]?.value);
    this.formDataSubmit.append('educationInstition',this.registerForm.controls["EducationInstition"]?.value);
    this.formDataSubmit.append('briefDesc',this.registerForm.controls["BriefDesc"]?.value);
    this.formDataSubmit.append('employmentHistory',this.registerForm.controls["EmploymentHistory"]?.value);
    this.formDataSubmit.append('employmentStatus',this.registerForm.controls["EmploymentStatus"]?.value);

    this.accountService.registerProf(this.formDataSubmit).subscribe(response =>{
      
      console.log(response);
      this.router.navigateByUrl('/');

    },error =>{
      this.toastr.error(error.error);
    })
  }

 

  getFields(){

    this.sharedService.getFields().subscribe((response:any)=>{

      this.fieldList = response;

    })
  }

  getSubFields(){
    this.sharedService.getSubFields().subscribe(response =>{
      this.subFieldList = response;
    })
  }

  getSubFieldsByFieldId(id : any){
    if(id === '--Select--'){
      this.getSubFields();
    }else{
      this.sharedService.getSubFieldsByFieldId(id).subscribe(response =>{
        this.subFieldList = response;
        //console.log(id);
      })
    }   
  }

  getQualificationType(){
    this.qualificationType =[
      {
        qualId : 0,
        qualiType : "Certificate"
      },
      {
        qualId :1 ,
        qualiType : "Diploma"
      },
      {
        qualId :2 ,
        qualiType : "Degree"
      },
      {
        qualId :3 ,
        qualiType : "Masters"
      }
    ]
  }

  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }

    let fileToUpload = <File>files[0];
    //const formData = new FormData();
    this.formDataSubmit.append('imagePath', fileToUpload, fileToUpload.name);
    //this.personalForm.controls['imagePath'].value[fileToUpload.name];
     
  };

  public uploadCv = (files) =>{
    if(files.length === 0) {
      return;
    }

    let cvToUpload = <File>files[0];
    this.workFormDataSubmit.append('cvPath',cvToUpload,cvToUpload.name);
    
  }

  goNext(progress : ProgressComponent){
    progress.next();
    window.scrollTo(0,0);
    //console.log(this.formDataSubmit);
  }

  onStateChange(event){
    console.log(event);
  }


}
