import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared/shared-module';
import { Region } from '../../_model/region';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SwalMessages } from '../../../../shared/swal-messages';
import { RegionService } from '../../_service/region.service';

declare var $ : any; 

@Component({
  selector: 'app-region',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './region.component.html',
  styleUrl: './region.component.css'
})
export class RegionComponent {
  regions : Region[] = [];
  form: FormGroup;
  swal: SwalMessages = new SwalMessages(); // swal messages
  submitted = false;
  regionUpdate:number = 0;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private regionService: RegionService 
  ){
    this.form = this.formBuilder.group({
      region: ["", [Validators.required]],
      tag: ["", [Validators.required]]
    })
  }

  ngOnInit(){
    this.getRegions();
  }

  disbleRegion(id : number){
    this.swal.confirmMessage.fire({
      title:'Favor de confirmar la eliminacion',
    }).then((result) => {
      if(result.isConfirmed){
        this.regionService.disableRegion(id).subscribe({
          next : (v) =>{
            this.swal.successMessage(v.message);
            this.getRegions();
          },
          error : (e) => {
            console.log(e)
            this.swal.errorMessage(e.error.message);
          }
        });
      }
    });
  }

  enableRegion(id : number){
    this.swal.confirmMessage.fire({
      title:"Favor de confirmar la activacion",
    }).then((result) => {
      if(result.isConfirmed){
        this.regionService.enableRegion(id).subscribe({
          next: (v) =>{
            this.swal.successMessage(v.messages);
            this.getRegions();
          },
          error : (e) =>{
            console.log(e);
            this.swal.errorMessage(e.error.message);
          }
        });
      }
    });    
  }

  getRegions(){
    this.loading = true;
    this.regionService.getRegions().subscribe({
      next: (v) => {
        console.log(v);
        this.regions = v;
        this.loading = false;
      },
      error: (e) => {
        console.error(e);
        this.loading = false;
      }
    });
  }

  onSubmit(){
    this.submitted = true;
    if(this.form.invalid){return;}
    this.submitted = false;

    if(this.regionUpdate == 0){
      this.onSubmitCreate();
    } else {
      this.onSubmitUpdate();
    }
  }

  onSubmitCreate(){
    this.regionService.createRegion(this.form.value).subscribe({
      next : (v) => {
        this.getRegions();
        this.hideModalForm();
        this.resetVariables();
        this.swal.successMessage(v.message);
      },
      error : (e) =>{
        console.log(e);
        this.swal.errorMessage(e.error.message);
      }
    });
  }

  onSubmitUpdate(){
    this.regionService.updateRegion(this.form.value, this.regionUpdate).subscribe({
      next : (v) => {
        this.getRegions();
        this.hideModalForm();
        this.resetVariables();
        this.swal.successMessage(v.message);
      },
      error : (e) => {
        console.log(e);
        this.swal.errorMessage(e.error.message);
      }
    });
  }

  updateRegion(region : Region){
    this.resetVariables();
    this.showModalForm();

    this.regionUpdate = region.region_id;
    this.form.controls['region'].setValue(region.region);
    this.form.controls['tag'].setValue(region.tag);
  }

  showModalForm(){
    $("#modalForm").modal("show");
  }

  hideModalForm(){
    $("#modalForm").modal("hide");
  }

  resetVariables(){
    this.form.reset();
    this.submitted = false;
    this.regionUpdate = 0;
  }
}
