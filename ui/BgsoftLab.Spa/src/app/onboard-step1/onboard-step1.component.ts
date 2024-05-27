import { Component } from '@angular/core';

@Component({
  selector: 'app-onboard-step1',
  templateUrl: './onboard-step1.component.html',
  styleUrls: ['./onboard-step1.component.css']
})
export class OnboardStep1Component {
 roleOptions = ['.NET Developer', 'Front End Engineer', 'Dev Ops', 'Data Analyst'];
 selectedOption: string | undefined;
}
