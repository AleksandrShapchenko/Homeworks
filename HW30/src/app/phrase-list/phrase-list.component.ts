import { Component, OnInit } from '@angular/core';
import { phrases as PHRASES } from '../core/data/phrases';
import { Phrase } from '../core/models/phrase';

@Component({
  selector: 'app-phrase-list',
  templateUrl: './phrase-list.component.html',
  styleUrls: ['./phrase-list.component.scss']
})
export class PhraseListComponent implements OnInit {
  phrases: Phrase[] = PHRASES.slice();
  currentValue!: string;
  currentLanguage!: string;

  constructor() {}

  ngOnInit(): void {
  
  }

  addPhrase(): void {
    this.phrases.push({ value: this.currentValue, language: this.currentLanguage})
  }

}
