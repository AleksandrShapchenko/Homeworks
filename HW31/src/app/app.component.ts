import { Component} from '@angular/core';
import { Products } from './core/data/products';
import { Product } from './core/models/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  products: Product[] = Products.slice();

  constructor() {

  }

  ngOnInit() {
  }

  addProduct(e: any) {
    console.log('id:', e.id);
  }
}
