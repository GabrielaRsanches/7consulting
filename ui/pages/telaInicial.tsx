import React from "react";
import Link from "next/link";

export const TelaInicial: React.FC = () => {
  return (
    <>
      <Link href="telaInicial.tsx">
        <button>Início</button>
      </Link>
      <Link href="categoriaCliente.tsx">
        <button type="button">Categoria Cliente</button>
      </Link>
    </>
  );
};
