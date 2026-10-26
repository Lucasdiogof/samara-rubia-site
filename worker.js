// Redireciona www para o domínio principal (301); todo o resto vem dos assets estáticos.
const worker = {
  fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === "www.samararubia.com") {
      url.hostname = "samararubia.com";
      return Response.redirect(url.toString(), 301);
    }
    return env.ASSETS.fetch(request);
  },
};

export default worker;
