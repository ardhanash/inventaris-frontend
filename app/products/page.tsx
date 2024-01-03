import { PrismaClient } from "@prisma/client"
import AddProducts from "./addProducts";
import DeleteProducts from "./deleteProducts";

const prisma = new PrismaClient();

const getProducts = async () => {
    const res = await prisma.product.findMany({
        select: {
            id: true,
            title: true,
            price: true,
            brandId: true,
            brand: true,
        },
    });
    return res;
}

const getBrand = async () => {
    const res = await prisma.brand.findMany()
    return res;
}

const Product = async () => {

const [products, brands] = await Promise.all([ getProducts(), getBrand() ]);

  return (
    <div>
        <div className="mb-2">
            <AddProducts brands={brands} />
        </div>
        <table className="table w-full">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Brand</th>
                    <th className="text-center">Action</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product, index) => (
                    <tr key={product.id}>
                    <td>{index + 1}</td>
                    <td>{product.title}</td>
                    <td>{product.price}</td>
                    <td>{product.brand.name}</td>
                    <td>
                        <DeleteProducts product={product} />
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default Product