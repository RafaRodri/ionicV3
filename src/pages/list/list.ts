import { Component } from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  private url: string = 'http://restful:8080/index.php/'

  selectedItem: any;
  icons: string[];
  user = {
    //imagePath: "",
    name: "",
    email: ""
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              public http: Http) {
  }

  saveUser(user){
    //console.log(dream);

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let options = new RequestOptions({ headers: headers });

    this.http.post(`${this.url}v2/user`, user, options)
      .map(res => res.json())
      .subscribe(data => {
          let toast = this.toastCtrl.create({
            message: `${data[0].name} cadastrado`,//'User was added successfully', //data.msg
            duration: 3000
          });
          toast.present();
        });
  }

}
