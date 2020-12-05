import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() id!: number;
  @Output() add = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    console.log(this.id);
    
  }

  btnClick(e: Event) {
    this.add.emit({
      id: this.id,
    })
  }

}
