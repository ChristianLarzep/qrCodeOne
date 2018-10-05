import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Platform } from 'ionic-angular';
import { File as myfile  } from '@ionic-native/file';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  accepted = null;
  qrData = null;
  createdCode = null;
  scannedCode = null;

  constructor(
    private barcodeScanner: BarcodeScanner,
    private sharingVar: SocialSharing
    ) {
  }

  createCode() {
    this.createdCode = this.qrData;
  }

  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.scannedCode = barcodeData.text;
      let splited = this.scannedCode.split("/", 4);
      let thename = splited[0];
      //Validacion de prueba pedorra
      this.accepted = thename === "Christian" ? true : false;
      if(thename === "Christian"){
        this.accepted = true;
      }else{
        this.accepted = false;
      }
    }, (err) => {
        console.log('Error: ', err);
    });
  }

  clean(){
    this.accepted = null;
    this.scannedCode = null;
  }

  otherShare(){
    let x = document.getElementsByClassName('qr');
    let y = x[0].children[0].getAttribute('src');
    var base64 = String(y);
    this.sharingVar.share(null,null/*Subject*/,base64 /*File*/,/*"https://pointdeveloper.com"*/)
    .then(()=>{
        this.createdCode = null;
        alert("Invitacion compartida");
      },
      ()=>{
         alert("Error")
      })

  }
}
