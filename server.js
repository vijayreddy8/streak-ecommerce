const express = require("express");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));

const dataDir = path.join(__dirname,"data");
const ordersFile = path.join(dataDir,"orders.json");
const usersFile = path.join(dataDir,"users.json");
if(!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
if(!fs.existsSync(ordersFile)) fs.writeFileSync(ordersFile,"[]");
if(!fs.existsSync(usersFile)) fs.writeFileSync(usersFile,"[]");

const products = [
{id:1,name:"Classic Oversized T-Shirt",category:"Men",price:699,oldPrice:1029,discount:32,rating:4.5,reviews:1200,stock:35,image:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",description:"Soft heavyweight cotton tee with a relaxed oversized silhouette.",features:["240 GSM cotton", "Oversized fit", "Ribbed collar", "Pre-shrunk"],sizes:["S", "M", "L", "XL"],colors:["Black", "White", "Grey"]},
{id:2,name:"Premium Oxford Shirt",category:"Men",price:1299,oldPrice:1799,discount:28,rating:4.6,reviews:860,stock:22,image:"https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=900&q=80",description:"A polished Oxford shirt designed for office days and smart-casual weekends.",features:["Cotton Oxford", "Regular fit", "Button-down collar", "Easy iron"],sizes:["S", "M", "L", "XL"],colors:["White", "Blue"]},
{id:3,name:"Relaxed Linen Shirt",category:"Men",price:1599,oldPrice:2199,discount:27,rating:4.7,reviews:640,stock:18,image:"https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&q=80",description:"Breathable linen-blend shirt with a relaxed vacation-ready fit.",features:["Linen blend", "Relaxed fit", "Full sleeves", "Breathable weave"],sizes:["S", "M", "L", "XL"],colors:["Beige", "Olive", "White"]},
{id:4,name:"Streetwear Hoodie",category:"Men",price:1799,oldPrice:2499,discount:28,rating:4.5,reviews:912,stock:26,image:"https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=80",description:"Brushed fleece hoodie with a clean streetwear profile.",features:["Cotton fleece", "Drop shoulder", "Kangaroo pocket", "Soft brushed interior"],sizes:["S", "M", "L", "XL"],colors:["Cream", "Black", "Grey"]},
{id:5,name:"Slim Fit Chinos",category:"Men",price:1499,oldPrice:2099,discount:29,rating:4.4,reviews:730,stock:19,image:"https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=80",description:"Versatile stretch chinos made for everyday movement.",features:["Stretch twill", "Slim fit", "Four pockets", "Comfort waistband"],sizes:["30", "32", "34", "36"],colors:["Khaki", "Navy", "Black"]},
{id:6,name:"Urban Bomber Jacket",category:"Men",price:2499,oldPrice:3499,discount:29,rating:4.7,reviews:412,stock:14,image:"https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=80",description:"Lightweight bomber jacket with ribbed trims and clean lines.",features:["Lightweight shell", "Ribbed trims", "Zip closure", "Two side pockets"],sizes:["S", "M", "L", "XL"],colors:["Black", "Olive"]},
{id:7,name:"Floral Midi Dress",category:"Women",price:1899,oldPrice:2799,discount:32,rating:4.7,reviews:1080,stock:24,image:"https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=80",description:"Flowing midi dress with a soft floral print and flattering waistline.",features:["Flowy fabric", "Midi length", "Floral print", "Side zip"],sizes:["XS", "S", "M", "L"],colors:["Rose", "Blue"]},
{id:8,name:"Satin Evening Dress",category:"Women",price:2499,oldPrice:3499,discount:29,rating:4.8,reviews:690,stock:12,image:"https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=80",description:"Elegant satin dress for evenings, celebrations and special occasions.",features:["Satin finish", "Midi length", "Lined", "Adjustable straps"],sizes:["XS", "S", "M", "L"],colors:["Black", "Champagne"]},
{id:9,name:"Relaxed Co-ord Set",category:"Women",price:1699,oldPrice:2399,discount:29,rating:4.5,reviews:520,stock:21,image:"https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80",description:"A coordinated top and trouser set for effortless everyday styling.",features:["Two-piece set", "Relaxed fit", "Soft fabric", "Machine washable"],sizes:["XS", "S", "M", "L"],colors:["Cream", "Sage"]},
{id:10,name:"Classic Knit Cardigan",category:"Women",price:1599,oldPrice:2199,discount:27,rating:4.6,reviews:480,stock:16,image:"https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=900&q=80",description:"Soft knit cardigan for layering across seasons.",features:["Soft knit", "Button front", "Relaxed fit", "Lightweight"],sizes:["S", "M", "L"],colors:["Beige", "Brown"]},
{id:11,name:"Everyday Sneakers",category:"Footwear",price:2299,oldPrice:3299,discount:30,rating:4.5,reviews:2140,stock:30,image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",description:"Clean everyday sneakers combining comfort and versatile styling.",features:["Cushioned sole", "Mesh upper", "Everyday tread", "Padded collar"],sizes:["6", "7", "8", "9", "10"],colors:["White", "Black"]},
{id:12,name:"Retro Runner Sneakers",category:"Footwear",price:2699,oldPrice:3899,discount:31,rating:4.6,reviews:980,stock:17,image:"https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?auto=format&fit=crop&w=900&q=80",description:"Retro-inspired runners with layered panels and cushioned comfort.",features:["Foam midsole", "Mesh panels", "Rubber outsole", "Padded tongue"],sizes:["6", "7", "8", "9", "10"],colors:["White/Green", "Grey"]},
{id:13,name:"Leather Loafers",category:"Footwear",price:2499,oldPrice:3299,discount:24,rating:4.4,reviews:430,stock:11,image:"https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=900&q=80",description:"Smart loafers with a polished finish for formal and semi-formal looks.",features:["Synthetic leather", "Slip-on", "Cushioned footbed", "Textured sole"],sizes:["6", "7", "8", "9", "10"],colors:["Brown", "Black"]},
{id:14,name:"Street High Tops",category:"Footwear",price:2199,oldPrice:2999,discount:27,rating:4.5,reviews:610,stock:15,image:"https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=900&q=80",description:"High-top sneakers with a bold streetwear silhouette.",features:["Canvas upper", "High-top collar", "Rubber sole", "Padded footbed"],sizes:["6", "7", "8", "9", "10"],colors:["Black", "White"]},
{id:15,name:"Streak Smart Watch",category:"Electronics",price:3999,oldPrice:4999,discount:20,rating:4.6,reviews:3100,stock:9,image:"https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=80",description:"A modern smart watch with activity tracking and notification support.",features:["AMOLED display", "Activity tracking", "7-day battery", "Water resistant"],sizes:["One Size"],colors:["Black", "Silver"]},
{id:16,name:"Wireless Headphones",category:"Electronics",price:2999,oldPrice:3699,discount:18,rating:4.4,reviews:692,stock:13,image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",description:"Over-ear wireless headphones with immersive sound and soft ear cushions.",features:["Bluetooth", "40-hour battery", "Noise reduction", "USB-C charging"],sizes:["One Size"],colors:["Black", "Cream"]},
{id:17,name:"Portable Speaker",category:"Electronics",price:1999,oldPrice:2599,discount:23,rating:4.5,reviews:540,stock:20,image:"https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=80",description:"Compact Bluetooth speaker built for rooms, desks and travel.",features:["Bluetooth 5", "12-hour battery", "Water resistant", "USB-C"],sizes:["One Size"],colors:["Black", "Blue"]},
{id:18,name:"Minimal Watch",category:"Accessories",price:3290,oldPrice:3990,discount:18,rating:4.8,reviews:2030,stock:8,image:"https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=80",description:"Refined everyday watch with a clean dial and understated profile.",features:["Quartz movement", "Mineral glass", "Steel case", "5 ATM"],sizes:["One Size"],colors:["Steel", "Black"]},
{id:19,name:"Arc Shoulder Bag",category:"Accessories",price:2190,oldPrice:2690,discount:19,rating:4.9,reviews:1880,stock:12,image:"https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80",description:"Compact shoulder bag with a sculpted shape and adjustable strap.",features:["Vegan leather", "Adjustable strap", "Zip closure", "Inner pocket"],sizes:["One Size"],colors:["Black", "Brown"]},
{id:20,name:"Classic Sunglasses",category:"Accessories",price:999,oldPrice:1499,discount:33,rating:4.5,reviews:810,stock:27,image:"https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80",description:"UV-protective sunglasses with a timeless frame.",features:["UV400", "Polarized lenses", "Lightweight frame", "Protective case"],sizes:["One Size"],colors:["Black", "Tortoise"]},
{id:21,name:"Canvas Weekender",category:"Accessories",price:3190,oldPrice:3690,discount:14,rating:4.7,reviews:670,stock:11,image:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80",description:"Spacious weekender with durable canvas and smart compartments.",features:["Heavy canvas", "Laptop sleeve", "Shoe compartment", "Adjustable strap"],sizes:["One Size"],colors:["Canvas", "Black"]},
{id:22,name:"Modern Table Lamp",category:"Home & Living",price:1499,oldPrice:2199,discount:32,rating:4.4,reviews:390,stock:18,image:"https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80",description:"Warm ambient table lamp with a modern minimal silhouette.",features:["Warm LED", "Metal body", "Touch switch", "Energy efficient"],sizes:["One Size"],colors:["Black", "Gold"]},
{id:23,name:"Lounge Cushion Set",category:"Home & Living",price:899,oldPrice:1299,discount:31,rating:4.5,reviews:280,stock:32,image:"https://images.unsplash.com/photo-1584100936595-c0654b55a2a2?auto=format&fit=crop&w=900&q=80",description:"Soft textured cushions that add comfort and character to your space.",features:["Set of 2", "Textured cover", "Hidden zip", "Machine washable"],sizes:["45x45"],colors:["Beige", "Sage"]},
{id:24,name:"Ceramic Planter",category:"Home & Living",price:799,oldPrice:1199,discount:33,rating:4.6,reviews:340,stock:25,image:"https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=900&q=80",description:"Minimal ceramic planter for desks, shelves and living spaces.",features:["Ceramic", "Drainage hole", "Matte finish", "Indoor use"],sizes:["Small", "Medium"],colors:["White", "Sand"]},
{id:25,name:"Matte Lip Kit",category:"Beauty",price:799,oldPrice:1099,discount:27,rating:4.4,reviews:620,stock:44,image:"https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=900&q=80",description:"Everyday lip essentials with comfortable long-wear color.",features:["Long wear", "Cream finish", "Easy blend", "Vegan formula"],sizes:["One Size"],colors:["Nude", "Rose"]},
{id:26,name:"Glow Skin Set",category:"Beauty",price:1299,oldPrice:1799,discount:28,rating:4.7,reviews:810,stock:20,image:"https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=900&q=80",description:"Simple daily skincare set for cleansing, hydration and glow.",features:["Cleanser", "Moisturizer", "Serum", "Travel pouch"],sizes:["One Size"],colors:["Original"]},
{id:27,name:"Training Dumbbell Set",category:"Sports",price:1799,oldPrice:2399,discount:25,rating:4.5,reviews:350,stock:14,image:"https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=900&q=80",description:"Compact dumbbell set for strength training at home.",features:["Cast iron", "Rubber coating", "Pair set", "Non-slip grip"],sizes:["5 kg pair", "10 kg pair"],colors:["Black"]},
{id:28,name:"Performance Yoga Mat",category:"Sports",price:999,oldPrice:1499,discount:33,rating:4.6,reviews:780,stock:29,image:"https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7a?auto=format&fit=crop&w=900&q=80",description:"Cushioned non-slip yoga mat for daily practice and workouts.",features:["Non-slip", "6 mm cushioning", "Easy roll", "Sweat resistant"],sizes:["6 mm"],colors:["Purple", "Blue"]},
{id:29,name:"Trail Sports Bottle",category:"Sports",price:699,oldPrice:999,discount:30,rating:4.5,reviews:410,stock:36,image:"https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=80",description:"Leak-resistant sports bottle for training, travel and daily hydration.",features:["BPA free", "Leak resistant", "750 ml", "Carry loop"],sizes:["750 ml"],colors:["Black", "Blue"]},
{id:30,name:"Daily Backpack",category:"Accessories",price:1899,oldPrice:2499,discount:24,rating:4.7,reviews:910,stock:17,image:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80",description:"Clean everyday backpack with room for your laptop and essentials.",features:["Laptop sleeve", "Water resistant", "Padded straps", "Multiple pockets"],sizes:["18 L"],colors:["Black", "Grey"]}
];

function read(file){try{return JSON.parse(fs.readFileSync(file,"utf8"))}catch{return[]}}
function write(file,data){fs.writeFileSync(file,JSON.stringify(data,null,2))}
function id(){return crypto.randomBytes(5).toString("hex").toUpperCase()}

app.get("/api/health",(req,res)=>res.json({status:"ok",service:"TorStaq Commerce API"}));
app.get("/api/products",(req,res)=>res.json(products));
app.get("/api/products/:id",(req,res)=>{const p=products.find(x=>x.id===Number(req.params.id));p?res.json(p):res.status(404).json({message:"Product not found"})});

app.post("/api/auth/register",(req,res)=>{
 const {name,email,password}=req.body||{};
 if(!name||!email||!password)return res.status(400).json({message:"Name, email and password are required"});
 const users=read(usersFile);
 if(users.some(u=>u.email.toLowerCase()===email.toLowerCase()))return res.status(409).json({message:"Email already registered"});
 const user={id:id(),name,email:email.toLowerCase(),password,createdAt:new Date().toISOString()};
 users.push(user);write(usersFile,users);
 res.status(201).json({id:user.id,name:user.name,email:user.email});
});
app.post("/api/auth/login",(req,res)=>{
 const {email,password}=req.body||{}, users=read(usersFile);
 const u=users.find(x=>x.email===String(email||"").toLowerCase()&&x.password===password);
 u?res.json({id:u.id,name:u.name,email:u.email}):res.status(401).json({message:"Invalid email or password"});
});

app.post("/api/orders",(req,res)=>{
 const {customer,items}=req.body||{};
 if(!customer?.name||!customer?.email||!customer?.phone||!customer?.address||!Array.isArray(items)||!items.length)return res.status(400).json({message:"Complete customer and cart details are required"});
 const clean=items.map(i=>{const p=products.find(x=>x.id===Number(i.id));return p?{id:p.id,name:p.name,price:p.price,qty:Math.max(1,Number(i.qty)||1)}:null}).filter(Boolean);
 if(!clean.length)return res.status(400).json({message:"No valid products in order"});
 const subtotal=clean.reduce((s,i)=>s+i.price*i.qty,0),shipping=subtotal>=2999?0:99,total=subtotal+shipping;
 const order={orderId:"TS-"+id(),customer,items:clean,subtotal,shipping,total,status:"Confirmed",createdAt:new Date().toISOString()};
 const orders=read(ordersFile);orders.push(order);write(ordersFile,orders);
 res.status(201).json(order);
});
app.get("/api/orders",(req,res)=>res.json(read(ordersFile)));

app.get("*",(req,res)=>res.sendFile(path.join(__dirname,"public","index.html")));
app.listen(PORT,()=>console.log(`TorStaq Commerce running at http://localhost:${PORT}`));
