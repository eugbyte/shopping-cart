import { Component, OnInit, Input } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';
import { IItem } from 'src/app/models/Item';
import * as lodash from 'lodash';
import { StringStorage } from 'src/StringStorage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit {

  private ITEMS: IItem[] = [];
  private filteredItems: IItem[] = [];
  public itemsToDisplay: IItem[] = [];

  private itemService: ItemService;
  private router: Router;

  @Input() role?: string;

  TABLE_CSS = StringStorage.TABLE_CSS;

  constructor(itemService: ItemService, router: Router) {
    this.itemService = itemService;
    this.router = router;
    this.role = this.role ?? StringStorage.ROLE_CUSTOMER;
   }

  ngOnInit(): void {
    this.itemService.getAllItems().subscribe(
      items => {
        this.ITEMS = items;
        this.filteredItems = lodash.cloneDeep(items);
        this.itemsToDisplay = lodash.cloneDeep(items);
      },
      error => console.log(error));
  }

  onUpdate(itemId: number): void {
    this.router.navigate(['shopOwner', 'manage', itemId]);
  }



}
