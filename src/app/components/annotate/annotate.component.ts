import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ViewEncapsulation } from '@angular/core';
import * as paper from 'paper';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageComponent } from '../message/message.component';
import { ParsedProperty } from '@angular/compiler';
import { HttpClient } from '@angular/common/http';
import { async } from 'rxjs/internal/scheduler/async';
// import { Post } from './model/post';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';

interface Fracture {
  value: string;
  viewValue: string;
}

interface FractureGroup {
  disabled?: boolean;
  name: string;
  fracture: Fracture[];
}


@Component({
  selector: 'app-annotate',
  templateUrl: './annotate.component.html',
  styleUrls: ['./annotate.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AnnotateComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas', { static: true }) canvasElement: ElementRef;

  scope: paper.PaperScope;
  userProject: paper.Project;
  brushTool: paper.Tool;
  eraseTool: paper.Tool;
  activePath: paper.Path;
  erasePath: paper.Path;
  backgroudLayer: paper.Layer;
  drawLayer: paper.Layer;

  // posts: Observable<Post[]>
  // model: Post = new Post()

  annotate: any;

  Data: any;

  caseId: string;
  selectedName: string;

  constructor(private router: Router, private message: MatSnackBar, private aRoute: ActivatedRoute, private http: HttpClient) { }

  durationInSeconds = 4;

  fractureControl = new FormControl();
  fractureGroups: FractureGroup[] = [
    {
      name: 'Condylar fx',
      fracture: [
        { value: 'Lt. Condylar fx', viewValue: 'Lt. Condylar fx' },
        { value: 'Rt. Condylar fx', viewValue: 'Rt. Condylar fx' }
      ]
    },
    {
      name: 'Coronoid fx',
      fracture: [
        { value: 'Lt. Coronoid fx', viewValue: 'Lt. Coronoid fx' },
        { value: 'Rt. Coronoid fx', viewValue: 'Rt. Coronoid fx' }
      ]
    },
    {
      name: 'Ramus-Angle fx',
      fracture: [
        { value: 'Lt.Ramus-Angle fx', viewValue: 'Lt.Ramus-Angle fx' },
        { value: 'Rt.Ramus-Angle fx', viewValue: 'Rt.Ramus-Angle fx' },
      ]
    },
    {
      name: 'Body fx',
      fracture: [
        { value: 'Lt. Body fx', viewValue: 'Lt. Body fx' },
        { value: 'Rt. Body fx', viewValue: 'Rt. Body fx' },
      ]
    },
    {
      name: 'Center',
      fracture: [
        { value: 'Symphyseal', viewValue: 'Symphyseal' },
        { value: 'Parasymphyseal', viewValue: 'Parasymphyseal' },
      ]
    }
  ];

 /* fractureGroups: FractureGroup[] = [
    {
      name: 'Abnormal',
      fracture: [
        { value: 'Fracture', viewValue: 'Fracture' }
      ]
    },
    {
      name: 'Normal',
      fracture: [
        { value: 'No Fracture', viewValue: 'No Fracture' }
      ]
    } ];*/

  async ngOnInit() {
    this.aRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.http.get('https://cce516e9.ngrok.io/users/get_annotate/' + paramMap.get('caseId')).subscribe((success) => {
        this.annotate = success;
      });
    });

  }

  // private context: CanvasRenderingContext2D;

  ngAfterViewInit() {
    setTimeout(() => {
      this.scope = new paper.PaperScope();
      this.scope.setup(this.canvasElement.nativeElement);
      this.scope.view.element.setAttribute('width', '600');
      this.scope.view.element.setAttribute('height', '400');
      this.userProject = this.scope.project;
      this.backgroudLayer = new paper.Layer();
      this.drawLayer = new paper.Layer();
      this.userProject.addLayer(this.backgroudLayer);
      setTimeout(() => { this.initBackground(); }, 500);
      this.userProject.addLayer(this.drawLayer);
      this.drawLayer.activate();
      this.initTools();
    }, 500);

    // this.context = (this.context = (this.canvasElement.nativeElement as HTMLCanvasElement).getContext('2d'));

  }


  initBackground() {
    const canvasEl = this.canvasElement.nativeElement;
    console.log(canvasEl);
    const imageEl = new Image();
    // imageEl.crossOrigin = '*';  //<-- set here
    imageEl.src = 'https://cce516e9.ngrok.io/' + this.annotate;
   // imageEl.setAttribute('crossorigin', 'anonymous');

    imageEl.onload = (ev: Event) => {
      const scale = Math.min(
        (this.scope.view.size.width / imageEl.width),
        (this.scope.view.size.height / imageEl.height));
      const image = new paper.Raster(imageEl);
      image.scale(scale);
      image.position = new paper.Point(canvasEl.width / 2, canvasEl.height / 2);
      this.backgroudLayer.addChild(image);
    };
  }


  onDelete() {
    this.drawLayer.removeChildren();
  }

  initTools() {
    this.brushTool = new paper.Tool();

    this.brushTool.minDistance = 1.0;
    this.brushTool.onMouseDown = (event: paper.ToolEvent) => {
      this.activePath = new paper.Path();

      this.activePath.strokeColor = new paper.Color('#ff0000');
      this.activePath.strokeWidth = 10;
      this.activePath.opacity = 0.5;
      this.activePath.strokeCap = 'round';
      this.activePath.add(event.point);

    };

    this.brushTool.onMouseDrag = (event: paper.ToolEvent) => {
      if (this.activePath) {
        this.activePath.add(event.point);
        // this.activePath.smooth();
      }
    };
    this.brushTool.onMouseUp = (event: paper.ToolEvent) => {
      if (this.activePath) {
        this.activePath.add(event.point);
        // this.activePath.smooth();
        this.activePath.simplify(1.5);
      }
    };
  }

onBack() {
    this.router.navigateByUrl('/table');
  }

onSubmit() {
    this.message.openFromComponent(MessageComponent, {
      duration: this.durationInSeconds * 1000,
    });
    const raster = this.drawLayer.rasterize(150);
    const output = raster.toDataURL();

    this.aRoute.paramMap.subscribe((paramMap: ParamMap) => {
        this.Data = {ID: paramMap.get('caseId'), Name: this.selectedName, File: output};
        this.http.post('https://cce516e9.ngrok.io/users/upload_annotate', this.Data).pipe(map(res => 'done')).subscribe();
   });
   
    console.log(output);
    console.log(this.selectedName);
}

  onNameSelection() {}



}

