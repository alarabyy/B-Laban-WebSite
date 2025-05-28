import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../../service/loader.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
    standalone: true,  // لازم تكون هنا
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
  imports : [CommonModule],
})
export class LoaderComponent implements OnInit {

  loading: boolean = false;

  constructor(private _loader: LoaderService) {}

  ngOnInit(): void {
    this._loader.isLoading.subscribe(value => this.loading = value);
  }
}
