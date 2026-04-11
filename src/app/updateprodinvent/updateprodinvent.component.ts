import { Component, OnInit,Inject } from '@angular/core';
import { DataService } from '../data.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-updateprodinvent',
  templateUrl: './updateprodinvent.component.html',
  styleUrls: ['./updateprodinvent.component.css']
})
export class UpdateprodinventComponent implements OnInit {
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
  salon=new FormGroup({
    _id:new FormControl(''),
    id:new FormControl(''),
    name:new FormControl(''),
    category:new FormControl(''),
    quantity:new FormControl(''),
    description:new FormControl(''),
    price:new FormControl('')
  })
  selectedProductId: any;
  constructor(private datas:DataService, @Inject(MAT_DIALOG_DATA) public edit:any,
  private dialog:MatDialogRef<UpdateprodinventComponent>,private router:Router) { }

  ngOnInit(): void {
    this.totalproduct()

    // this.catselect(this.selectedcat,this.selectedProductId);
    this.salon.controls['_id'].setValue(this.edit._id);


    this.salon.controls['id'].setValue(this.edit.Product_id);
    this.salon.controls['name'].setValue(this.edit.Product_name);
    this.salon.controls['category'].setValue(this.edit.Product_category);
    this.salon.controls['quantity'].setValue(this.edit.Product_quantity);
    this.salon.controls['price'].setValue(this.edit.Product_price);

this.salon.controls['description'].setValue(this.edit.Product_description);

    this.selectedProduct=this.edit.Product_name;


    const url = this.selectedProduct;

    this.datas.getprodcat(url).subscribe(
      (result: any) => {
        this.catprod = result;
        this.getcat = this.catprod.details;
        const retailProducts = this.getcat.filter((product:any) => product.Product_type === "Retail");
        this.getcat= retailProducts;
        let productid: string[] = this.getcat.map((item: any) => item.Product_id);

        this.selectedcat ="";

        // this.catselect(this.selectedcat,this.selectedProductId);
      }
    );

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
      // console.log(this.getpro);

    })
   }

   addinvent(){

       var detail={
      id:this.salon.value.id,
      name:this.salon.value.name,
      category:this.salon.value.category,
      quantity:this.salon.value.quantity,
      price:this.salon.value.price,
      type:this.edit.Product_type,
      description:this.salon.value.description
    }

    var id={
      _id:this.salon.value._id
    }


    if(this.salon.value.id!="" && this.salon.value.name != "" && this.salon.value.category!=""
        && this.salon.value.quantity != undefined){
    const url = id._id;

    this.datas.editinv(url,detail).subscribe(
      (result:any) => {
        this.catprod = result;
        this.dialog.close();
        Swal.fire({
          title: 'Success',
          text: 'Inventory Updated',
          icon: 'success',
          confirmButtonText: 'OK'
        })
//  alert("inventory updated")
//       this.router.navigate(['salon'])
      .then(()=>{
        window.location.reload();
      })
      // console.log(this.Users);


      })
   }
   else{
    Swal.fire({
      title: 'Warning',
      text: 'Please fill mandatory field',
      icon: 'warning',
      confirmButtonText: 'OK'
    });
   }
//   this.updateProductIdField1(product_id[0]);
}
catselect(catval: any,selectedProductId:any,selectedProduct_Id:any,selecteddes:any,selectedprice:any) {

this.updateProductIdField1(selectedProduct_Id)
this.updateProductIdField(selectedProductId);
this.updateProductdesField(selecteddes);
this.updateProductpriceField(selectedprice);
}
updateProductIdField(selectedProductId: string) {
  this.salon.get('id')?.patchValue(selectedProductId); // Set the value for the 'id' form control
}
updateProductpriceField(selectedprice: string) {
  this.salon.get('price')?.patchValue(selectedprice); // Set the value for the 'id' form control
}
updateProductdesField(selecteddes: string) {
  this.salon.get('description')?.patchValue(selecteddes); // Set the value for the 'id' form control
}
updateProductIdField1( selectedProduct_Id: string) {
  this.salon.get('_id')?.patchValue(selectedProduct_Id); // Set the value for the 'id' form control
}
onProductSelected(datas: any) {
  // console.log(datas.target.value);

this.selectedProduct = datas.target.value.split(':')[1].trim(); // Splitting the value and taking the second part
// console.log(this.selectedProduct);


    const url = this.selectedProduct;

    this.datas.getprodcat(url).subscribe(
      (result: any) => {
        this.catprod = result;
        // console.log(this.catprod.details);
        this.getcat = this.catprod.details;
        const retailProducts = this.getcat.filter((product:any) => product.Product_type === "Retail");
        this.getcat= retailProducts;
        // console.log(this.getcat);
        this.salon.get('id')?.setValue('');
        this.salon.get('quantity')?.setValue('');
      }
    );
  }

}
