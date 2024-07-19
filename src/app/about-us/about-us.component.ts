import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PokemonService } from '../pokemon.service';
import { DetailDialogComponent } from '../detail-dialog/detail-dialog.component';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  allPokemons: any[] = [];
  displayedColumns: string[] = ['name', 'actions'];

  constructor(private pokemonService: PokemonService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.pokemonService.getPokemons().subscribe(data => {
      this.allPokemons = data.results;
    });
  }

  viewDetails(url: string): void {
    const id = this.extractIdFromUrl(url);
    this.pokemonService.getPokemonDetails(id).subscribe(data => {
      this.dialog.open(DetailDialogComponent, {
        width: '250px',
        data: data
      });
    });
  }

  extractIdFromUrl(url: string): number {
    const parts = url.split('/');
    return +parts[parts.length - 2];
  }
}
