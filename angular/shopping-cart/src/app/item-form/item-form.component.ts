import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ItemService } from '../services/item.service';
import { Item, IItem } from '../models/Item';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent implements OnInit {

  itemForm: FormGroup;
  private fb: FormBuilder;
  private itemService: ItemService;
  private route: ActivatedRoute;

  responseMessages: string[] = [];

  constructor(fb: FormBuilder, itemService: ItemService, route: ActivatedRoute) {
    this.fb = fb;
    this.itemService = itemService;
    this.route = route;
   }

  ngOnInit(): void {
    this.itemForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      price: ['', Validators.required],
    });

    let itemId: number = +this.route.snapshot.paramMap.get('id') ?? 0;
    this.id.setValue(itemId);
    if (itemId) {
      this.itemService.getItem(itemId).subscribe(
        item => {
          this.id.setValue(item.id);
          this.name.setValue(item.name);
          this.price.setValue(item.price);
        },
        error => console.log(error) );
    }
  }

  get id(): FormControl { return this.itemForm.get("id") as FormControl; }
  get name(): FormControl { return this.itemForm.get("name") as FormControl; }
  get price(): FormControl { return this.itemForm.get("price") as FormControl; }

  onSubmit(): void {
    let item: IItem = new Item();
    item.id = this.id.value;
    item.name = this.name.value;
    item.price = this.price.value;   

    if (item.id === 0)
      this.createItem(item);
    else
      this.updateItem(item);
  }

  createItem(item: IItem): void {
    this.itemService.createItem(item).subscribe(
      res => {
        console.log(res);
        this.responseMessages.push(res.body.name + " created");
      },
      (error: HttpErrorResponse) => {
        console.log(error.error);
        this.responseMessages.push(error.error);
      });
  }

  updateItem(item: IItem): void {
    this.itemService.updateItem(item).subscribe(
      res => {
        console.log(res);
        this.responseMessages.push(res.body.name + " updated");
      },
      (error: HttpErrorResponse) => {
        console.log(error.error);
        this.responseMessages.push(error.error);
      });
  }

}
