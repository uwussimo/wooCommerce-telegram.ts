import axios from 'axios';

class WooCommerceService {
  private username: string;
  private password: string;
  public domain: string;

  constructor(user: string, pass: string, url: string) {
    this.username = user;
    this.password = pass;
    this.domain = url;
  }

  public async getProducts(query: string) {
    //reqwuest started
    console.log('request started');
    console.log(`${this.domain}/products${query ? '?search=' + query : '/'}`);

    const start = Date.now();

    const response = await axios.get(
      `${this.domain}/products${query ? '?search=' + query : '/'}`,
      {
        auth: {
          username: this.username,
          password: this.password,
        },
      }
    );

    //request ended
    console.log('request ended');
    const end = Date.now();
    console.log(`Request took ${end - start} ms`);

    return response.data;
  }
}
export { WooCommerceService };
