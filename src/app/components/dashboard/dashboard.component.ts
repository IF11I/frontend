import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

/**
 * The default component shown by Angular's router.
 *
 * @author Nils Weber
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private title: Title) { }


  /**
   * Lifecycle-Hook: On Init
   */
  ngOnInit() {
    this.title.setTitle('IT-Verwaltung');
  }

}
