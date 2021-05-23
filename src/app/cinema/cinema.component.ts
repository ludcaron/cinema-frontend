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
  public currentProjection: any;
  public host: String = this.cinemaService.host;

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
      this.salles._embedded.salles.forEach((salle: any) => {
        this.cinemaService.getProjections(salle).subscribe((data: any)=>{
          salle.projections = data;
        },(err: any)=>{
          console.log(err);
        });
      });
    },(err: any)=>{
      console.log(err);
    });
  }
}
