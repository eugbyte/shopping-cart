import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-items-shop-owner',
  templateUrl: './items-shop-owner.component.html',
  styleUrls: ['./items-shop-owner.component.css']
})
export class ItemsShopOwnerComponent implements OnInit {

  private router: Router;
  constructor(router: Router) { 
    this.router = router;
  }

  ngOnInit(): void {
  }

  onCreate(): void {
    this.router.navigate(['shopOwner', 'manage']);
  }

}
