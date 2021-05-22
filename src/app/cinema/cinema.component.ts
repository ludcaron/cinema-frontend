import { Component, OnInit } from '@angular/core';
import { CinemaService } from '../services/cinema.service';

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit {

  public villes : any;
  public cinemas: any;
  public salles: any;
  public currentVille: any;
  public currentCinema: any;

  constructor(private cinemaService: CinemaService) { }

  ngOnInit(): void {
    this.cinemaService.getVilles().subscribe(data=>{
      this.villes = data;
    }, err=>{
      console.log(err);
    })
  }

  onGetCinemas(v: any) {
    this.currentVille = v;
    this.cinemaService.getCinema(v).subscribe((data: any)=>{
      this.cinemas = data;
    },(err: any)=>{
      console.log(err);
    });
  }

  onGetSalles(c: any) {
    this.currentCinema = c;
    this.cinemaService.getSalles(c).subscribe((data: any)=>{
      this.salles = data;
    },(err: any)=>{
      console.log(err);
    });
  }
}
