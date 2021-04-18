import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AppService } from './app.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  brand = new FormControl();
  year = new FormControl();
  segment = new FormControl();
  engine = new FormControl();
  brandList: any = [];
  yearList: any = [];
  segmentList: any = [];
  engineList: any = [];
  filteredData: string[] = [];
  carDetails: any = [];
  totalCarStockCount: number = 0;

  constructor(private appService: AppService) {
    this.appService
      .getDetails()
      .subscribe((res) => ((this.carDetails = res.body), this.updateList()));
  }

  engineFilterList$ = new Observable((sub) => {
    this.engineList = [
      ...new Set(this.filteredData.map((data: any) => data.engine_type_key)),
    ];
  });

  yearFilterList$ = new Observable((sub) => {
    this.yearList = [
      ...new Set(this.filteredData.map((data: any) => data.year)),
    ];
  });

  segmentFilterList$ = new Observable((sub) => {
    this.segmentList = [
      ...new Set(this.filteredData.map((data: any) => data.segment_key)),
    ];
  });

  brandFilterList$ = new Observable((sub) => {
    this.brandList = [
      ...new Set(this.filteredData.map((data: any) => data.brand_key)),
    ];
  });

  filter$ = new Observable((sub) => {
    console.log('filter');
    var tempArr: string[] = [];
    if (this.brand.value === null || this.brand.value.length === 0) {
      tempArr = this.carDetails;
    } else {
      this.brand.value.map((res: any) => {
        this.carDetails.filter((data: any) => {
          if (data.brand_key === res) {
            tempArr.push(data);
          }
        });
      });
    }

    this.filteredData = tempArr;

    if (this.year.value === null || this.year.value.length === 0) {
      console.log('no year filter');
    } else {
      tempArr = [];
      this.year.value.map((res: any) => {
        this.filteredData.filter((data: any) => {
          if (data.year === res) {
            tempArr.push(data);
          }
        });
      });
    }
    this.filteredData = tempArr;

    if (this.segment.value === null || this.segment.value.length === 0) {
      console.log('no segment filter');
    } else {
      tempArr = [];
      this.segment.value.map((res: any) => {
        this.filteredData.filter((data: any) => {
          if (data.segment_key === res) {
            tempArr.push(data);
          }
        });
      });
    }
    this.filteredData = tempArr;

    if (this.engine.value === null || this.engine.value.length === 0) {
      console.log('no engine filter');
    } else {
      tempArr = [];
      this.engine.value.map((res: any) => {
        this.filteredData.filter((data: any) => {
          if (data.engine_type_key === res) {
            tempArr.push(data);
          }
        });
      });
    }
    this.filteredData = tempArr;
    tempArr = [];

    if (this.filteredData.length === 0) {
      console.log('Null filtered Data');
      this.filteredData = this.carDetails;
    }

    console.log('final data');
    console.log(this.filteredData);
  });

  updateList() {
    this.brand.reset();
    this.year.reset();
    this.segment.reset();
    this.engine.reset();
    this.totalCarStockCount = 0;
    this.filteredData = [];
    this.brandList = [
      ...new Set(this.carDetails.map((data: any) => data.brand_key)),
    ];
    this.engineList = [
      ...new Set(this.carDetails.map((data: any) => data.engine_type_key)),
    ];
    this.segmentList = [
      ...new Set(this.carDetails.map((data: any) => data.segment_key)),
    ];

    this.yearList = [...new Set(this.carDetails.map((data: any) => data.year))];
  }

  onBrandChange() {
    this.filter$.subscribe();
    this.yearFilterList$.subscribe();
    this.segmentFilterList$.subscribe();
    this.engineFilterList$.subscribe();
  }

  onYearChange() {
    this.filter$.subscribe();
    this.brandFilterList$.subscribe();
    this.segmentFilterList$.subscribe();
    this.engineFilterList$.subscribe();
  }

  onSegmentChange() {
    this.filter$.subscribe();
    this.yearFilterList$.subscribe();
    this.brandFilterList$.subscribe();
    this.engineFilterList$.subscribe();
  }

  onEngineChange() {
    this.filter$.subscribe();
    this.yearFilterList$.subscribe();
    this.segmentFilterList$.subscribe();
    this.brandFilterList$.subscribe();
  }

  totalCarStock() {
    if (this.filteredData === null || this.filteredData.length === 0) {
      this.filter$.subscribe();
    }
    this.totalCarStockCount = 0;
    this.filteredData.map((res: any) => {
      this.totalCarStockCount = this.totalCarStockCount + res.car_stock;
    });
  }
}
