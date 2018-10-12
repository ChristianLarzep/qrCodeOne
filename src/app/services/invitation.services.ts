import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Invitation } from '../models/invitation';

@Injectable()
export class InvitationService{
  public url: string;
  public deezerAPI : string;

  constructor( public http:Http){
    this.deezerAPI = "/invitationsAPI/"; //proxy en ionic.config.json, ahi esta la url
  }

  public sendInvitation(invitation: Invitation){
    let params = JSON.stringify(invitation);
    let headers = new Headers({'Content-Type':  'application/json'});
    return this.http.post(this.deezerAPI+'invitation', params, {headers: headers})
                          .map(res => res);
  }

getInvitations(){
  return this.http.get(this.deezerAPI+'invitation')
                  .map(res => res.json())
}

}
