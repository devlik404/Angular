export interface Hacker {
  by: string;
  descendants:number;
  id: number;
  kids:number[];
  score:number;
  time:number;
  title:string;
  type:string;
  url:string;
  formattedTime?: string;
}
export interface Comment {
  by: string;
  id: number;
  kids:number[];
  parent:number;
  text:string;
  time:number;
  type:string;
  formattedTime?: string;
}



