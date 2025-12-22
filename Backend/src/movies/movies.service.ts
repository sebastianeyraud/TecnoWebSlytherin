import { Injectable } from '@nestjs/common';

@Injectable()
export class MoviesService {
  private movies = [
    {
    id: 1,
    title: 'Harry Potter and the Prisoner of Azkaban',
    image: 'https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p34483_p_v8_bd.jpg',
    date: '4 de Junio de 2004',
    genre: 'Fantasía, Aventura',
    duration: '142 minutos',
    rating: 'PG',
    description: 'Harry Potter descubre que un peligroso prisionero, Sirius Black, ha escapado de Azkaban. A medida que el misterio crece, Harry enfrenta nuevas amenazas, viaja en el tiempo y descubre verdades que cambiarán todo lo que creía saber.'
    },
    {
    id: 2,
    title: 'Chainsaw Man: Reze Arc',
    image: 'https://muvix.cl/CDN/media/entity/get/FilmPosterGraphic/HO00000777?referenceScheme=HeadOffice&allowPlaceHolder=true',
    date: '23 de octubre de 2025',
    genre: 'Acción, Fantasía, Anime',
    duration: '100 minutos',
    rating: 'R',
    description: 'Denji enfrenta a Reze en un arco explosivo lleno de acción y emociones mientras secretos del pasado salen a la luz.'
    },
    {
      id: 3,
      title: 'Spiderman 3',
      image: 'https://m.media-amazon.com/images/I/A10tF8xUYGL._AC_UF1000,1000_QL80_.jpg',
      date: '3 de mayo de 2007',
      genre: 'Acción, Superhéroes',
      duration: '144 minutos',
      rating: 'PG-13',
      description: 'Peter Parker debe enfrentar las consecuencias de su identidad revelada mientras un nuevo enemigo surge desde las sombras.'
    },
    {
      id: 4,
      title: 'Scream',
      image: 'https://play-lh.googleusercontent.com/skArSY8m4e4g3ggAR8gmGobZ_Gl8cd1qLlmrUSX9WzbcFkvxeLnQVi97SJGEojt_kRbSbFynQYdCApKlqg',
      date: '8 de enero de 1998',
      genre: 'Terror, Suspenso',
      duration: '114 minutos',
      rating: 'R',
      description: 'Ghostface regresa con un nuevo juego mortal mientras una nueva generación lucha por sobrevivir.'
    },
    {
      id: 5,
      title: 'Scary Movie',
      image: 'https://es.web.img3.acsta.net/pictures/14/03/06/09/44/283111.jpg',
      date: '16 de noviembre 2000',
      genre: 'Comedia, Parodia',
      duration: '88 minutos',
      rating: 'PG-13',
      description: 'La clásica parodia de terror vuelve con nuevas bromas, referencias modernas y el humor absurdo que la caracteriza.'
    }
  ];

  findAll() {
    return this.movies;
  }

  findFeatured() {
    return this.movies[0];
  }
}
