import { Component, OnInit,Inject } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addinvent',
  templateUrl: './addinvent.component.html',
  styleUrls: ['./addinvent.component.css']
})
export class AddinventComponent implements OnInit {
  getpro: any;
  select: any;

  selectedProduct: any;
  selectedProductCategory: any;
  selectedproname: any;
  catprod: any;
  getcat: any;
  item: any;
  selectedcategory: any;
  productid: any;
  prodquantity: any;
  getcategory: any;
  catlist: any[] = [];
  selectedcat: any;
  a: any;
  sel:any;
  b: any;
  _id: any;
  productname: any;
  productcat: any;
  type: any;
  des: any;
  price: any;
  constructor(private datas:DataService,private router:Router,private http:HttpClient, @Inject(MAT_DIALOG_DATA) public edit:any,
  private dialog:MatDialogRef<AddinventComponent>) { }

  ngOnInit(): void {
  //  this.onProductSelected(e)
this. totalproduct()
    this. getproductlist()
  }
  cancelUpdate() {
    this.dialog.close();
  }
  getproductlist(){
    return this.datas.getproductlist().subscribe((result:any)=>{
      // const uniqueProductNames = [...new Set(result.listserv.map((product: any) => product.Product_name))];
      // this.getpro = uniqueProductNames.map(productName => result.listserv.find((product: any) => product.Product_name === productName));
      // console.log(this.getpro);
      // this.getpro=result.listserv;
      // console.log(this.getpro);

    })
   }
   totalproduct(){
    return this.datas.totalproretail().subscribe((result:any)=>{
      const uniqueProductNames = [...new Set(result.listproduct.map((product: any) => product.Product_name))];
      this.getpro = uniqueProductNames.map(productName =>result.listproduct.find((product: any) => product.Product_name === productName));
      // this.getpro=result.listproduct;
      // console.log(this.getpro);

    })
   }
   selectcat(e:any){
//     console.log(e.target.value);

if(this.selectedcategory){
  this.productid=this.selectedcategory. Product_id;

}

   }
   addinvent(){
    this.productid=this.productid?this.productid:"";
    this.productname=this.productname?this.productname:"";
    this.productcat=this.productcat?this.productcat:"";
    this.prodquantity=this.prodquantity?this.prodquantity:"";
    if(this.productid!="" && this.productname != "" && this.productcat!=""
      && this.prodquantity != ""){
    var detail={
      id:this.productid,
      name:this.productname,
      category:this.productcat,
      quantity:this.prodquantity,
      price:this.price,

      description:this.des,
      type:this.type

    }

    var id={
      _id:this._id
    }

    const url = id._id

    this.datas.addinv(url,detail).subscribe(
      (result:any) => {
        this.catprod = result;
        this.dialog.close()
        Swal.fire({
          title: 'Success',
          text: 'Added to inventory',
          icon: 'success',
          confirmButtonText: 'OK'
        })
//  alert("inventory updated")
//       this.router.navigate(['invent'])
      .then(()=>{
        window.location.reload();
      })



      })
   }
   else{
    Swal.fire({
      title: 'Warning',
      text: 'Please fill mandatory fields',
      icon: 'warning',
      confirmButtonText: 'OK'
    });
    // alert("please fill all the fields")
   }
  }


  onProductSelected(data: any) {
    if (this.selectedProduct) {
      this.selectedproname = this.selectedProduct.Product_name;

      const url =this.selectedproname

      this.datas.getprodcat(url).subscribe(
        (result: any) => {
          this.catprod = result;
          this.getcat = this.catprod.details;
          const retailProducts = this.getcat.filter((product:any) => product.Product_type === "Retail");
          this.getcat= retailProducts;
          let productid: string[] = this.getcat.map((item: any) => item.Product_id);

          this.selectedcat ="";

          this.catselect(this.selectedcat);
        }
      );
    }
  }




   catselect(value: any) {
    // this.b=value.target.value;

this.productid=value.Product_id;
this.type=value.Product_type;
this.des=value.Product_description;
this.price=value.Product_price;
this._id=value._id
this.productname=value.Product_name;
this.productcat=value.Product_category;


  }


  }
