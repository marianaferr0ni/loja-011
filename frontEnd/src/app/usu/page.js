"use client";
import { useState, useEffect } from 'react'; // Import the useState and useEffect hooks
import { useRouter } from 'next/navigation';
import '../home.css'

export default function Usu() {
  // Step 1: states da loja 
  const [cart, setCart] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [showCart, setShowCart] = useState(false); // Adiciona estado para controlar a exibição do carrinho
  const router = useRouter();
  
  // Step 1.1: Add a new state for the search term
  const [searchTerm, setSearchTerm] = useState("");

  // Step 2: adiciona produtos no carrinho
  const addToCart = (produto) => {
    setCart((prevCart) => [...prevCart, produto]);
  };

  // Step 3: mensagem do whatsapp
  const sendWhatsAppMessage = () => {
    const totalValue = cart.reduce((acc, product) => acc + product.preco, 0);
    const message = `Olá, gostaria de comprar os seguintes produtos do carrinho:\n\n`;
    const productsList = cart.map((product) => `Produto: ${product.titulo}, Preço: R$ ${product.preco}\n`).join("");
    const totalPrice = `\n\nValor total: R$ ${totalValue}`;
    const whatsappMessage = encodeURIComponent(message + productsList + totalPrice);
    const whatsappLink = `https://wa.me/67996915512?text=${whatsappMessage}`;

    window.open(whatsappLink, '_blank');
  };

  // Step 4: requisição dos produtos da api
  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const req = await fetch("http://localhost:3003/produtos", {
          cache: "no-cache",
        });
        const produtosData = await req.json();
        setProdutos(produtosData);
      } catch (error) {
        console.log("Error fetching products", error);
      }
    };
    fetchProdutos();
  }, []);
  
  // Step 4.1: Filter the products based on the search term
  const filteredProducts = produtos.filter((produto) =>
    produto.titulo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      <input
        type="text"
        placeholder="Search by name"
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <div className='produto'>
        {filteredProducts.map((produto) => (
          <div className='produto-card' key={produto.id}>
            <div className='produto-imagem'>
              <img className='imagem-produto' src={produto.imagem} alt={produto.titulo} />
            </div>
            <div className='produto-conteudo'>
              <h3 className='produto-titulo'>{produto.titulo}</h3>
              <p className='produto-data'></p>
              <p className='produto-preco'>R$ {produto.preco}</p>
              <p className='produto-descricao'>{produto.descricao}</p>
              <div className='socorro'>
                <button onClick={() => addToCart(produto)} className='adicionar-button'>Adicionar ao Carrinho</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button onClick={() => setShowCart(!showCart)}>Carrinho</button> {/* Adiciona botão para alternar entre mostrar e ocultar o carrinho */}
      {showCart && ( // Adiciona condição para exibir o carrinho somente se showCart for true
        <div className='carrinho'>
          <h2>Carrinho</h2>
          {cart.length === 0 ? (
            <p>O carrinho está vazio</p>
          ) : (
            <>
              {cart.map((product) => (
                <div key={product.id}>
                  <p>{product.titulo} - R$ {product.preco}</p>
                </div>
              ))}
              <button onClick={sendWhatsAppMessage}>Comprar no WhatsApp</button>
            </>
          )}
        </div>
      )}
    </main>
  );
}
