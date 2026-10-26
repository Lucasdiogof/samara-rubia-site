/** Rotas neutras (sem prefixo de idioma); `key` aponta o rótulo em `dict.nav`. */
export const nav = [
  { href: "/", key: "home" },
  { href: "/sobre/", key: "about" },
  { href: "/tratamentos/", key: "treatments" },
  { href: "/como-funciona/", key: "how" },
  { href: "/perguntas-frequentes/", key: "faq" },
  { href: "/contato/", key: "contact" },
] as const;
