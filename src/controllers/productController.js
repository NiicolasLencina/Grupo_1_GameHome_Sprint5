const jsonDb = require('../model/jsonDatabase')
const productModel = jsonDb('products')



const productController = {
    index: (req,res)=>{

            let products = productModel.all()
        res.render('products/index',{products})
    },
    all: (req,res)=>{
    
        let products = productModel.all()
        res.render('products/products',{products})
    
},
    edit: (req,res)=>{
       let id=req.params.id;
       let producto= productModel.find(id)

        res.render('products/editProduct',{producto});
    },
    add: (req,res)=>{
        res.render('products/productAdd');

    },
    store: (req, res) => {
        let row = req.body
        
        if(req.file){
            row.image = req.file.filename
        }else{
            row.image = 'default-image.png'
        }

        console.log(req.body);

        productModel.create(row) 

        res.redirect('products')
    },

    detail: function (req,res) {

        let id = req.params.id

        let producto = productModel.find(id)
        let products = productModel.all()
        res.render('products/productDetail',{producto,products})
    },
    cart: (req,res)=>{
        res.render('products/productCart')
    },
    // Update - Method to update
	update: (req, res) => {
		// Do the magic

		let idReq = req.params.id

		let  row= req.body
		row.id = idReq

			if(req.file!=undefined){
				row.image = req.file.filename
			}
			else if(req.file==undefined){
				let objeto = productModel.find(idReq)
				row.image = objeto.image
			}
			

		
		productModel.update(row) 

		res.redirect('/products')
},
		
    // Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
		productModel.delete(req.params.id)

		res.redirect('/products')
	}

}


module.exports=productController;