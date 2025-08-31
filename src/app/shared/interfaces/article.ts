export interface Article {
  id:number;
  title:string;
  content:string;
  category:string;
  status:string;
  created_at?:string;
  updated_at?:string;
}