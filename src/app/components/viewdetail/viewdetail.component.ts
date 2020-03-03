import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Label {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-viewdetail',
  templateUrl: './viewdetail.component.html',
  styleUrls: ['./viewdetail.component.scss']
})
export class ViewdetailComponent implements OnInit {

  res_label: any
  selectedName: string;

  displayedColumns = ['caseName', 'imageSrc'];
  dataSource: any;
  caseId: string;
  grad: any;
  condition:boolean;

  labels: Label[] = [
    { value: 'Symphysis-Parasymphysis-0', viewValue: 'Symphysis-Parasymphysis' },
    { value: 'Lt. Condyle-1', viewValue: 'Lt. Condyle' },
    { value: 'Rt. Body-2', viewValue: 'Rt. Body' }
  ];

 // labels: Label[] = this.res_label;

  constructor(
    private router: Router,
    private aRoute: ActivatedRoute,
    private http: HttpClient) {
    //Object.assign(this, { single });
    // console.log(this)
  }

  async ngOnInit() {
    this.aRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.http.get('http://localhost:5000/users/get_percent/' + paramMap.get('caseId')).subscribe((success) => {
        this.dataSource = success;
      });
      this.http.get('http://localhost:5000/users/get_prediction/' + paramMap.get('caseId')).subscribe((success) => {
        this.res_label = success;
        //console.log(success)
      });

      /*this.http.get('http://localhost:5000/users/get_gradcam/' + paramMap.get('caseId')).subscribe((success) => {
        this.grad = success;
        console.log(success)
        });*/

    });

  }

  public chartType: string = 'horizontalBar';

 /* public chartDatasets: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'My First dataset' }
  ];*/

  public chartLabels: Array<any> = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange',];

  public chartColors: Array<any> = [
    {
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

  single: any[];
  view: any[] = [700, 400];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  yAxisLabel: string = 'Prediction';
  showYAxisLabel: boolean = true;
  xAxisLabel: string = 'Percentage';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA','Black','Blue','Pink','Orange']
  };



  onSelect(data): void {
    //console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    //console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    //console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
  
  onNameSelection():boolean{
    //console.log(this.selectedName);
    this.condition = true;
    if (this.condition) {
    const params = new HttpParams().set('name', this.selectedName)
    this.aRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.http.get('http://localhost:5000/users/get_gradcam/' + paramMap.get('caseId'),{params}).subscribe((success) => {
        this.grad = success;
        console.log(success);
        });

    });
    return true;
  } else {
    return false;
   }
  }
  onBack() {
    this.router.navigateByUrl('/table');
  }
}
