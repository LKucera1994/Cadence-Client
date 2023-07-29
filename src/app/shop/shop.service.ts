import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '../shared/models/pagination';
import { Product } from '../shared/models/product';
import { Brand } from '../shared/models/brand';
import { Type } from '../shared/models/type';
import { ShopParams } from '../shared/models/shopParams';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = "https://localhost:7132/api/"

  constructor(private httpClient: HttpClient) { }

  getProductsFromAPI(shopParams: ShopParams){
    let params = new HttpParams()

    if(shopParams.brandId>0) params= params.append("brandId",shopParams.brandId);
    if(shopParams.typeId>0) params = params.append("typeId",shopParams.typeId);
    params = params.append("sortOrder",shopParams.sortOrder);
    params = params.append("pageIndex",shopParams.pageNumber);
    params = params.append("pageSize",shopParams.pageSize);
    if(shopParams.search) params = params.append("search", shopParams.search);

    return this.httpClient.get<Pagination<Product[]>>(this.baseUrl + "Products", {params:params} );
  }

  getBrandsFromAPI(){
    return this.httpClient.get<Brand[]>(this.baseUrl +"Products/brands");
  }

  getTypesFromAPI(){
    return this.httpClient.get<Type[]>(this.baseUrl +"Products/types");
  }

}
