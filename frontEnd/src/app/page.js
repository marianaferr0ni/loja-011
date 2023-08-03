"use client"
import Link from 'next/link';
import './home.css'


import { useRouter } from 'next/navigation';

export default async function Home() {
  const router = useRouter();
  const req = await fetch("http://localhost:3003/produtos", {
    cache: "no-cache"
  });
  const produtos = await req.json();

 
  
  const remover = (id) => {
    const codigo = { id: parseInt(id) }
    const idJson = JSON.stringify(codigo);

    try {
        fetch("http://localhost:3003/produtos", {
          method: "DELETE",
          headers: { 'content-type': 'application/json' },
          body: idJson
        })
        router.refresh();
    } catch (error) {
        console.log("Ocorreu um erro" + error)
    }
}
  return (
    <main> 
      <div className='cadastro'>
        <p>MultCoisas</p>
      <Link href="/cadastro" className='voltar'> CADASTRAR </Link>
      </div>


      <div className='produto'>
  {produtos.map(produtos => (
    <div className='produto-card' key={produtos.id}>
      <div className='produto-imagem'>
        <img className='imagem-produto' src={produtos.imagem} alt={produtos.titulo} />
      </div>
      <div className='produto-conteudo'>
        <h3 className='produto-titulo'>{produtos.titulo}</h3>
        <p className='produto-data'></p>
        <p className='produto-preco'>R$ {produtos.preco}</p>
        <p className='produto-descricao'>{produtos.descricao}</p>
        <div className='socorro'>
          <Link href={`/produto/${produtos.id}`} className='ver-mais-link'>ver mais</Link>
          <Link href={`/alterar/${produtos.id}`}  className='ver-mais-link'>alterar</Link>
          <button onClick={() => remover(produtos.id)} className='excluir-button'>excluir</button> 
        </div>
      </div>
    </div>
  ))}
</div>

      
    </main>
  )
}

