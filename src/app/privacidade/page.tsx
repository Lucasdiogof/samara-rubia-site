import { PageHero, ReviewNotice } from "@/components/ui/PageParts";
import { pageMetadata } from "@/lib/metadata";
import { fullName, site } from "@/config/site";

export const metadata = pageMetadata({
  title: "Política de privacidade",
  description:
    "Como este site trata dados: sem formulários, sem cadastro e sem rastreamento de terceiros.",
  path: "/privacidade/",
});

const blocks: [string, string[]][] = [
  [
    "Quais dados este site coleta",
    [
      "Este site não possui formulários, cadastro, área de login ou banco de dados. Ele não coleta, de forma própria, dados pessoais ou informações de saúde dos visitantes.",
      "Não utilizamos cookies de publicidade nem ferramentas de análise ou rastreamento de terceiros nesta versão.",
    ],
  ],
  [
    "Contato pelo WhatsApp",
    [
      "Ao clicar nos botões de agendamento, você é levado ao WhatsApp, serviço de terceiros com política de privacidade própria. A mensagem inicial é padronizada e não contém informações clínicas.",
      "Recomendamos não enviar detalhes de saúde por mensagem; eles são conversados na avaliação, sob sigilo profissional.",
    ],
  ],
  [
    "Links externos e hospedagem",
    [
      "Links para Instagram e Google Maps levam a serviços de terceiros, regidos por suas próprias políticas.",
      "O site é hospedado na Cloudflare, que pode registrar dados técnicos de acesso (como endereço IP) para segurança e funcionamento da rede. As fontes tipográficas são servidas pelo próprio site.",
    ],
  ],
  [
    "Seus direitos",
    [
      `Você pode solicitar informações sobre o tratamento de dados pelos canais de contato de ${fullName}, nos termos da Lei Geral de Proteção de Dados (LGPD).`,
    ],
  ],
];

export default function Privacidade() {
  return (
    <>
      <PageHero
        eyebrow="Institucional"
        title="Política de *privacidade.*"
        lead="Transparência sobre os poucos dados envolvidos na navegação deste site."
        crumbs={[{ name: "Política de privacidade", path: "/privacidade/" }]}
      >
        <ReviewNotice approved={site.approved.privacy}>
          Versão de revisão: texto preliminar, sujeito à validação da profissional e à identificação
          do responsável pelo tratamento. Não constitui declaração de conformidade jurídica
          integral.
        </ReviewNotice>
      </PageHero>
      <section className="pb-28">
        <div className="wrap max-w-3xl space-y-12">
          {blocks.map(([t, ps]) => (
            <div key={t}>
              <h2 className="t-h3">{t}</h2>
              <div className="prose-calm mt-4">
                {ps.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
