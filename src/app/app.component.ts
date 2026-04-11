import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';;
import { trigger, state, style, animate, transition } from '@angular/animations';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  subybut=false
  subybut1=false
  isClosed = false;
  isSubMenuOpen = false;
  showCommonDesign:boolean=true;
  title = 'app';
  show:boolean=true;
  activeRoute: string = '';


  sideNavOpen: boolean = false;

  toggleSideNav() {
    this.sideNavOpen = !this.sideNavOpen;
  }

    constructor(private route: Router) {

    }



  opendd(){
    this.subybut=!this.subybut

  }
  opendd1(){
    this.subybut1=!this.subybut1

  }
  servebillingrep(){
    this.route.navigate(['servreport'])
  }
  probillingrep(){
    this.route.navigate(['prorep'])
  }
  serve(){
    this.route.navigate(['serve'])
  }
  pro(){
    this.route.navigate(['table'])
  }
  dash(){
    this.route.navigate(['dashy'])
  }
  adminpage(){
    this.route.navigate(['admin'])
  }
  cuspage(){
    this.route.navigate(['customer'])
  }
  staffpage(){
    this.route.navigate(['staff'])
  }
  inventpage(){
    this.route.navigate(['invent'])
  }
  reportpage(){
    this.route.navigate(['report'])
  }
  servebilling(){
    this.route.navigate(['servebill'])
  }
  probilling(){
    this.route.navigate(['probill'])  }
  toggleSidebar() {
    this.isClosed = !this.isClosed;
    // Close the submenu when the sidebar is toggled
    this.isSubMenuOpen = false;
  }
  ngOnInit(): void {
    this.route.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateActiveRoute();
      }
    });
    // Call updateActiveRoute initially to set the active route on component initialization
    this.updateActiveRoute();
  }

  updateActiveRoute() {
    // Get the current active route
    const currentRoute = this.route.url.split('/')[1]; // Assuming your routes are like '/admin', '/customer', etc.
    this.activeRoute = currentRoute;
  }

}
