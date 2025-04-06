export interface BookFilter {

    // search?: string;
  
    // //filtering
    categoryId?: number;
    isFavorite?: boolean; 
  
    // //sorting
    // sortBy?: 'name' | 'year'; 
  
    // pagination
    _page?: number;
    _per_page?: number;
  }