import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  accepted = null;
  qrData = null;
  createdCode = null;
  scannedCode = null;

  constructor(private barcodeScanner: BarcodeScanner) { }

  createCode() {
    this.createdCode = this.qrData;
  }

  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.scannedCode = barcodeData.text;
      let splited = this.scannedCode.split("/", 4);
      let thename = splited[0];
      this.accepted = this.thename === "Christian" ? true : false;
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

}
