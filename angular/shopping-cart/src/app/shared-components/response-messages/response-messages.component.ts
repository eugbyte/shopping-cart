import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-response-messages',
  templateUrl: './response-messages.component.html',
  styleUrls: ['./response-messages.component.css']
})
export class ResponseMessagesComponent implements OnInit {
  @Input() responseMessages: string[];

  constructor() { 
    this.responseMessages = this.responseMessages ?? [];
  }


  ngOnInit(): void {
    
  }

}
