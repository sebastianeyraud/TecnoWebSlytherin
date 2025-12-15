import { Component } from '@angular/core';

interface Promotion {
  title: string;
  subtitle?: string;
  description: string;
  price?: string;
  imageUrl: string;
  buttonText: string;
}

interface MembershipItem {
  title: string;
  tag?: string;
  description: string;
  price?: string;
  imageUrl: string;
  type: 'dark' | 'light';
  buttonText: string;
}

@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.component.html',
  styleUrls: ['./promociones.component.css']
})
export class PromocionesComponent {

  promociones: Promotion[] = [
    {
      title: "Green & Pink",
      subtitle: "Sweetly Reunited",
      description: "Order our Strawberry Sorcery Gourmet Popcorn when you see WICKED: FOR GOOD, opening 11/20. Enjoy the bewitching blend of green and pink popcorn, bursting with sweet strawberry flavor.",
      imageUrl: "https://placehold.co/300x200/2a5c2a/fff?text=Popcorn+Wicked",
      buttonText: "Añadir al carrito"
    },
    {
      title: "See the Hunt with Thermal Vision",
      description: "Lock in on flavor with THERMAL VISION when you see PREDATOR: BADLANDS at MacGuffins! Made with bold mix of STILL Gin for a dangerously refreshing sip.",
      price: "Precio : $24.000",
      imageUrl: "https://placehold.co/300x200/111/4caf50?text=Thermal+Vision",
      buttonText: "Añadir al carrito"
    },
    {
      title: "Concoct Your Perfect Potion",
      description: "See WICKED: FOR GOOD, opening 11/20, and enjoy one of four AMC-exclusive soda flavors. Drink up Flying Fizz, Magical Bubble, Yellow Brick Brew, or Rainbow Sparkle.",
      price: "Precio : $19.000",
      imageUrl: "https://placehold.co/300x200/purple/fff?text=Potions",
      buttonText: "Añadir al carrito"
    }
  ];

  membershipItems: MembershipItem[] = [
    {
      title: "Truth on Trial",
      tag: "AMC STUBS MEMBER EXCLUSIVE",
      description: "Register now and get tickets to see NUREMBERG 11/6-11/9 to receive double AMC Stubs bonus points. One man faces the minds behind history's darkest crimes.",
      imageUrl: "https://placehold.co/150x220/333/fff?text=Poster",
      type: "dark",
      buttonText: "Obtener"
    },
    {
      title: "Sssip a Fizzy Treat",
      description: "Enjoy a cool blue raspberry ICEE® when you see ZOOTOPIA 2, with early showtimes on 11/25. Upgrade your treat with green apple Pop Rocks for $1.49.",
      price: "Precio : $5.000",
      imageUrl: "https://placehold.co/200x200/87CEEB/fff?text=Zootopia",
      type: "light",
      buttonText: "Añadir al carrito"
    }
  ];
}