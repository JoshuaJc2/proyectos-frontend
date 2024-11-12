/* REQUERIMIENTO 5. Implementar modelo Invoice */

import { Item } from "./item";

export class Invoice{
    invoice_id : number = 0;
    created_at : Date = new Date();
    items : Item[] = [];
    rfc : String = '';
    subtotal : number = 0;
    taxes : number = 0;
    total : number = 0;
}