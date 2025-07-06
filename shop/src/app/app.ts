import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav } from './nav/nav';
import { CategoryComponent } from './category/category';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Nav, CategoryComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected title = 'shop';
}
