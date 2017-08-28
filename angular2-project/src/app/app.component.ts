import { Component } from '@angular/core';

import {
  trigger,
  animate,
  style,
  group,
  state,
  animateChild,
  query,
  stagger,
  transition
} from "@angular/animations";

export const routerTransition = trigger( 'routerTransition', [
  transition( 'welcome <=> register', [
    query(':enter, :leave', style({ position: 'fixed', width: '100%' } ), { optional: true }),
    group([
      query(':enter', [
        style({ transform: 'translate(100%, 100%)' }),
        animate( '0.5s ease-in-out', style({ transform: 'translate(0%, 0%)' })) ], { optional: true }),
      query( ':leave', [
        style({ transform: 'translate(0%, 0%)' }),
        animate( '0.5s ease-in-out', style ({transform: 'translate(-100%, -100%' }))
      ], {optional: true })
    ])
  ]),
  transition( 'register <=> encounters', [
    query(':enter, :leave', style({ position: 'fixed', width: '100%' } ), { optional: true }),
    group([
      query(':enter', [
        style({ transform: 'translate(100%, -100%)' }),
        animate( '.5s ease-in-out', style({ transform: 'translate(0%, 0%)' })) ], { optional: true }),
      query( ':leave', [
        style({ transform: 'translate(0%, 0%)' }),
        animate( '.5s ease-in-out', style ({ transform: 'translate(-100%, 100%)' }))
      ], {optional: true })
    ])
  ]),  transition( 'encounters <=> report', [
    query(':enter, :leave', style({ position: 'fixed', width: '100%' } ), { optional: true }),
    group([
      query(':enter', [
        style({ transform: 'translateX(-100%)'}),
        animate( '0.5s ease-in-out', style({ transform: 'translateX(0%)' })) ], { optional: true }),
      query( ':leave', [
        style({ transform: 'translateX(0%)' }),
        animate( '0.5s ease-in-out', style ({transform: 'translateX(100%)' }))
      ], {optional: true })
    ])
  ]),
  transition( 'report <=> encounter', [
    query(':enter, :leave', style({ position: 'fixed',  } ), { optional: true }),
    group([
      query(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate( '0.5s ease-in-out', style({ transform: 'translateX(0%)' })) ], { optional: true }),
      query( ':leave', [
        style({ transform: 'translateX(0%)' }),
        animate( '0.5s ease-in-out', style ({transform: 'translateX(100%' }))
      ], {optional: true })
    ])
  ]),
    transition( '* <=> notfound', [
    query(':enter, :leave', style({ position: 'fixed', width: '100%' } ), { optional: true }),
    group([
      query(':enter', [
        style({ backgroundColor: 'red',
                transform: 'scale(1.3)' }),
        animate( '0.5s ease-in-out', style({ transform: 'scale(1)' })) ], { optional: true }),
      query( ':leave', [
        style({ backgroundColor: 'red',
                transform: 'scale(1.3)' }),
        animate( '0.5s ease-in-out', style ({transform: 'scale(0)' }))
      ], {optional: true })
    ])
  ])
]);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [ routerTransition ]
})
export class AppComponent {
  getState(outlet) {
    return outlet.activatedRouteData.state;
  }
  title = 'app';
}