import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-response-messages',
  templateUrl: './response-messages.component.html',
  styleUrls: ['./response-messages.component.css']
})
export class ResponseMessagesComponent implements OnInit {
  @Input() responseMessages?: string[];
  @Input() errorMessages?: string[];

  constructor() { 
    this.responseMessages = this.responseMessages ?? [];
    this.errorMessages = this.errorMessages ?? [];
  }


  ngOnInit(): void {
    
  }

}
