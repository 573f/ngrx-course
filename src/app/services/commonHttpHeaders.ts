import { RequestOptionsArgs, Headers } from '@angular/http';

export function commonHttpHeaders ( userId: number ): RequestOptionsArgs {
  const headers: Headers = new Headers();
  headers.append( 'userid', userId.toString( 10 ) );
  headers.append( 'Content-Type', 'application/json; charset=utf-8' );

  return { headers: headers };
}
