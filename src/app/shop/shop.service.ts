import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '../shared/models/pagination';
import { Product } from '../shared/models/product';
import { Brand } from '../shared/models/brand';
import { Type } from '../shared/models/type';
import { ShopParams } from '../shared/models/shopParams';
import { Observable, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = environment.apiUrl;
  products: Product[] = [];
  brands: Brand[] = [];
  types: Type[] = [];
  pagination?: Pagination<Product[]>;
  shopParams = new ShopParams();
  productCache = new Map<string,Pagination<Product[]>>();

  constructor(private httpClient: HttpClient) { }

  getProductsFromAPI(useCache = true): Observable<Pagination<Product[]>>{

    if(!useCache)
      this.productCache = new Map();

    // return cached item if we use the cache
    if(this.productCache.size >0 && useCache){
      if(this.productCache.has(Object.values(this.shopParams).join('-'))){
        this.pagination = this.productCache.get(Object.values(this.shopParams).join('-'));

        if(this.pagination)
          return of(this.pagination);
      }
    }

    let params = new HttpParams()

    if(this.shopParams.brandId>0)
       params= params.append("brandId",this.shopParams.brandId);
    if(this.shopParams.typeId>0)
       params = params.append("typeId",this.shopParams.typeId);
    params = params.append("sortOrder",this.shopParams.sortOrder);
    params = params.append("pageIndex",this.shopParams.pageNumber);
    params = params.append("pageSize",this.shopParams.pageSize);
    if(this.shopParams.search)
       params = params.append("search", this.shopParams.search);

    return this.httpClient.get<Pagination<Product[]>>(this.baseUrl + "Products", {params:params}).pipe(
      map(response =>{
        this.productCache.set(Object.values(this.shopParams).join('-'),response)
        this.pagination = response;
        return response; 
      })
    )
  }

  setShopParams(params: ShopParams){
    this.shopParams = params;
  }

  getShopParams(){
    return this.shopParams;
  }

  getBrandsFromAPI(){
    if(this.brands.length>0) 
      return of(this.brands);

    return this.httpClient.get<Brand[]>(this.baseUrl +"Products/brands").pipe(
      map(result => this.brands = result)
    );
  }

  getTypesFromAPI(){
    if(this.types.length>0)
      return of(this.types);

    return this.httpClient.get<Type[]>(this.baseUrl +"Products/types").pipe(
      map(result => this.types = result )
    );
  }

  getProduct(id: number){
    const product = [...this.productCache.values()]
    .reduce((accumulator,paginatedResult)=> {
      return {...accumulator,...paginatedResult.data.find(x => x.id === id)}
    }, {} as Product)
    
    if(Object.keys(product).length !== 0)
      return of (product)

    return this.httpClient.get<Product>(this.baseUrl +"Products/" + id)
  }
}
