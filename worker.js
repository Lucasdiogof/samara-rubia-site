// Redireciona http e www para https://samararubia.com em um único 301, preservando caminho e query; todo o resto vem dos assets estáticos, com cabeçalhos de segurança.
const APEX = "samararubia.com";

// Sem CSP de propósito: o export do Next usa scripts inline que exigiriam hashes a cada build.
const SECURITY_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Frame-Options": "DENY",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
};

const worker = {
  async fetch(request, env) {
    const url = new URL(request.url);
    const isWww = url.hostname === `www.${APEX}`;
    if (isWww || (url.protocol === "http:" && url.hostname === APEX)) {
      url.protocol = "https:";
      url.hostname = APEX;
      return Response.redirect(url.toString(), 301);
    }
    const res = await env.ASSETS.fetch(request);
    const headers = new Headers(res.headers);
    for (const [k, v] of Object.entries(SECURITY_HEADERS)) headers.set(k, v);
    // A cópia em *.workers.dev nunca deve ser indexada, mesmo depois que o domínio principal for liberado.
    if (url.hostname !== APEX) headers.set("X-Robots-Tag", "noindex, nofollow");
    return new Response(res.body, { status: res.status, statusText: res.statusText, headers });
  },
};

export default worker;
