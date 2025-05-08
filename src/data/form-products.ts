

export interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    popularity: number;
    imageUrl: string;
}




export const products: Product[] = [
    {
        id: "1",
        name: "Laptop",
        category: "electronics",
        price: 1200,
        popularity: 5,
        imageUrl:
            "https://img.freepik.com/free-photo/still-life-books-versus-technology_23-2150062920.jpg?t=st=1742568012~exp=1742571612~hmac=6d20e5bb59d50c502685f480643660188df0ef703ca09f50392f9fb43e7ff6c5&w=996",
    },
    {
        id: "2",
        name: "T-Shirt",
        category: "apparel",
        price: 20,
        popularity: 3,
        imageUrl:
            "https://img.freepik.com/free-vector/monocolor-midnight-madness-marathon-t-shirt-design_742173-5733.jpg?t=st=1742568042~exp=1742571642~hmac=d960d96b464fe9121bb9f7e10cb37e770dab0cbc2ace16d42104d05dc3dfe22e&w=740",
    },
    {
        id: "3",
        name: "Coffee",
        category: "food",
        price: 5,
        popularity: 4,
        imageUrl:
            "https://img.freepik.com/free-photo/chicken-fajita-chicken-fillet-fried-with-bell-pepper-lavash-with-bread-slices-white-plate_114579-174.jpg?t=st=1742568063~exp=1742571663~hmac=8cd62727de8dc3775fba07cc8469e104f361448bd9c5250e781868fd0c6d5fe8&w=740",
    },
    {
        id: "4",
        name: "Smartphone",
        category: "electronics",
        price: 800,
        popularity: 5,
        imageUrl:
            "https://img.freepik.com/free-photo/creative-reels-composition_23-2149711507.jpg?t=st=1742565716~exp=1742569316~hmac=b3990d16fd131ee05c2416e8d86dc94514a25826544c2f064372f5484941b979&w=996",
    },
    {
        id: "5",
        name: "Jeans",
        category: "apparel",
        price: 50,
        popularity: 4,
        imageUrl:
            "https://img.freepik.com/free-photo/she-has-great-street-style_329181-4716.jpg?t=st=1742568104~exp=1742571704~hmac=a1ea2a1009ea87f53b7b71a6a5a451bce8d6a603478cfe8e351da12db64c722f&w=740",
    },
    {
        id: "6",
        name: "Chocolate",
        category: "food",
        price: 10,
        popularity: 4,
        imageUrl:
            "https://img.freepik.com/free-psd/chocolate-shop-instagram-stories-template_23-2148669321.jpg?t=st=1742568139~exp=1742571739~hmac=d979e6e1a8036b1918a999aa7a8e9464b21d5cc208a94b4b5d128998deb3e9af&w=900",
    },
    {
        id: "7",
        name: "Headphones",
        category: "electronics",
        price: 150,
        popularity: 4,
        imageUrl:
            "https://img.freepik.com/free-photo/black-headphones-digital-device_53876-97302.jpg?t=st=1742568162~exp=1742571762~hmac=b6cc92216cfaa23fb812f368490c2c716584490408d205f206432fd1f88f0875&w=740",
    },
    {
        id: "8",
        name: "Sneakers",
        category: "apparel",
        price: 90,
        popularity: 5,
        imageUrl:
            "https://img.freepik.com/premium-vector/cool-sneaker-with-orange-background_755096-85.jpg?w=740",
    },
];