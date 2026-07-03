import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Navbar } from '../../shared/navbar/navbar';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Navbar, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}