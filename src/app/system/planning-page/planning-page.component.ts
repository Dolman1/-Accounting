import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription, combineLatest, of } from 'rxjs';

import { BillService } from '../shared/services/bill.service';
import { CategoriesService } from '../shared/services/categories.service';
import { EventsService } from '../shared/services/events.service';
import { Bill } from '../shared/models/bill.model';
import { Category } from '../shared/models/category.model';
import { appEvent } from '../shared/models/event.model';


@Component({
  selector: 'app-planning-page',
  templateUrl: './planning-page.component.html',
  styleUrls: ['./planning-page.component.scss']
})
export class PlanningPageComponent implements OnInit, OnDestroy {

  s1!: Subscription;

  bill!: Bill;
  categories: Category[] = [];
  events: appEvent[] = [];

  constructor(private billService: BillService,
              private categoriesService: CategoriesService,
              private eventsService: EventsService) { }

  ngOnInit(): void {
  this.s1 = combineLatest(
      this.billService.getBill(),
      this.categoriesService.getCategories(),
      this.eventsService.getEvents()
    ).subscribe((data: [Bill, Category[], appEvent[]]) => {
      this.bill = data[0];
      this.categories = data[1];
      this.events = data[2];
  });
}


  getCategoryCost(cat: Category): number {
    const catEvents = this.events.filter(e => e.category === cat.id && e.type === 'outcome');
    return catEvents.reduce((total, e) => {
      total += e.amount;
      return total;
    }, 0);
  }

    private getPercent(cat: Category): number {
    const percent = (100 * this.getCategoryCost(cat)) / cat.capacity;
    return percent > 100 ? 100 : percent;
  }

    getCatPercent(cat: Category): string {
    return this.getPercent(cat) + '%';
  }

  ngOnDestroy() {
     if (this.s1) {
       this.s1.unsubscribe();
     }
   }
}












