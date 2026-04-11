import { Component, OnInit,NgZone } from '@angular/core';
import { DataService } from '../data.service';
import { Router ,ActivatedRoute} from '@angular/router';
import { FormControl, FormGroup,Validators} from '@angular/forms';
import Swal from 'sweetalert2';
// import * as jwt_decode from 'jwt-decode';
import * as jwt_decode from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginform=new FormGroup({

    email:new FormControl('',[Validators.required]),
    password:new FormControl('',[Validators.required]),
    check:new FormControl('',[Validators.required]),
  })
  // email: string = '';
  // password: string = '';
  visible:boolean=true
  changetype:boolean=true
  showCommonDesign: boolean=false;
helper=new JwtHelperService();
  emailid: any;
  passwd: any;
  show: boolean=false;
  constructor(private DataService:DataService,private router:Router,private zone: NgZone,
    private route:ActivatedRoute) {

   }
   get email(){
    return this.loginform.get('email')
  }
  get password(){
    return this.loginform.get('password')
  }
  get check(){
    return this.loginform.get('check')
  }
  ngOnInit(): void {
    this.show=false;
    if (this.DataService.isLoggedIn()) {
      this.router.navigate(['dashboard'])
    }
    this.showCommonDesign=false;

  }

  updateShowCommonDesign() {
    this.zone.run(() => {
      this.showCommonDesign = false;
    });
  }
  login() {
    // Check if username and password fields are empty
    if (!this.loginform.value.email || !this.loginform.value.password) {
      Swal.fire({
        icon: 'warning',
        title: 'Warning',
        text: 'Please fill both username and password',
        toast: true,
        position: 'center',
        customClass: {
          popup: 'center'
        },
        showConfirmButton: false,
        timer: 3000
      });
      return;
    }

    // Check if the terms and conditions checkbox is checked
    if (!this.loginform.value.check) {
      Swal.fire({
        icon: 'warning',
        title: 'Warning',
        text: 'Please check the terms and conditions',
        toast: true,
        position: 'center',
        customClass: {
          popup: 'center'
        },
        showConfirmButton: false,
        timer: 3000
      });
      return;
    }

    // Proceed with login
    this.emailid = this.loginform.value.email;
    this.passwd = this.loginform.value.password;

    this.DataService.login(this.emailid, this.passwd)
      .subscribe(response => {
        // Handle the response from the server
        if (response.message == "successfully logged in") {
          // Redirect to dashboard on successful login
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigateByUrl(returnUrl);

          // Store token in local storage
          localStorage.setItem('token', response.token);

          const decodetoken = this.helper.decodeToken(response.token);

          if (decodetoken.role === '0') {
            this.router.navigate(['dashboard']);
          } else if (decodetoken.role === '1') {
            this.router.navigate(['dashboard']);
          }

        } else {
          // Handle login errors
          if (response.error === "email ID does't match" && response.error === "password  does't match") {
            alert("Email and password do not match");
          } else if (response.error === "email ID does't match") {
            Swal.fire({
              icon: 'warning',
              title: 'Warning',
              text: 'Email is not matched',
              toast: true,
              position: 'center',
              customClass: {
                popup: 'center'
              },
              showConfirmButton: false,
              timer: 3000
            });
          } else if (response.error === "password  does't match") {
            Swal.fire({
              icon: 'warning',
              title: 'Warning',
              text: 'Password is not matched',
              toast: true,
              position: 'center',
              customClass: {
                popup: 'center'
              },
              showConfirmButton: false,
              timer: 3000
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: "Incorrect Username or Password",
              toast: true,
              position: 'center',
              customClass: {
                popup: 'center'
              },
              showConfirmButton: false,
              timer: 3000 // Adjust the duration as needed
            });
          }
        }
      }, error => {
        // Handle error
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: "Login Failed",
          toast: true,
          position: 'center',
          customClass: {
            popup: 'center'
          },
          showConfirmButton: false,
          timer: 3000 // Adjust the duration as needed
        });
      });
  }


view(){
  this.visible=!this.visible;
  this.changetype=!this.changetype
}
}
