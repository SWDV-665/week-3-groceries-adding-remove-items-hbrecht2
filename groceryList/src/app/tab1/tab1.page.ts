import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  title = 'Groceries';
  items = [
    {
      name: "Milk",
      quantity: 2
    },
    {
      name: "Bread",
      quantity: 1
    },
    {
      name: "Eggs",
      quantity: 1
    },
    {
      name: "Chocolate",
      quantity: 4
    }
  ];

  constructor(public toastController: ToastController, public alertController: AlertController) {
  }

  async removeItem(item, index){
    console.log("Removing Item - ", item, index)
    const toast = await this.toastController.create({
      message: 'Removing ' + item.name + ' from grocery list...',
      duration: 2000
    });
    toast.present();

    this.items.splice(index, 1)
  }

  async editItem(item, index){
    console.log("Edit Item - ", item, index)
    const toast = await this.toastController.create({
      message: 'Editing ' + item.name + ' from grocery list...',
      duration: 2000
    });
    toast.present();
    this.presentEditPrompt(item, index);
  }

  addItem(){
    console.log("Item added.");
    this.presentAlertPrompt();
  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Add Item',
      message: 'Please enter item below.',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Item Name'
        },
        {
          name: 'quantity',
          type: 'text',
          placeholder: 'Item Quantity'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (item) => {
            console.log('Confirm Ok', item);
            this.items.push(item);
          }
        }
      ]
    });

    await alert.present();
  }

  async presentEditPrompt(item, index) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Edit Item',
      message: 'Please edit item below.',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Item Name',
          value: item.name
        },
        {
          name: 'quantity',
          type: 'text',
          placeholder: 'Item Quantity',
          value: item.quantity
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Save',
          handler: (item) => {
            console.log('Confirm Ok', item);
            this.items[index] = item
          }
        }
      ]
    });

    await alert.present();
  }}