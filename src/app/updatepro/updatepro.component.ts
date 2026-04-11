import { Component, OnInit,Inject } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-updatepro',
  templateUrl: './updatepro.component.html',
  styleUrls: ['./updatepro.component.css']
})
export class UpdateproComponent implements OnInit {
  a: any;

  pros: any;
  product=new FormGroup({
    _id:new FormControl(''),
    id:new FormControl(''),
    name:new FormControl(''),
    price:new FormControl(''),
    category:new FormControl(''),
    quantity:new FormControl(''),
    type:new FormControl(''),
    description:new FormControl('')
  })
category: any;
  proname: any;
  procat: any;
  description: any;
  constructor(private data:DataService,private dialogRef: MatDialogRef<UpdateproComponent>,
    @Inject(MAT_DIALOG_DATA) public edit: any,private router:Router) { }

  ngOnInit(): void {
    this.product.controls['_id'].setValue(this.edit._id);
    this.product.controls['id'].setValue(this.edit.Product_id);
    this.product.controls['name'].setValue(this.edit.Product_name);
    this.product.controls['category'].setValue(this.edit.Product_category);
    this.product.controls['price'].setValue(this.edit.Product_price);
    this.product.controls['type'].setValue(this.edit.Product_type);
    this.product.controls['quantity'].setValue(this.edit.Product_quantity);
    this.product.controls['description'].setValue(this.edit.Product_description);
  }

  select(event:any){
    // console.log(event.target.value);
    this.a=event.target.value;


  }
  getproid(){
    return this.data.getproid().subscribe((result:any)=>{
      this.pros=result.ProductID;

    })
   }
   selectcategory(event:any){
    // console.log(event.target.value);
    this.category=event.target.value;


  }
  capitalizeFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
   updatepro(){
    this.proname = this.product.value.name ? this.product.value.name.trim().replace(/\s+/g, ' ') : '';
    this.proname = this.proname ? this.capitalizeFirstLetter(this.proname) : '';

    // Normalize and capitalize description
    this.description = this.product.value.description ? this.product.value.description.trim().replace(/\s+/g, ' ') : '';
    this.description = this.description ? this.capitalizeFirstLetter(this.description) : '';
    this.procat=this.product.value.category;
    this.procat = this.capitalizeFirstLetter(this.procat.trim());
  
    const Prodata = {
      id: this.product.value.id,
      name: this.proname,
      price: this.product.value.price,
      category: this.procat,
      quantity:this.product.value.quantity,
      description: this.description,
type:this.product.value.type
    };

    const idData = {
      _id: this.product.value._id
    };

if(this.proname!='' && this.product.value.price!=null && this.procat!='' &&
this.product.value.type!=''  && this.product.value.quantity!=null){

    const url = idData._id;


    this.data.updatepro(url, Prodata).subscribe(
      (result) => {
        this.dialogRef.close();
        Swal.fire({
          title: 'Success',
          text: 'Product Updated',
          icon: 'success',
          confirmButtonText: 'OK'
        })
        // alert("Product updated successfully")
        // this.router.navigate(['table'])
        .then(()=>{
          window.location.reload();
        })

      }
    );
   }
   else{
    Swal.fire({
      title: 'Warning',
      text: 'Please fill mandatory field',
      icon: 'warning',
      confirmButtonText: 'OK'
    });
   }
     }
       cancelUpdate() {
    this.dialogRef.close();
  }
}
