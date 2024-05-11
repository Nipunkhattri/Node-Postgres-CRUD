import sequelize from "../helpers/database.js";
import Product from "../models/ProductModel.js";

/*Creation of Product */
export const ProductCreation = async (req, res) => {
  try {
    const { ProductName, ProductDescription, Price} = req.body;
    
    if (!ProductName || !ProductDescription || !Price){
        return res.status(400).json({message:"ProductName,ProductDescription and Price can not be empty"})
    }

    if (typeof ProductName !== 'string') {
      return res.status(400).json({ message: 'ProductName should be a string' });
    }

    if (typeof ProductDescription !== 'string') {
        return res.status(400).json({ message: 'ProductDescription should be a string' });
    }

    if (!Number.isInteger(Price)) {
      return res.status(400).json({ message: 'Price should be an integer' });
    }

    const data = await new Product({
        ProductName: ProductName,
        ProductDescription: ProductDescription,
        Price: Price
    });
    await data.save();
    res.status(200).json({message :"Product Created Successfully"});
  } catch (error) {
    res.status(400).json({message:'Something Went Wrong'});
    console.log(error);
  }
};

/*Getting All the Product*/
export const GetAllProduct = async (req,res) =>{
    try {
        const data = await Product.findAll();
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}

/* Get Single Product by Id*/
export const GetSingleProduct = async (req,res) =>{
    try {
        const {id} = req.params;
        const data = await Product.findOne({ where:{id:id}})

        if (data == null){
            res.status(400).json({message:"No product found !"})
        }

        res.status(200).json(data);
    } catch (error) {
        console.log(error);
    }
}

// Update Product By Id
export const UpdateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { ProductName } = req.body;
        
        const data = await Product.findOne({ where:{id:id}})

        if (data == null){
            res.status(400).json({message:"No product found !"})
        }

        // Update the product
        const updatedProduct = await Product.update(
            { ProductName: ProductName },
            { returning: true, where: { id: id } }
        );

        // Return a success message
        return res.status(200).json({ message: 'Product Updated'});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

/* Deleting Product by Id*/
export const DeleteProduct = async (req,res) =>{
    try {
        const {id} = req.params;

        const data = await Product.findOne({ where:{id:id}})

        if (data == null){
            res.status(400).json({message:"No product found !"})
        }

        const deletedProduct = await Product.destroy({where :{ id:id} })

        return res.status(200).json({message:"Deleted Successfully"});
    } catch (error) {
        return res.status(420).json("error Occurred");
    }
}
