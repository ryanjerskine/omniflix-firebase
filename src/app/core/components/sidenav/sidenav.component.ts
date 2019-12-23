import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { sideNavAnimation, sideNavContainerAnimation } from './sidenav.animations';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [sideNavAnimation, sideNavContainerAnimation]
})
export class SidenavComponent implements OnInit {
  @Input() displayName: string;
  @Output() signOut = new EventEmitter();
  isOpen: boolean;

  constructor() { }

  ngOnInit() {
    this.isOpen = window.innerWidth > 1000;
  }

  toggle() {
    this.isOpen = !this.isOpen;
    setTimeout(() => window.dispatchEvent(new Event('resize')), 300);
  }

  emitSignOut() {
    this.signOut.emit();
  }
}
