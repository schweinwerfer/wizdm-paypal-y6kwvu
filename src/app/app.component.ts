import { Component, OnInit, forwardRef } from '@angular/core';
import { OnApproveData, OnApproveActions } from './paypal/types/buttons';
import { OnCancelData, OnErrorData } from './paypal/types/buttons';
import { PayPalProcessor, OnApprove, OrderRequest } from './paypal';

@Component({
  selector: 'body',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: { 'class': 'mat-typography' },
  providers: [ { provide: PayPalProcessor, useExisting: forwardRef(() => AppComponent) }]
})
export class AppComponent implements OnApprove { 

  width = 220;
  height = 35;
  shape = 'rect';
  color = 'gold';
  label = 'paypal';
  layout = 'vertical';

  order: OrderRequest = {
    intent: 'CAPTURE', 
    payer: {
      name: {
        given_name: "PayPal",
        surname: "Customer"
      },
      address: {
        address_line_1: '123 ABC Street',
        address_line_2: 'Apt 2',
        admin_area_2: 'San Jose',
        admin_area_1: 'CA',
        postal_code: '95121',
        country_code: 'US'
      },
      email_address: "customer@domain.com",
      phone: {
        phone_type: "MOBILE",
        phone_number: {
          national_number: "14082508100"
        }
      }
    },
    purchase_units: [{
      custom_id: 'wallet10',
      amount: {
        currency_code: 'EUR',
        value: '9.99'
      },
      shipping: {
        address: {
          address_line_1: '2211 N First Street',
          address_line_2: 'Building 17',
          admin_area_2: 'San Jose',
          admin_area_1: 'CA',
          postal_code: '95131',
          country_code: 'US'
        }
      }
    }]
  };

  onApprove(data: OnApproveData, actions: OnApproveActions) {
    
    console.log('Transaction Approved:', data);

    // Captures the trasnaction
    return actions.order.capture().then(details => {

      console.log('Transaction completed by', details);

      // Call your server to handle the transaction
      return Promise.reject('Transaction aborted by the server');
    });
  }

  onCancel(data: OnCancelData) {

    console.log('Transaction Cancelled:', data); 
  }

  onError(data: OnErrorData) { 

    console.log('Transaction Error:', data); 
  }
}
