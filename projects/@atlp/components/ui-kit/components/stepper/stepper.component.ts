import { Component, OnInit } from '@angular/core';
import { StepperData } from 'projects/@atlp/components/stepper/interfaces';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {
  stepperData: StepperData[] = [
    {
      icon: 'step1',
      name: 'Booking Confirmed',
      date: '2021-01-13T23: 30: 52.123Z',
      active: false
    },
    {
      icon: 'step2',
      name: 'Departed from ICN',
      date: '2021-01-13T23: 30: 52.123Z',
      active: false
    },
    {
      icon: 'step3',
      name: 'Arrived at AUH',
      date: '2021-01-13T23: 30: 52.123Z',
      active: false
    },
    {
      icon: 'step4',
      name: 'Received From Flight',
      date: '2021-01-13T23: 30: 52.123Z',
      active: false
    },
    {
      icon: 'step5',
      name: 'Document Received',
      date: '2021-01-13T23: 30: 52.123Z',
      active: false
    },
    {
      icon: 'step6',
      name: 'Delivered',
      date: '2021-01-13T23: 30: 52.123Z',
      active: true
    }
  ];
  constructor() {

  }

  ngOnInit(): void {
  }

}
