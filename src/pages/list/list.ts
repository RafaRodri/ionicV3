import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  private url: string = 'http://169.254.131.10:8080/rest/api_restful/public/index.php/'

  selectedItem: any;
  icons: string[];
  user = {
    img: "",
    name: "",
    email: ""
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              public http: Http,
              public camera: Camera) {
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

  getPhoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.user.img = base64Image;

    }, (err) => {
      console.log(err);
    });
  }

}
