import { enableProdMode }         from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/do';
import { Observable }             from 'rxjs/Observable';

import { AppModule }              from './app/app.module';
import { environment }            from './environments/environment';

const debuggerOn = true;

Observable.prototype.debug = function ( message: string ) {
  return this.do(
    nextValue => debuggerOn && console.log( message, nextValue ),
    error => debuggerOn && console.error( message, error ),
    () => debuggerOn && console.log( 'Observable completed = ', message )
  );
};

declare module 'rxjs/Observable' {
  interface Observable<T> {
    debug: ( ...any ) => Observable<T>;
  }
}


if (environment.production) {
  enableProdMode();
  this.debuggerOn = false;
}



platformBrowserDynamic().bootstrapModule(AppModule);
