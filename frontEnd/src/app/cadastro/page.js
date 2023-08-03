"use client";
import { useState } from "react";
import styles from "../page.module.css";
import { useRouter } from "next/navigation";

export default function Cadastro() {
  const route = useRouter();
  const [titulo, setTitulo] = useState();
  const [data_cadastro, setData_cadastro] = useState();
  const [preco, setPreco] = useState();
  const [descricao, setDescricao] = useState();
  const [imagem, setImagem] = useState("");

  const cadastrar = (e) => {
    e.preventDefault();

    const produto = {
      titulo: titulo,
      data_cadastro: data_cadastro,
      preco: preco,
      descricao: descricao,
      imagem: imagem,
    };
    const produtoJson = JSON.stringify(produto);
    fetch("http://localhost:3003/produto", {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: produtoJson,
    })
      .then(function () {
        route.push("/");
      })
      .catch(() => console.log("Não foi possível cadastrar!"));
  };

  return (
    <div className={styles.main}>
      <h1>Cadastro de produtos</h1>

      <form onSubmit={cadastrar}>
      <input
        type="text"
        placeholder="Título:"
        name="titulo"
        className={styles.formInput}
        onChange={(e) => setTitulo(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Data:"
        name="data_cadastro"
        className={styles.formInput}
        onChange={(e) => {
          const value = e.target.value.replace(/\D/g, "");
          setData_cadastro(value);
        }}
      />
      <br />
      <input
        type="text"
        placeholder="Preço:"
        name="preco"
        pattern="^\d+(.|,)?\d{0,2}$"
        className={styles.formInput}
        onChange={(e) => {
          const value = e.target.value.replace(/[^\d.,]/g, "");
          setPreco(value);
        }}
      />
      <br />
      <input
        type="text"
        placeholder="Descrição:"
        name="descricao"
        className={styles.formInput}
        onChange={(e) => setDescricao(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Imagem:"
        name="imagem"
        className={styles.formInput}
        onChange={(e) => setImagem(e.target.value)}
      />
      <br />
      <button type="submit" className={styles.formButton}>Cadastrar</button> <a href="/" className={styles.formLink}>Voltar</a>
    </form>
  </div>
  );
}
