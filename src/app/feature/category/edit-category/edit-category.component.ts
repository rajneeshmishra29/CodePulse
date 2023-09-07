import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { UpdateCategoryRequest } from '../models/update-category-request.model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit,OnDestroy {
  id: string | null =null;
  paramsubscription?:Subscription;
  editCategorySubscription?:Subscription;

  category?: Category

  constructor(private route:ActivatedRoute,private categoryservice:CategoryService,private router:Router){}
  
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next:(params)=>{

        this.id=params.get('id')
        if(this.id){
          this.categoryservice.getCategoryById(this.id)
          .subscribe({
            next:(response)=>{
              this.category=response
            }
          })
          //get the data from the api

        }
      }
      
    });
  }
  ngOnDestroy(): void {
    this.paramsubscription?.unsubscribe();
    this.editCategorySubscription?.unsubscribe();

  }
  onFormSubmit(){
    debugger;
    const UpdateCategoryRequest:UpdateCategoryRequest={
      name:this.category?.name ??'',
      urlHandle:this.category?.urlHandle ?? ''
    };

    //pass this object to service

    if(this.id){

      this.categoryservice.updateCategory(this.id,UpdateCategoryRequest)
      .subscribe({
        next:(response)=>{
          this.router.navigateByUrl('/admin/categories');
        }
      });
    }

    
  }

  onDelete():void{
    if(this.id)
    {
      this.categoryservice.deleteCategory(this.id)
      .subscribe({
        next:(response)=>{
          this.router.navigateByUrl('/admin/categories');
        }
      })
    }

  }

}
