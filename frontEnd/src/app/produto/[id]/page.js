'use client'
import '../produto.css';
import { useRouter } from "next/navigation";
import Link from "next/link";
import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR';

export default async function Produto({ params }) {
    const router = useRouter();
    const id = { id: parseInt(params.id) }

    const idJson = JSON.stringify(id);

    const formatarData = (date) => {
        return format(parseISO(date), "dd/MM/yyyy HH:mm", { locale: ptBR })
    }

    const req = await fetch("http://localhost:3003/produtos", {
        method: "POST",
        cache: "no-cache",
        headers: { 'content-type': 'application/json' },
        body: idJson
    })
    const produto = await req.json();

    const remover = () => {
        console.log(idJson)
        try {
            alert("Tem certeza de que quer excluir esse produto permanentemente?")
            fetch("http://localhost:3003/produtos", {
                method: "DELETE",
                headers: { 'content-type': 'application/json' },
                body: idJson
            })
            router.push("/");
        } catch (error) {
            alert("Ocorreu um erro" + error)
        }
    }

    return (
        <div className="product">
            <img className="product-image" src={produto.imagem} alt={produto.titulo}/>
            <h1 className="product-title">{produto.titulo}</h1>
            <p className="product-date">{formatarData(produto.data_cadastro).slice(0, 10)}</p>
            <p className="product-price">{produto.preco}</p>
            <p className="product-description">{produto.descricao}</p>
        
            <button className="product-button" onClick={remover}>Excluir</button>
            <a className="product-link" href="../">Voltar</a>
        </div>
    
      
    )
}