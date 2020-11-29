import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'HW30';
  public webApp = 'Angular';

  changeAppTitle (event: any) {
    this.webApp = this.webApp === 'Angular' ? 'React' : 'Angular';
  }
}
