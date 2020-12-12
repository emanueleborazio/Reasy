import { Menu } from './menu.model';

export class Store{
    id: number;
    name: string;
    city: string;
    street: string;
    occupancy: number;
    qrcode: string;
    menu: Menu;
}