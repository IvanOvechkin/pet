import {Observable} from 'rxjs';

export interface UserLogPass {
  email: string;
  password: string;
}

export interface UserData {
  logged: boolean;
  hash: string;
}

export abstract class Api {
  abstract Auth(params: UserLogPass): Observable<UserData>;
}
