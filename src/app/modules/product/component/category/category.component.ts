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
    this.categories = this.categoryService.getCategories();
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

  onSubmit(){
    this.submitted = true;
    if(this.form.invalid) return;
    this.submitted = false;
    let id = this.categories.length + 1;
    let nuevaCat = new Category(id, this.form.controls['category'].value!, this.form.controls['tag'].value!, 1);
    this.categories.push(nuevaCat);
    this.hideModalForm();
    //alert("La categoria ha sido registrada");
    this.swal.successMessage("La categoria ha sido registrada"); // show message
  }
}
