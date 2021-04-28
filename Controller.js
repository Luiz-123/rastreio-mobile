const express=require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
const models=require('./models');
const QRCode =require('qrcode');

const app=express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('assets'));
let user=models.User;
let tracking=models.Tracking;
let product=models.Product;

//Login
app.post('/login',async(req,res)=>{
    let response= await user.findOne({
        where:{name:req.body.name, password: req.body.password}
    });
    if (response === null){
        res.send(JSON.stringify('error'));
    }else{
        res.send(response);
    }
});

//Update dos dados da mercadoria
app.post('/update',async(req,res)=>{
    let response= await tracking.findOne({
        where: {code: req.body.code},
        include: [{all:true}]
    });
    response.local=req.body.local; 
    response.updateAt= new Date();
    response.Products[0].name=req.body.product;
    response.save();
    response.Products[0].save();
    res.send(JSON.stringify('Atualizando...'));
});

//Exibir o local do rastreio
app.post('/rastreio',async(req,res)=>{
    let response= await tracking.findOne({
        where:{code:req.body.code},
        include:[{all:true}]
    });

    if(response === null){
        res.send(JSON.stringify('Nenhum produto encontrado!'));
    }else{
        res.send(JSON.stringify(`Sua encomenda - ${response.Products[0].name} - já esta a caminho - ${response.local}`));
    }
    
});

//Alteração de senha
app.post('/verifyPass',async(req,res)=>{
    let response= await user.findOne({
        where:{id:req.body.id, password: req.body.senhaAntiga}
    });
    if (response === null){
        res.send(JSON.stringify('Senha antiga não confere!'));
    }else{
        if(req.body.novaSenha === req.body.confNovaSenha){
            response.password=req.body.novaSenha;
            response.save();
            res.send(JSON.stringify('Senha atualizada com sucesso!'));
        }else{
            res.send(JSON.stringify('Nova senha não confere!'));
        }
        
    }
});

//Criar produto no banco
app.post('/create',async(req,res)=>{
    let trackingId='';
    await tracking.create({
      userId: req.body.userId,
      code: req.body.code,
      local: req.body.local  
    }).then((response)=>{
      trackingId+=response.id;  
    });

    await product.create({          
      trackingId: trackingId,
      name: req.body.product      
    });
      QRCode.toDataURL(req.body.code).then(url=>{
        QRCode.toFile(
            './assets/img/code.png',
            req.body.code
        );
        res.send(JSON.stringify(url));
      }) 

});

//Pegar os dados do produto 
app.post('/searchProduct',async(req,res)=>{
    let response= await tracking.findOne({
        include:[{model:product}],
        where: {code: req.body.code } 
    });
    res.send(JSON.stringify(response));
});

let port=process.env.PORT || 3000;
app.listen(port,(req,res)=>{
    console.log('Servidor Rodando');
});




/*
    app.get('/create',async(req,res)=>{
        let create= await user.create({ 
          name: "joana", 
          password: "abc",
          createdAt: new Date(),
          updateAt: new Date()
        });
          res.send('Usuário criado com sucesso!');
    });
    
    app.get('/read',async(req,res)=>{
        let read= await user.findAll({
          raw:true
        });
          console.log(read);
    });
    
    app.get('/update',async(req,res)=>{
        let update= await user.findByPk(1,
            {include:[{all:true}]}
            ).then((response)=>{
            response.Trackings[0].local='mogi das cruzes';
            response.Trackings[0].save();

            //Update do cadastro users
            //response.name='alex';
            //response.password='222';
            //response.save();
        });
    });
    
    app.get('/delete',async(req,res)=>{
        user.destroy({
            where: { id:6 }
        });
    });
*/
