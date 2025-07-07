export class ProductModel {
  id: number;
  name: string;
  price: number;
  categoryID: number;
  description: string;
  imageUrl: string;

  constructor(
    id: number = 0,
    name: string = '',
    categoryID: number = 0,
    description: string = '',
    price: number = 0,
    imageUrl: string = ''
  ) {
    this.id = id;
    this.name = name;
    this.categoryID = categoryID;
    this.description = description;
    this.price = price;
    this.imageUrl = imageUrl;
  }



}
