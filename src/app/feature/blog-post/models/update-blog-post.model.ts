export interface UpdateBlogPost{
    Title:string;
    ShortDescription:string;
    Content:string;
    FeaturedImageUrl:string;
    UrlHandle:string;
    Publisheddate:Date;
    Author:string;
    IsVisible:boolean;
    categories:string[];
}