import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http'

/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {

  public user: any = {};

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http: Http) {

    let url = this.navParams.get('api_url');
    let user_id = this.navParams.get('dream_id');

    this.http.get(`${url}v1/user/${user_id}`)
      .map(res => res.json()[0])
      .subscribe(data => {
        console.log(data);
        this.user = data;
      })
  }

}
