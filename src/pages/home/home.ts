import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http'
import { UserPage } from '../user/user';

import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private url: string = 'http://restful:8080/index.php/'
  public users: Array<{}>;

  private page: number = 1;
  private limit: number = 20;

  constructor(public navCtrl: NavController,
              public http: Http) {

    this.http.get(this.url+`v2/users?page=${this.page}&limit=${this.limit}`)
      .map(res => res.json())
      .pipe(map(res => res.data))
      .subscribe(data => {
        //console.log(data);
        this.users = data;
      })

  }

  itemSelected(id: number){
    this.navCtrl.push(UserPage, {
      'dream_id': id,
      'api_url': this.url
    })
  }

}
