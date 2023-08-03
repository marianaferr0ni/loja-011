'use client'
import { useRouter } from "next/navigation";
import styles from "./alterar.module.css";
import Link from "next/link";
import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR';
import { useState, useEffect } from "react";

export default async function Produto({ params }) {

  const [titulo, setTitulo] = useState();
  const [data_cadastro, setData_cadastro] = useState();
  const [preco, setPreco] = useState();
  const [descricao, setDescricao] = useState();
  const [imagem, setImagem] = useState("");
  const [novoTitulo, setNovoTitulo] = useState("");
const [novaData_cadastro, setNovaData_cadastro] = useState("");
const [novoPreco, setNovoPreco] = useState("");
const [novaDescricao, setNovaDescricao] = useState("");
const [novaImagem, setNovaImagem] = useState("");
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    const fetchProduto = async () => {
        const req = await fetch("http://localhost:3003/produtos", {
          cache: "no-cache"
        })
        const produto = await req.json();
        setNovoTitulo(produto.titulo);
        setNovaData_cadastro(produto.data_cadastro);
        setNovoPreco(produto.preco);
        setNovaDescricao(produto.descricao);
        setNovaImagem(produto.imagem);
      };

    fetchProduto();
  }, [id]);

  const alterar = async (e) => {
    e.preventDefault();

    const produtoAtualizado = {
      titulo: novoTitulo,
      data_cadastro: novaData_cadastro,
      preco: novoPreco,
      descricao: novaDescricao,
      imagem: novaImagem,
    };

    try {
      await fetch(`http://localhost:3003/produtos/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(produtoAtualizado),
      });
      router.push("/");
    } catch (error) {
      alert("Ocorreu um erro: " + error);
    }
  };
  return (
    <div className={styles.main}>
      <h1>Editar Atividade</h1>
      <form onSubmit={alterar}>
        <input
        className={styles.formInput}
          type="text"
          placeholder="Título"
          name="titulo"
          value={novoTitulo}
          onChange={(e) => setNovoTitulo(e.target.value)}
        />
        <br />
        <input
        className={styles.formInput}
          type="text"
          placeholder="Data"
          name="data_cadastro"
          value={novaData_cadastro}
          onChange={(e) => setNovaData_cadastro(e.target.value)}
        />
        <br />
        <input
        className={styles.formInput}
          type="text"
          placeholder="Preço"
          name="preco"
          pattern="^\d+(.|,)?\d{0,2}$"
          value={novoPreco}
          onChange={(e) => setNovoPreco(e.target.value)}
        />
        <br />
        <input
        className={styles.formInput}
          type="text"
          placeholder="Descrição"
          name="descricao"
          value={novaDescricao}
          onChange={(e) => setNovaDescricao(e.target.value)}
        />
        <br />
        <input
        className={styles.formInput}
          type="text"
          placeholder="Imagem"
          name="imagem"
          value={novaImagem}
          onChange={(e) => setNovaImagem(e.target.value)}
        />
        <br />
        <button type="submit" className={styles.formButton}>Salvar</button>
        <div>
          <a href="/" className={styles.formLink}>Voltar</a>
        </div>
      </form>
    </div>
  );
}