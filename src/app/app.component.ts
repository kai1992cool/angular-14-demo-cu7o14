import { CommonModule } from '@angular/common';
import { Component, NgZone } from '@angular/core';
import { RouterModule } from '@angular/router';

/**
 * https://javascript.plainenglish.io/the-new-features-of-angular-v14-851995870f59
 *
 * Planning on joining Medium? Membership is $5/month and gives unlimited access
 * to all stories on Medium. Use my referral link:
 * https://vkagklis.medium.com/membership
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <input >
    <br />
    <button (click)="print()">Print</button>
  `,
})
export class AppComponent {
  constructor(private ngZone: NgZone) {}

  print() {
    this.ngZone.runOutsideAngular(() => {
      let content = `
          <html>
            <head>
              <title>New Tab</title>
            </head>
            <body onload="window.print();" onbeforeunload="return myFunction()">
              Content
            </body>
            <script>
              function myFunction() {
                  return "Leaving this page will reset the wizard";
              };
            </script>
          </html>
        `;

      // Create a Blob from the HTML content
      let blob = new Blob([content], { type: 'text/html' });

      // Create a URL for the Blob
      let url = URL.createObjectURL(blob);

      // Open a new tab with the created URL
      window.open(url, '_blank');

      // Release the URL object after the new tab is opened
      URL.revokeObjectURL(url);
    });
  }
}
