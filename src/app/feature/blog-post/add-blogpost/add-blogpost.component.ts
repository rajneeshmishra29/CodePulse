import { Component, OnInit } from '@angular/core';
import { AddBlogPost } from '../models/Add-BlogPost.model';
import { BlogPostService } from '../Services/blog-post.service';
import { Router } from '@angular/router';
import { CategoryService } from '../../category/services/category.service';
import { Observable } from 'rxjs';
import { Category } from '../../category/models/category.model';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent implements OnInit {
  model:AddBlogPost;
  categories$?:Observable<Category[]>;


  constructor(private blogpostservice:BlogPostService,private route:Router,private categoryservice:CategoryService){
    this.model={
      Title:'',
      ShortDescription:'',
      UrlHandle:'',
      Content:'',
      FeaturedImageUrl:'',
      Author:'',
      IsVisible:true,
      Publisheddate:new Date(),
      categories:[]
    }

    
  }
  ngOnInit(): void {
    this.categories$=this.categoryservice.getAllCategories();

  }

  onFormSubmit():void{
    console.log(this.model)
      this.blogpostservice.CreateBlogPost(this.model)
      .subscribe({
        next:(response)=>{
        this.route.navigateByUrl('/admin/blogposts')
        }
      });
  }

}
