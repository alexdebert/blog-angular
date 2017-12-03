import { Component, Input } from '@angular/core';

import { headerTitle, githubUrl } from '../../shared/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Input() title = headerTitle;
  @Input() githubUrl = githubUrl;

}
