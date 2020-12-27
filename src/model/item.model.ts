import { Menu } from './menu.model';


export class Item{
    id: number;
    name: string;
    price: number;
    menu: Menu;
    enabled: boolean;
}