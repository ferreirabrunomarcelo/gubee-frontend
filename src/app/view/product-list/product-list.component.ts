import { Component, OnInit } from "@angular/core";
import { ProductService } from '../../service/product.service';
import { Product } from 'src/app/model/product';
import { Subscription } from "rxjs";
import { StackService } from "src/app/service/stack.service";
import { MatTableDataSource } from "@angular/material/table";
import { Stack } from "src/app/model/stack";
import { FormControl } from "@angular/forms";
import { TargetMarket } from "src/app/model/target_market";
import { TargetMarketService } from "src/app/service/target_market_service";

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {

    products!: Product[];
    displayedColumns: string[] = ['productName', 'description', 'targetMarket', 'stack'];
    
    dataSource = new MatTableDataSource<Product>([]);

    //Dropdown Stack

    stacks!: Stack[];

    idsStack = new FormControl();

    idsSelectedStack!: string;

    //Dropdown TargetMarket

    targetMarkets!: TargetMarket[];

    idsTargetMarket = new FormControl();

    idsSelectedTargetMarket!: string;

    disableSelect = new FormControl(false);

    constructor(
        public productService : ProductService, public stackService : StackService,
        public targetMarketService : TargetMarketService
    ) {}

    ngOnInit () : void {

        
       //this.getProducts();
    
       this.getProducts();
       this.dataSource.data = this.products;

       //dropdown Stack
       this.getStacks();

       //dropdown TargetMarket
       this.getTargetMarkets();
    }

    refresh(){
        this.getProductsByStack();
    }

    getProducts(){
        this.productService.getAllProducts().subscribe((data: Product[]) => {
            console.log(data);
            this.products = data;
            this.dataSource.data = data;
        });
    }

    getProductsByStack(){
        this.productService.getProductsByStack(this.idsSelectedStack).subscribe((data: Product[]) => {
            this.products = data;
            this.dataSource.data = data;
        })
        console.log(this.products);
    }

    getProductsByTargetMarket(){
        this.productService.getProductsByTargetMarket(this.idsSelectedTargetMarket).subscribe((data: Product[]) => {
            this.products = data;
            this.dataSource.data = data;
        })
    }

   //stacks

    // Filter
    public filterStacks(){
        this.idsSelectedStack = this.idsStack.value;
       
        this.productService.getProductsByStack(this.idsSelectedStack).subscribe((data: Product[]) => {
            this.products = data;
           console.log(this.products);
        })
    }

    getStacks(){
        this.stackService.getAllStacks().subscribe((data: Stack[]) => {
            this.stacks = data;
        });
    }

    //Target Market

    getTargetMarkets(){
        this.targetMarketService.getAllTargetMarkets().subscribe((data: TargetMarket[]) => {
            this.targetMarkets = data;
        });
    }

    filterTargetMarkets(){
        this.idsSelectedTargetMarket = this.idsTargetMarket.value;
       
        this.productService.getProductsByTargetMarket(this.idsSelectedTargetMarket).subscribe((data: Product[]) => {
            this.products = data;
           console.log(this.products);
        })
    }

  
 
}