import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesService, Movie } from '../../services/movies.service';

interface Promotion {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  buttonText: string;
}

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  movies: Movie[] = [];

  promotions: Promotion[] = [
    {
      id: 1,
      title: 'Green & Pink Sweetly Reunited',
      subtitle: '',
      description: 'Order our Strawberry Sorcery Gourmet Popcorn when you see WICKED: FOR GOOD, opening 11/10.',
      image: 'https://images.unsplash.com/photo-1585647347384-2593bc35786b?w=400&h=300&fit=crop',
      buttonText: 'Añadir al carrito'
    }
  ];

  memberPromotions: Promotion[] = [
    {
      id: 1,
      title: 'Truth on Trial',
      subtitle: 'AMC STUBS MEMBER EXCLUSIVE',
      description: 'Register now and get 8000 AMC STUBBS points...',
      image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=300&fit=crop',
      buttonText: 'Detalles'
    },
    {
      id: 2,
      title: 'EARN DOUBLE BONUS POINTS',
      subtitle: 'AMC® MEMBER EXCLUSIVE',
      description: 'GET TICKETS NOW FOR 11/6-11/9',
      image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=300&fit=crop',
      buttonText: 'Detalles'
    }
  ];

  // --- ÍNDICES PARA LOS CARRUSELES ---
  featuredIndex = 0;
  currentMovieIndex = 0;
  currentPromotionIndex = 0;
  currentMemberPromotionIndex = 0;

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    // Cargar cartelera del backend
    this.moviesService.getMovies().subscribe(data => {
      this.movies = data;
    });
  }

  // --- CARRUSEL SUPERIOR (HERO) ---
  get featuredMovieDynamic(): Movie {
    return this.movies[this.featuredIndex];
  }

  previousFeatured(): void {
    if (this.featuredIndex > 0) {
      this.featuredIndex--;
    }
  }

  nextFeatured(): void {
    if (this.featuredIndex < this.movies.length - 1) {
      this.featuredIndex++;
    }
  }

  // --- CARRUSEL CARTELERA ---
  previousMovies(): void {
    if (this.currentMovieIndex > 0) {
      this.currentMovieIndex--;
    }
  }

  nextMovies(): void {
    if (this.currentMovieIndex < this.movies.length - 4) {
      this.currentMovieIndex++;
    }
  }

  // --- PROMOCIONES ---
  previousPromotions(): void {
    if (this.currentPromotionIndex > 0) {
      this.currentPromotionIndex--;
    }
  }

  nextPromotions(): void {
    if (this.currentPromotionIndex < this.promotions.length - 1) {
      this.currentPromotionIndex++;
    }
  }

  // --- PROMOCIONES CON MEMBRESÍA ---
  previousMemberPromotions(): void {
    if (this.currentMemberPromotionIndex > 0) {
      this.currentMemberPromotionIndex--;
    }
  }

  nextMemberPromotions(): void {
    if (this.currentMemberPromotionIndex < this.memberPromotions.length - 2) {
      this.currentMemberPromotionIndex++;
    }
  }

  // --- VISTAS POR CARRUSEL ---
  getVisibleMovies(): Movie[] {
    return this.movies.slice(this.currentMovieIndex, this.currentMovieIndex + 4);
  }

  getVisiblePromotions(): Promotion[] {
    return this.promotions.slice(this.currentPromotionIndex, this.currentPromotionIndex + 1);
  }

  getVisibleMemberPromotions(): Promotion[] {
    return this.memberPromotions.slice(this.currentMemberPromotionIndex, this.currentMemberPromotionIndex + 2);
  }
}
