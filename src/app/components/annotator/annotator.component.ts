import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as paper from 'paper';

@Component({
  selector: 'app-annotator',
  templateUrl: './annotator.component.html',
  styleUrls: ['./annotator.component.scss']
})
export class AnnotatorComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas', { static: true }) canvasElement: ElementRef;

  scope: paper.PaperScope;
  userProject: paper.Project;
  brushTool: paper.Tool;
  activePath: paper.Path;
  backgroudLayer: paper.Layer;
  drawLayer: paper.Layer;
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.scope = new paper.PaperScope();
      this.scope.setup(this.canvasElement.nativeElement);
      this.scope.view.element.setAttribute('width', '600')
      this.scope.view.element.setAttribute('height', '400')
      this.userProject = this.scope.project;
      this.backgroudLayer = new paper.Layer();
      this.drawLayer = new paper.Layer();
      this.userProject.addLayer(this.backgroudLayer);
      setTimeout(() => { this.initBackground(); }, 500);
      this.userProject.addLayer(this.drawLayer);
      this.drawLayer.activate();
      this.initTools();
    }, 500);
  }

  initBackground() {
    const canvasEl = this.canvasElement.nativeElement;
    console.log(canvasEl);
    const imageEl = new Image();
    imageEl.src = 'assets/images/594915.jpg';

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

  initTools() {
    this.brushTool = new paper.Tool();

    this.brushTool.minDistance = 1.0;
    this.brushTool.onMouseDown = (event: paper.ToolEvent) => {
      this.activePath = new paper.Path();

      this.activePath.strokeColor = new paper.Color('#ff0000');
      this.activePath.strokeWidth = 3;
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
}
