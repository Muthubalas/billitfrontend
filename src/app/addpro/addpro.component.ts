import { Component, OnInit,Inject } from '@angular/core';
import { DataService } from '../data.service';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-addpro',
  templateUrl: './addpro.component.html',
  styleUrls: ['./addpro.component.css']
})
export class AddproComponent implements OnInit {
  pros: any;
  product=new FormGroup({
    id:new FormControl(''),
    name:new FormControl('',[Validators.required]),
    type:new FormControl('',[Validators.required]),
    price:new FormControl('',[Validators.required]),
    category:new FormControl('',[Validators.required]),
    quantity:new FormControl('',[Validators.required]),
    description:new FormControl(''),
  })
  saveprod: any;
  a: any;
  gender: any;
  proname: any;
  procat: any;
  description: any;

  constructor(private data:DataService,private router:Router, @Inject(MAT_DIALOG_DATA) public edit:any,
  private dialog:MatDialogRef<AddproComponent>) { }

  ngOnInit(): void {
    this.getproid()
  }
  get name(){
    return this.product.get('name')
  }
  get price(){
    return this.product.get('price')
  }
  get type(){
    return this.product.get('type')
  }
  get category(){
    return this.product.get('category')
  }
  get quantity(){
    return this.product.get('quantity')
  }


select(event:any){
  // console.log(event.target.value);
  this.a=event.target.value;


}
selectgender(event:any){
  // console.log(event.target.value);
  this.gender=event.target.value;


}
  getproid(){
    return this.data.getproid().subscribe((result:any)=>{
      this.pros=result.ProductID;

    })
   }
   capitalizeFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  savingInProgress: boolean = false;

  savepro() {
    if (this.savingInProgress) {
      return; // If save is already in progress, do nothing
    }

    this.savingInProgress = true; // Set saving in progress to true

    event?.preventDefault();
    if (this.product.value && this.product.value.name) {
      // Normalize service name by replacing multiple spaces with a single space
      let productName = this.product.value.name.trim().replace(/\s+/g, ' ');

      // Capitalize the first letter of each word
      productName = this.capitalizeFirstLetter(productName);

      this.proname = productName;
    } else {
      this.proname = ''; // Set default value if this.service.value.name is null or undefined
    }
    this.product.get("id")?.setValue(this.pros);
      // this.proname=this.product.value.name;
    // this.proname = this.capitalizeFirstLetter(this.proname.trim());
    this.procat=this.product.value.category;
    this.procat = this.capitalizeFirstLetter(this.procat.trim());
    this.description=this.product.value.description;
    this.description = this.capitalizeFirstLetter(this.description.trim());


    if (this.product.valid) {
      var item = {
        id:this.product.value.id,
              name:this.proname,
              type:this.product.value.type,
              price:this.product.value.price,
              category: this.procat,
           quantity: this.product.value.quantity,
              description:this.description,
      };


      this.data.addproduct(item).subscribe((result: any) => {
        this.saveprod = result;

        this.dialog.close();
        Swal.fire({
          title: 'Success',
          text: 'Product submitted successfully',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          window.location.reload();
        });
      },
      error => {
        this.savingInProgress = false; // Set saving in progress to false in case of an error
      });
    } else {
      Swal.fire({
        title: 'Warning',
        text: 'Please fill mandatory field',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      this.savingInProgress = false; // Set saving in progress to false if form is not valid
    }
  }


  cancelUpdate() {
    this.dialog.close();
  }
}
