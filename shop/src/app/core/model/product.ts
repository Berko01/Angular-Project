export class ProductModel {
  id: number;
  name: string;
  price: number;
  categoryID: number;
  description: string;
  imageUrl: string;

  constructor(
    id: number,
    name: string,
    categoryID: number,
    description: string,
    price: number,
    imageUrl: string
  ) {
    this.id = id;
    this.name = name;
    this.categoryID = categoryID;
    this.description = description;
    this.price = price;
    this.imageUrl = imageUrl;
  }
}
