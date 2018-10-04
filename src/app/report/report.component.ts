import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as jsPDF from 'jspdf'
import { RestapiService } from '../restapi.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  @ViewChild('report') report: ElementRef;
  data;
  constructor(private _restApiService: RestapiService) { }

  ngOnInit() {
    this._restApiService.getOrder().subscribe(data => {
      this.data = data;
    })
  }

  generateReport() {
    var doc = new jsPDF('p','pt','a4');
    let report = this.report.nativeElement;
    //let report = document.getElementById("report").innerHTML;
    console.log(report);
    let specialElementHandlers = {
      '#report': function (element, renderer) {
        return true
      }
    };
    let margins = {
      top: 10,
      bottom: 60,
      left: 40,
      width: 522
    };
    doc.fromHTML(
      report.innerHTML, // HTML string or DOM elem ref.
      margins.top, // x coord
      margins.left, {// y coord
        'width': margins.width, // max width of content on PDF
        'elementHandlers': specialElementHandlers
      }, (bla) => {
        doc.save('report.pdf');
      }, { top: 0, left: 0, right: 0, bottom: 20 });
  }

}
