import { Component } from '@angular/core';
import { CategoryService } from '../../_service/category.service';
import { Category } from '../../_model/category';
import {FormGroup, FormBuilder, Validators} from '@angular/forms'
import { SharedModule } from '../../../../shared/shared-module';
import { SwalMessages } from '../../../../shared/swal-messages';

declare var $: any;

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})

export class CategoryComponent {
  categories:Category[] = [];
  form:FormGroup;
  swal: SwalMessages = new SwalMessages(); // swal messages
  submitted = false;
  categoryUpdate:number = 0;
  current_date = new Date(); // hora y fecha actual
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService
  ){
    this.form = this.formBuilder.group({
      category: ["", [Validators.required]],
      tag: ["", [Validators.required]]
    })
  }

  getCategories(){
    this.loading = true;
    this.categoryService.getCategories().subscribe({
      next: (v) => {
        console.log(v);
        this.categories = v;
        this.loading= false;
        this.current_date = new Date();
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message);
        this.loading = false;
      }
    });
  }

  ngOnInit(){
    this.getCategories();
  }

  // Modals
  showModalForm(){
    this.submitted = false;
    this.form.reset();
    $("#modalForm").modal("show");
  }

  hideModalForm(){
    $("#modalForm").modal("hide");
  }

  disableCategory(id:number){
    this.swal.confirmMessage.fire({
      title: "Favor de confirmar la eliminacion"
    }).then((result) =>{
      this.categoryService.deleteCategory(id).subscribe({
        next: (v) => {
          this.swal.successMessage(v.message);
          this.getCategories();
        },
        error: (e) => {
          console.log(e);
          this.swal.errorMessage(e.error.message);
        }
      });
    });
  }

  enableCategory(id:number){
    this.swal.confirmMessage.fire({
      title: "Favor de confirmar la activación",
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.activeCategory(id).subscribe({
          next: (v) => {
            this.swal.successMessage(v.message);
            this.getCategories();
          },
          error: (e) => {
            console.log(e);
            this.swal.errorMessage(e.error.message);
          }
        });
      }
    });
  }

  onSubmit(){
    // validación del formulario 
    this.submitted = true;
    if(this.form.invalid){return;}
    this.submitted = false;

    // valida si se está registrando o actualizando una categoria
    if(this.categoryUpdate == 0){
      this.onSubmitCreate();
    }else{
      this.onSubmitUpdate();
    }
  }

  onSubmitCreate(){
    this.categoryService.createCategory(this.form.value).subscribe({
      next: (v) => {
        this.getCategories();
        this.hideModalForm();
        this.resetVariables();
        this.swal.successMessage(v.message);
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error.message);
      }
    });
  }

  onSubmitUpdate(){
    this.categoryService.updateCategory(this.form.value, this.categoryUpdate).subscribe({
      next: (v) => {
        this.getCategories();
        this.hideModalForm();
        this.resetVariables();
        this.swal.successMessage(v.message);
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage("No se pudo actualizar la categoria");
      }
    });
  }

  updateCategory(category: Category){
    this.resetVariables();
    this.showModalForm();

    this.categoryUpdate = category.category_id;
    this.form.reset();
    this.form.controls['category'].setValue(category.category);
    this.form.controls['tag'].setValue(category.tag);

    this.submitted = false;
    $("#modalForm").modal("show");
  }

  resetVariables(){
    this.form.reset();
    this.submitted = false;
    this.categoryUpdate = 0;
  }
}