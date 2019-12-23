import { animate, state, style, transition, trigger } from '@angular/animations';

export const sideNavAnimation = trigger('openCloseSidenav', [
  // ...
  state('open', style({
    width: '260px',
  })),
  state('closed', style({
    width: '65px',
  })),
  transition('open <=> closed', [
    animate('0.2s')
  ])
]);

export const sideNavContainerAnimation = trigger('openCloseSidenavContent', [
  state('open', style({
    'margin-left': '261px',
  })),
  state('closed', style({
    'margin-left': '66px',
  })),
  transition('open <=> closed', [
    animate('0.2s')
  ])
]);
