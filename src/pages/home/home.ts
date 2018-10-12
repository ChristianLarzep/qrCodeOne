import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Invitation } from '../../app/models/invitation';
import { InvitationService } from '../../app/services/invitation.services';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [InvitationService]
})

export class HomePage{
  public accepted = null;
  public qrData = null;
  public createdCode = null;
  public scannedCode = null;
  public invitation: Invitation;
  //public invit:any;

  constructor(
    private barcodeScanner: BarcodeScanner,
    private sharingVar: SocialSharing,
    private _invitationService: InvitationService
    ) {
     //this.invit = [];
     var fecha = new Date();
     this.invitation = new Invitation('','','','',fecha.toDateString());
  }

  ionViewDidLoad(){
    this._invitationService.getInvitations().subscribe(invitation => {
      invitation.map( inv => {
        //this.invit.push(inv);
        console.log(inv);
      });
    });
  }

    createInvitation(){
    console.log(this.invitation);
    this._invitationService.sendInvitation(this.invitation).subscribe(
      response => {
        console.log(response);
        //this.invit.push(response);
        this.createCode(response);
        this.invitation.name ="";
        this.invitation.lastname = "";
        this.invitation.description = "";
      },
      error => {
        var errorMessage =<any>error;

        if(errorMessage != null){
          console.log("Error: ",error);
        }
      }
    );
  }

  createCode(data) {
    this.createdCode = data._body;//hashCode
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
