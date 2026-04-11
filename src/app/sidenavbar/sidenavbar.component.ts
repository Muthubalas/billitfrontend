import { Component, OnInit,Input,Output,EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { NavigationEnd } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ChangeDetectionStrategy } from '@angular/core';
@Component({
  selector: 'app-sidenavbar',
  templateUrl: './sidenavbar.component.html',
  styleUrls: ['./sidenavbar.component.css'], animations: [
    trigger('rotateIcon', [
      state('open', style({ transform: 'rotate(180deg)' })),
      state('closed', style({ transform: 'rotate(0deg)' })),
      transition('open <=> closed', animate('300ms ease-in-out')),
    ]),
  ],
})
export class SidenavbarComponent implements OnInit {
  rotationState: 'open' | 'closed' = 'closed';
  rotationState1: 'open' | 'closed' = 'closed';
  rotationState2: 'open' | 'closed' = 'closed';
  isClosed: boolean=false;
  arrowState: string = 'closed';
  subybut: boolean=false;
  subybut1: boolean=false;
  helper=new JwtHelperService();
  subybut2: boolean=false;
  activeRoute: string = '';
  userRole: any;
  gettoken: any;
  userRole1: boolean=false;
  userRole2: boolean=false;
  isAdmin: boolean = false;

  constructor(private route:Router) { }

  ngOnInit(): void {


    let tok=localStorage.getItem('token');
    if (tok) {
      const decodetoken = this.helper.decodeToken(tok);

      this.gettoken = decodetoken;
      this.userRole=this.gettoken.role;
      if (this.userRole === '0' || this.userRole === 0) {

        this.activeRoute = 'admin';
        this.isAdmin = true;

      }
      if(this.userRole=="0"){
        this.userRole1=true;
        this.userRole2=false;
      }
      else{
        this.userRole2=true;
        this.userRole1=false;
      }

    } else {

    }

    let role=tok
    this.route.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateActiveRoute();
      }
    });

    this.updateActiveRoute();
  }

  updateActiveRoute() {

    const currentRoute = this.route.url.split('/')[1];
    this.activeRoute = currentRoute;
  }

  @Input() isOpen: boolean = false;
  @Output() toggle: EventEmitter<void> = new EventEmitter<void>();

  toggleSideNav() {
    this.toggle.emit();
  }
  toggleSidebar() {
    this.isOpen = !this.isOpen;
    this.toggle.emit();}

    opendd(){
      this.subybut=!this.subybut
      this.rotationState = this.subybut ? 'open' : 'closed';
    }
    opendd1(){
      this.subybut1=!this.subybut1
      this.rotationState1 = this.subybut1 ? 'open' : 'closed';
    }
    opendd2(){
      this.subybut2=!this.subybut2
      this.rotationState2 = this.subybut2 ? 'open' : 'closed';
    }

    serve(){
      this.route.navigate(['service'])
    }
    pro(){
      this.route.navigate(['product'])
    }
    dash(){
      this.route.navigate(['dashboard'])
    }
    adminpage(){
      this.route.navigate(['admin'])
    }
    cuspage(){
      this.activeRoute = 'customer';
      this.route.navigate(['customer'])
    }
    staffrep(){
      this.route.navigate(['staff_report'])
    }
    dayrep(){
      this.route.navigate(['day_report'])
      this.subybut = false;
    }
    monthrep(){
      this.route.navigate(['month_report'])
      this.subybut = false;
    }
    staffpage(){
      this.route.navigate(['staff'])
    }
    exppage(){
      this.route.navigate(['expense'])
    }
    proinvent(){
      this.route.navigate(['invent'])
    }
    saloninvent(){
      this.route.navigate(['salon'])
    }
    reportpage(){
      this.route.navigate(['report'])
    }
    servebillingrep(){
      this.route.navigate(['inv_summary'])

    }
    probillingrep(){
      this.route.navigate(['inv_details'])
    }
    servebilling(){
      this.route.navigate(['service_bill'])
      this.subybut = false;
    }
    probilling(){
      this.route.navigate(['product_bill'])
      this.subybut = false; }
      isOpen1:boolean = false;

      toggleSidebar1() {
        this.isOpen1 = !this.isOpen1;
      }

}
