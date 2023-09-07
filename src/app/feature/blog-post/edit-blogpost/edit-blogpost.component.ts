import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPostService } from '../Services/blog-post.service';
import { BlogPost } from '../models/blog-post.model';
import { Category } from '../../category/models/category.model';
import { CategoryService } from '../../category/services/category.service';
import { UpdateBlogPost } from '../models/update-blog-post.model';

@Component({
  selector: 'app-edit-blogpost',
  templateUrl: './edit-blogpost.component.html',
  styleUrls: ['./edit-blogpost.component.css']
})
export class EditBlogpostComponent implements OnInit,OnDestroy {

  id:string | null=null;
  routeSubscription?:Subscription
  updateblogpostSubscription?:Subscription
  getblogpostSubscription?:Subscription



  model?:BlogPost
  categories$?:Observable<Category[]>;
  selectedcategories?:string[];

  constructor(private route:ActivatedRoute,private blogpostservice:BlogPostService,private categoryservices:CategoryService,private router:Router){}
  
  ngOnInit(): void {
    this.categories$=this.categoryservices.getAllCategories();
    
    this.routeSubscription=this.route.paramMap.subscribe({
      next: (params)=>{
        this.id=params.get('id')

        //get blogpost from api

        if(this.id){
         this.getblogpostSubscription= this.blogpostservice.GetBlogPostById(this.id).subscribe({
            next:(response)=>{
              this.model=response
              this.selectedcategories=response.categories.map(x=>x.id)

            }
          })
        }
      }
    });

  }
  onFormSubmit():void{
    //convert this model to request object

    if(this.model && this.id){
      var UpdateBlogPost:UpdateBlogPost={
        Author:this.model.author,
        Content:this.model.content,
        ShortDescription:this.model.shortDescription,
        FeaturedImageUrl:this.model.featuredImageUrl,
        IsVisible:this.model.isVisible,
        Publisheddate:this.model.publisheddate,
        Title:this.model.title,
        UrlHandle:this.model.urlHandle,
        categories:this.selectedcategories??[]


      };

      this.blogpostservice.updateBlogPost(this.id,UpdateBlogPost)
      .subscribe({
        next:(response)=>{
          this.router.navigateByUrl('/admin/blogposts')
        }
      });

    }

   
    // this.blogpostservice.CreateBlogPost(this.model)
    //   .subscribe({
    //     next:(response)=>{
    //     this.route.navigateByUrl('/admin/blogposts')
    //     }
    //   });

  }

  OndeleteBlogPost():void{
    if(this.id)
    {
      this.blogpostservice.deleteCategory(this.id)
      .subscribe({
        next:(response)=>{
          this.router.navigateByUrl('admin/blogposts');
        }
      })
    }
      
  }



  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.updateblogpostSubscription?.unsubscribe();
    this.getblogpostSubscription?.unsubscribe();

  }

}
