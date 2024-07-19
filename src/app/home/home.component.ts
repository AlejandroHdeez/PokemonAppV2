import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PokemonService } from '../pokemon.service';
import { DetailDialogComponent } from '../detail-dialog/detail-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  searchForm: FormGroup;
  allPokemons: any[] = [];
  filteredPokemons: any[] = [];
  noResults: boolean = false;

  constructor(
    private fb: FormBuilder,
    private pokemonService: PokemonService,
    public dialog: MatDialog
  ) {
    this.searchForm = this.fb.group({
      search: ['']
    });
  }

  ngOnInit(): void {
    this.pokemonService.getPokemons().subscribe(data => {
      this.allPokemons = data.results;
    });
  }

  onSubmit(): void {
    const searchValue = this.searchForm.get('search')?.value.toLowerCase();
    this.filteredPokemons = this.allPokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchValue)
    );
    this.noResults = this.filteredPokemons.length === 0;
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
