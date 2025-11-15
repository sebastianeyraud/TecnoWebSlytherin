import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Movie {
  id: number;
  title: string;
  image: string;
  date: string;
  genre: string;
  duration: string;
}

interface Promotion {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  buttonText: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  featuredMovie = {
    title: 'Wicked',
    genre: 'Musical',
    rating: 'Fantasia',
    duration: '165 minutos',
    description: 'Un pequeño de texto para complementar, sería como la descripción que pueo o ofreá nota, expondre algunas que te mostraron las sinópsis de las nuevas cosas. Y que tengan un limite. Tipo las 5 últimas nuevas cosas yo sean promoción o estrenos',
    date: '13 de Noviembre de 2025',
    image: 'https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=1200&h=600&fit=crop'
  };

  movies: Movie[] = [
    {
      id: 1,
      title: 'Wicked',
      image: 'https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=300&h=450&fit=crop',
      date: '13 de Noviembre de 2025',
      genre: 'Musical - Fantasia Drama',
      duration: '162 minutos'
    },
    {
      id: 2,
      title: 'Chainsaw Man: Reze Arc',
      image: 'https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=300&h=450&fit=crop',
      date: '23 de Octubre de 2025',
      genre: 'Acción-Drama',
      duration: '100 minutos'
    },
    {
      id: 3,
      title: 'Spider-Man 3',
      image: 'https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=300&h=450&fit=crop',
      date: '3 de Mayo de 2007',
      genre: 'Superheroes - Acción',
      duration: '144 minutos'
    },
    {
      id: 4,
      title: 'Scream',
      image: 'https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=300&h=450&fit=crop',
      date: '8 de Enero de 1998',
      genre: 'Terror',
      duration: '111 minutos'
    },
        {
      id: 5,
      title: 'Cowboy Bebop: La pelicula',
      image: 'https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=300&h=450&fit=crop',
      date: '1 de Septiembre de 2001',
      genre: 'Terror',
      duration: '115 minutos'
    },

  ];

  promotions: Promotion[] = [
    {
      id: 1,
      title: 'Green & Pink Sweetly Reunited',
      subtitle: '',
      description: 'Order our Strawberry Sorcery Gourmet Popcorn when you see WICKED: FOR GOOD, opening 11/10. Enjoy the bewitching blend of green mint pink popcorn, bursting with sweet strawberry taste.',
      image: 'https://images.unsplash.com/photo-1585647347384-2593bc35786b?w=400&h=300&fit=crop',
      buttonText: 'Añadir al carrito'
    }
  ];

  memberPromotions: Promotion[] = [
    {
      id: 1,
      title: 'Truth on Trial',
      subtitle: 'AMC STUBS MEMBER EXCLUSIVE',
      description: 'Register now and get 8000 AMC STUBBS points. See NUPEMBER 11/6-11/9 to receive 500 AMC Stubbs® Bonus Points. Dive into one of Venice history\'s darkest crimes.',
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

  currentMovieIndex = 0;
  currentPromotionIndex = 0;
  currentMemberPromotionIndex = 0;

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