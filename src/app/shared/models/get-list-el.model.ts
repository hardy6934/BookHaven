 

export interface GetListEl<T> {
    data: T[];    
    items: number;      
    first: number;      
    last: number;       
    next: number | null; 
    prev: number | null; 
    pages: number;      
  }