import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

/**
 * The application's root component.
 *
 * @author Nils Weber
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private get title() { return this.titleService.getTitle(); }

  constructor(private titleService: Title) { }
}
