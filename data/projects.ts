export type Project = {
  id: string; url: string; img: string; mimg: string; name: string; cat: string; eyebrow: string; title: string;
  association: string; overview: string[]; contributionsTitle: string; contributions: string[]; stackTitle: string; stack: string[];
  /** image intrinsic sizes (desktop / mobile) to avoid layout shift */
  dw: number; dh: number; mw: number; mh: number;
  tags: ("ecommerce" | "front" | "pessoais")[];
  /** Optional measured result. Leave empty unless there is a real number. */
  resultado: string;
};

export const projects: Project[] = [
  {
    "id": "fiturban",
    "url": "https://www.fiturban.com.br/",
    "img": "fiturban-screenshot.webp",
    "mimg": "fiturban-screenshot-mobile.webp",
    "name": "Fit Urban",
    "cat": "Fashion E-commerce",
    "eyebrow": "Case em destaque",
    "title": "Fit Urban - E-commerce de moda fitness feminina",
    "association": "Associado ao Grupo Oásis (Agência Oásis)",
    "overview": [
      "Desenvolvimento frontend do storefront da Fit Urban, marca de moda fitness feminina especializada em peças de alta performance para treino.",
      "Atuei na implementação da experiência de compra na Wake Platform, com foco em responsividade, refinamento visual e navegação clara para um catálogo amplo com coleções como Zenith, Seamless, Fit Run, Vitality e Fit Basic."
    ],
    "contributionsTitle": "Minha atuação",
    "contributions": [
      "Construção de listagens de produto, páginas de coleção e navegação por categorias com HTML5, CSS3, JavaScript e templates Scriban.",
      "Implementação de UI para variantes de cor e layouts responsivos mobile-first.",
      "Ajustes de compatibilidade cross-browser, performance e SEO para e-commerce.",
      "Refinamento visual alinhado à identidade da marca e ao público de moda fitness."
    ],
    "stackTitle": "Stack",
    "stack": [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Wake Platform",
      "Scriban",
      "Responsive Web Design",
      "Web Performance",
      "Cross-browser Compatibility",
      "E-commerce SEO",
      "Git"
    ],
    "dw": 1437,
    "dh": 1074,
    "mw": 383,
    "mh": 970,
    "tags": [
      "ecommerce"
    ],
    "resultado": ""
  },
  {
    "id": "hotrio",
    "url": "https://www.hotrio.com.br/",
    "img": "hotrio-screenshot-card.webp",
    "mimg": "hotrio-screenshot-mobile.webp",
    "name": "HotRio",
    "cat": "Adult Products E-commerce",
    "eyebrow": "Case em destaque",
    "title": "HotRio - E-commerce de produtos adultos",
    "association": "Associado ao Grupo Oásis (Agência Oásis)",
    "overview": [
      "Desenvolvimento frontend da plataforma de e-commerce HotRio, marca do segmento de produtos adultos.",
      "Atuei na implementação de interfaces responsivas com foco em aderência à identidade visual, acessibilidade e compatibilidade cross-browser, em colaboração com um time multidisciplinar de tecnologia, design e produto."
    ],
    "contributionsTitle": "Minha atuação",
    "contributions": [
      "Construção da estrutura responsiva de layout com HTML5, CSS3 e JavaScript.",
      "Ajustes de compatibilidade nos principais navegadores.",
      "Implementação visual alinhada às diretrizes de marca e design.",
      "Suporte técnico durante QA e ajustes finais de entrega."
    ],
    "stackTitle": "Stack",
    "stack": [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Wake Platform",
      "Responsive Web Design",
      "Cross-browser Compatibility",
      "Web Performance",
      "Git"
    ],
    "dw": 1256,
    "dh": 754,
    "mw": 699,
    "mh": 754,
    "tags": [
      "ecommerce"
    ],
    "resultado": ""
  },
  {
    "id": "mckhome",
    "url": "https://www.mckhome.com.br/",
    "img": "mckhome-screenshot-card.webp",
    "mimg": "mckhome-screenshot-mobile.webp",
    "name": "Mck Home",
    "cat": "Home & Gifts E-commerce",
    "eyebrow": "Case em destaque",
    "title": "Mck Home - E-commerce de casa e presentes",
    "association": "Associado ao Grupo Oásis (Agência Oásis)",
    "overview": [
      "Desenvolvimento frontend da plataforma de e-commerce Mck Home, marca especializada em presentes, utilidades domésticas e produtos para casa.",
      "Atuei na construção de interfaces responsivas e acessíveis, alinhadas à identidade visual da marca, com foco em uma navegação fluida e intuitiva para o usuário final."
    ],
    "contributionsTitle": "Minha atuação",
    "contributions": [
      "Desenvolvimento de layouts responsivos com HTML5, CSS3 e JavaScript.",
      "Implementação de boas práticas de acessibilidade e performance web.",
      "Colaboração com times de design e produto em ambiente ágil.",
      "Versionamento e organização de código com Git."
    ],
    "stackTitle": "Stack",
    "stack": [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Responsive Web Design",
      "Web Performance",
      "Accessibility",
      "Git",
      "Agile"
    ],
    "dw": 1437,
    "dh": 1078,
    "mw": 314,
    "mh": 1063,
    "tags": [
      "ecommerce"
    ],
    "resultado": ""
  },
  {
    "id": "serralheria",
    "url": "https://www.serralheria.com.br/",
    "img": "serralheria-screenshot-card.webp",
    "mimg": "serralheria-screenshot-mobile.webp",
    "name": "Loja Serralheria",
    "cat": "Hardware & Tools E-commerce",
    "eyebrow": "Case em destaque",
    "title": "Loja Serralheria - E-commerce de ferragens e ferramentas",
    "association": "Associado ao Grupo Oásis (Agência Oásis)",
    "overview": [
      "Desenvolvimento frontend da plataforma de e-commerce Loja Serralheria, voltada a profissionais de ferragens, construção e varejo de ferramentas.",
      "Atuei na entrega de interfaces responsivas e alinhadas à marca, com foco em usabilidade, performance e clareza de navegação para um público técnico e recorrente."
    ],
    "contributionsTitle": "Minha atuação",
    "contributions": [
      "Construção de componentes e layouts responsivos com HTML5, CSS3 e JavaScript.",
      "Aplicação de técnicas de otimização de performance e acessibilidade.",
      "Colaboração com times de design, produto e engenharia durante o ciclo de desenvolvimento.",
      "Manutenção do código versionado e organizado com Git."
    ],
    "stackTitle": "Stack",
    "stack": [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Responsive Web Design",
      "Web Performance",
      "Accessibility",
      "Git",
      "Agile"
    ],
    "dw": 1435,
    "dh": 1076,
    "mw": 387,
    "mh": 1198,
    "tags": [
      "ecommerce"
    ],
    "resultado": ""
  },
  {
    "id": "lojaultra",
    "url": "https://www.lojadaultra.com.br/",
    "img": "lojaultra-screenshot-card.webp",
    "mimg": "lojaultra-screenshot-mobile.webp",
    "name": "Loja Ultra",
    "cat": "Truck Parts E-commerce",
    "eyebrow": "Case em destaque",
    "title": "Loja Ultra - E-commerce de peças e acessórios para caminhões",
    "association": "Associado ao Grupo Oásis (Agência Oásis)",
    "overview": [
      "Desenvolvimento frontend da plataforma de e-commerce Loja Ultra, especializada em peças e acessórios para caminhões e veículos pesados.",
      "Atuei na criação de uma interface clara e funcional para um público técnico, priorizando navegação rápida, consistência visual e comportamento responsivo entre dispositivos."
    ],
    "contributionsTitle": "Minha atuação",
    "contributions": [
      "Construção de componentes frontend responsivos com HTML5, CSS3 e JavaScript.",
      "Melhoria da experiência de navegação para um catálogo técnico de produtos.",
      "Manutenção da consistência visual e alinhamento com a identidade da marca em toda a UI.",
      "Colaboração com times de design e produto em ambiente ágil."
    ],
    "stackTitle": "Stack",
    "stack": [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Responsive Web Design",
      "Web Performance",
      "Git",
      "Agile"
    ],
    "dw": 1434,
    "dh": 1075,
    "mw": 387,
    "mh": 1174,
    "tags": [
      "ecommerce"
    ],
    "resultado": ""
  },
  {
    "id": "tubaraocenter",
    "url": "https://tubaraocenter.com.br/",
    "img": "tubaraocenter-screenshot-card.webp",
    "mimg": "tubaraocenter-screenshot-mobile.webp",
    "name": "Tubarão Center",
    "cat": "Fishing & Airsoft E-commerce",
    "eyebrow": "Case em destaque",
    "title": "Tubarão Center - E-commerce de pesca e airsoft",
    "association": "Associado ao Grupo Oásis (Agência Oásis)",
    "overview": [
      "Desenvolvimento frontend da plataforma de e-commerce Tubarão Center, especializada em artigos de pesca, camping, airsoft e equipamentos técnicos para atividades outdoor.",
      "Atuei na construção de interfaces responsivas e consistentes com a marca, entregando uma experiência de compra fluida e eficiente para um público de nicho."
    ],
    "contributionsTitle": "Minha atuação",
    "contributions": [
      "Desenvolvimento de layouts responsivos com HTML5, CSS3 e JavaScript.",
      "Otimização de performance e acessibilidade para um catálogo com alta variedade de produtos.",
      "Colaboração com times de design, produto e tecnologia em fluxo ágil.",
      "Versionamento e organização da base de código com Git."
    ],
    "stackTitle": "Stack",
    "stack": [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Responsive Web Design",
      "Web Performance",
      "Accessibility",
      "Git",
      "Agile"
    ],
    "dw": 1426,
    "dh": 1069,
    "mw": 386,
    "mh": 1194,
    "tags": [
      "ecommerce"
    ],
    "resultado": ""
  },
  {
    "id": "useloft",
    "url": "https://viaveneto.com.br/pages/loft",
    "img": "useloft-screenshot-card.webp",
    "mimg": "useloft-screenshot-mobile.webp",
    "name": "Useloft",
    "cat": "Luxury Fashion E-commerce",
    "eyebrow": "Case em destaque",
    "title": "Useloft - E-commerce de moda premium",
    "association": "Associado ao Grupo Oásis (Agência Oásis)",
    "overview": [
      "Desenvolvimento frontend da plataforma de e-commerce Useloft, uma marca voltada à moda refinada e sofisticada.",
      "Implementei soluções frontend com foco em refinamento visual, responsividade mobile-first e acessibilidade, garantindo uma experiência de navegação fluida e premium alinhada à identidade da marca."
    ],
    "contributionsTitle": "Minha atuação",
    "contributions": [
      "Desenvolvimento de interfaces responsivas e otimizadas para mobile com HTML5, CSS3 e JavaScript.",
      "Aplicação de boas práticas de acessibilidade e experiência do usuário.",
      "Implementação de UI alinhada a diretrizes visuais de uma marca de posicionamento premium.",
      "Colaboração com um time multidisciplinar de design, tecnologia e produto."
    ],
    "stackTitle": "Stack",
    "stack": [
      "Frontend Development",
      "HTML5",
      "CSS3",
      "JavaScript",
      "Responsive Web Design",
      "Web Performance",
      "Accessibility",
      "Git"
    ],
    "dw": 1440,
    "dh": 1080,
    "mw": 387,
    "mh": 1197,
    "tags": [
      "ecommerce",
      "front"
    ],
    "resultado": ""
  },
  {
    "id": "viaveneto",
    "url": "https://viaveneto.com.br/",
    "img": "viaveneto-screenshot-card.webp",
    "mimg": "viaveneto-screenshot-mobile.webp",
    "name": "ViaVeneto",
    "cat": "Men's Fashion E-commerce",
    "eyebrow": "Case em destaque",
    "title": "ViaVeneto - E-commerce de moda masculina",
    "association": "Associado ao Grupo Oásis (Agência Oásis)",
    "overview": [
      "Desenvolvimento frontend da plataforma de e-commerce ViaVeneto, marca tradicional de moda masculina e alfaiataria.",
      "Colaborei em um time multidisciplinar para entregar uma storefront performática, acessível e responsiva, alinhada à identidade clássica da marca e aos padrões de experiência do usuário."
    ],
    "contributionsTitle": "Minha atuação",
    "contributions": [
      "Implementação frontend responsiva com HTML5, CSS3 e JavaScript.",
      "Aderência às diretrizes visuais da marca e aos padrões de acessibilidade.",
      "Aplicação de boas práticas de SEO para melhorar a descoberta orgânica.",
      "Versionamento e manutenção da base de código com Git."
    ],
    "stackTitle": "Stack",
    "stack": [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Wake Platform",
      "Responsive Web Design",
      "Accessibility",
      "E-commerce SEO",
      "Git"
    ],
    "dw": 1434,
    "dh": 1075,
    "mw": 389,
    "mh": 1195,
    "tags": [
      "ecommerce"
    ],
    "resultado": ""
  },
  {
    "id": "yamuna",
    "url": "https://www.yamuna.com.br/",
    "img": "yamuna-screenshot-card.webp",
    "mimg": "yamuna-screenshot-mobile.webp",
    "name": "Yamuna",
    "cat": "Natural & Health E-commerce · Nuvemshop",
    "eyebrow": "Case em destaque",
    "title": "Yamuna - Migração e tema na Nuvemshop",
    "association": "Associado ao Grupo Oásis (Agência Oásis)",
    "overview": [
      "Desenvolvimento do tema da Yamuna, marca de alimentos naturais, chás e especiarias, na migração da loja para a Nuvemshop.",
      "Além das páginas da loja, conduzi um plano de performance da home, partindo de um diagnóstico com 229 imagens (199 sem lazy loading), 9 carrosséis e HTML de cerca de 1,3 MB."
    ],
    "contributionsTitle": "Minha atuação",
    "contributions": [
      "Tema completo na Nuvemshop: home, PLP com filtros, PDP, carrinho e drawer, blog e checkout.",
      "Otimização da home: prioridade só para a primeira imagem do hero, carregamento antecipado dos carrosséis e imagens otimizadas.",
      "Melhorias no checkout e na experiência do carrinho no mobile.",
      "Publicação automatizada do tema por FTP com scripts de watch e push."
    ],
    "stackTitle": "Stack",
    "stack": [
      "Nuvemshop",
      "Twig",
      "JavaScript",
      "CSS",
      "Web Performance",
      "PowerShell"
    ],
    "dw": 1438,
    "dh": 1078,
    "mw": 390,
    "mh": 1191,
    "tags": [
      "ecommerce",
      "front"
    ],
    "resultado": ""
  },
  {
    "url": "https://www.kingimports.com.br/",
    "eyebrow": "Case em destaque",
    "association": "Associado ao Grupo Oásis (Agência Oásis)",
    "contributionsTitle": "Minha atuação",
    "stackTitle": "Stack",
    "resultado": "",
    "tags": [
      "ecommerce",
      "front"
    ],
    "id": "kingimports",
    "img": "kingimports-screenshot-card.webp",
    "mimg": "kingimports-screenshot-mobile.webp",
    "name": "King Imports",
    "cat": "Import Store E-commerce",
    "title": "King Imports - Storefront Wake SSR",
    "overview": [
      "Desenvolvimento e manutenção contínua do storefront da King Imports na Wake Platform, no modelo Storefront SSR com templates Scriban e Tailwind CSS.",
      "Sou o principal autor do repositório, com mais de 600 commits desde dezembro de 2023, cobrindo páginas, componentes, carrinho e e-mails da loja."
    ],
    "contributions": [
      "Construção e evolução de páginas, componentes e snippets em Scriban com dados via queries GraphQL.",
      "Estilização com Tailwind CSS e fluxo de desenvolvimento local com watch do storefront.",
      "Correções de layout e comportamento em carrinho, vitrines e páginas de produto.",
      "Templates de e-mail transacional da loja."
    ],
    "stack": [
      "Wake Storefront SSR",
      "Scriban",
      "GraphQL",
      "Tailwind CSS",
      "JavaScript",
      "Git"
    ],
    "dw": 1440,
    "dh": 1080,
    "mw": 390,
    "mh": 1190
  },
  {
    "id": "venari",
    "url": "https://www.venari.com.br/",
    "img": "venari-screenshot-card.webp",
    "mimg": "venari-screenshot-mobile.webp",
    "name": "Venari",
    "cat": "Women's Fashion E-commerce",
    "eyebrow": "Case em destaque",
    "title": "Venari - E-commerce de moda feminina e beachwear",
    "association": "Associado ao Grupo Oásis (Agência Oásis)",
    "overview": [
      "Desenvolvimento frontend da plataforma de e-commerce Venari, marca focada em moda feminina, beachwear e coleções sazonais com forte apelo visual.",
      "Atuei na implementação de interfaces responsivas com foco em experiência mobile-first, destaque para campanhas, navegação fluida e consistência visual alinhada à identidade da marca."
    ],
    "contributionsTitle": "Minha atuação",
    "contributions": [
      "Implementação de vitrines, banners e páginas de coleção com HTML5, CSS3 e JavaScript.",
      "Refinamento de layout responsivo para melhor leitura de conteúdo e destaque de produtos em mobile.",
      "Ajustes de performance, acessibilidade e usabilidade para uma jornada de compra mais fluida.",
      "Colaboração com design e produto para manter consistência visual entre campanhas e seções da loja."
    ],
    "stackTitle": "Stack",
    "stack": [
      "Frontend Development",
      "HTML5",
      "CSS3",
      "JavaScript",
      "Responsive Web Design",
      "Web Performance",
      "Accessibility",
      "Git"
    ],
    "dw": 1364,
    "dh": 1022,
    "mw": 425,
    "mh": 907,
    "tags": [
      "ecommerce",
      "front"
    ],
    "resultado": ""
  },
  {
    "id": "webcine",
    "url": "https://webcinetv.com.br/",
    "img": "webcine-screenshot-card.webp",
    "mimg": "webcine-screenshot-mobile.webp",
    "name": "WebCine TV",
    "cat": "Real-time Streaming Platform",
    "eyebrow": "Projeto autoral",
    "title": "WebCine TV - Sala de cinema online em tempo real",
    "association": "Projeto criado por Helison Dias",
    "overview": [
      "Desenvolvimento de uma plataforma web para assistir vídeos online em salas compartilhadas, com foco em sincronização da experiência, conversa em tempo real e acesso simples sem instalação.",
      "A interface foi construída para funcionar bem em desktop e mobile, com experiência imersiva, visual cinematográfico, criação rápida de salas e apresentação clara dos recursos principais da plataforma."
    ],
    "contributionsTitle": "Minha atuação",
    "contributions": [
      "Construção da interface responsiva para criação de salas, navegação e apresentação dos recursos.",
      "Implementação de experiência mobile-first para acesso rápido em diferentes dispositivos.",
      "Organização visual de cards, etapas de uso e estados de interação com foco em clareza.",
      "Publicação da aplicação web com identidade visual própria e fluxo direto de entrada."
    ],
    "stackTitle": "Stack",
    "stack": [
      "Frontend Development",
      "Responsive Web Design",
      "Real-time UX",
      "Web Performance",
      "Accessibility",
      "Git"
    ],
    "dw": 1428,
    "dh": 1071,
    "mw": 383,
    "mh": 1192,
    "tags": [
      "pessoais",
      "front"
    ],
    "resultado": ""
  },
  {
    "id": "emporio",
    "url": "https://github.com/helisondias07/emporio-da-musica-agente",
    "img": "emporio-screenshot-card.webp",
    "mimg": "emporio-screenshot-mobile.webp",
    "name": "Empório da Música",
    "cat": "Agente de atendimento · IA",
    "eyebrow": "Projeto autoral",
    "title": "Empório da Música — agente de atendimento",
    "association": "Case de AI Engineer da Artefact · Helison Dias",
    "overview": [
      "Este é o primeiro projeto prático com um agente de IA de ponta a ponta. É o atendimento da Empório da Música, loja fictícia de instrumentos em Campo Grande, Mato Grosso do Sul. O cliente escreve em português e o balcão responde em português, no tom do manual da loja: informal, profissional, tratamento por “você”, sem emoji.",
      "A tela é a conversa. python main.py --web sobe o chat em http://127.0.0.1:4721: uma folha de catálogo no centro, saudação fixa da interface e atalhos para as perguntas do caso. O mesmo agente atende no terminal com python main.py. Sem chave de API a página abre e avisa que o modelo não está configurado, em vez de inventar preço ou prazo. Com OPENAI_API_KEY ou GEMINI_API_KEY, a mesma tela responde de verdade. O histórico fica na sessão. “Nova conversa” zera o chat; no CLI, /limpar faz o mesmo.",
      "Dado estruturado e regra da loja seguem caminhos diferentes. Preço, estoque, promoção e pedido passam por function calling sobre os CSVs: search_products, get_product, list_categories, list_active_promotions e lookup_order. O loader usa o módulo csv e Decimal, para 799.9 não virar float. O preço de venda já inclui o desconto ativo, e um filtro como “até R$ 1.000” usa esse preço. O PIX de 5% só aparece quando não há promoção ativa. Telefone e e-mail do cliente são mascarados antes de chegar ao modelo.",
      "Política da loja passa por search_policies. O manual tem oito páginas e títulos estáveis. Ele vira um índice de seções, ranqueado com BM25 e um reforço para consultas curtas como endereço e horário. É recuperação no estilo RAG: o modelo recebe o trecho da seção. Embedding e banco vetorial ficam para um manual maior, e a ferramenta que o modelo chama pode continuar a mesma. Prazo de troca e garantia não fica na conta do modelo. evaluate_aftersales devolve se a janela ainda está aberta e a data limite. O relógio da loja é 25/03/2026 (EMPORIO_TODAY), alguns dias depois do último pedido do arquivo. A data de um computador em novembro faria todo prazo parecer vencido.",
      "Acessório fica fora do catálogo. Corda, palheta, cabo, case, pedal e amplificador são recusados, mesmo quando a mensagem também pede um instrumento. O pacote não traz loja parceira, então o agente não inventa nome e diz que o balcão pode indicar. Descrição que contradiz o nome do SKU, e spec copiada entre produtos, fica escondida. O CSV original não é reescrito. Promoção inativa continua no detalhe, para o agente dizer que a oferta acabou, e não muda o preço. O Takamine GD20 (id 95) é o caso claro: tabela R$ 2.199,00, PIX R$ 2.089,05, cinco em estoque, oferta de 12% com is_active = 0.",
      "O loop tem no máximo seis rodadas de ferramenta por turno, sem framework de agente. São 30 testes com pytest, offline: carregam os CSVs e o PDF de verdade e não chamam API de modelo. A suíte confere os 12 violões em estoque até R$ 1.000, o preço do GD20, as quatro promoções ativas, o mascaramento, as janelas do pedido 7, as frases do manual e a trava de acessório. O código, os cinco exemplos e o passo a passo estão no repositório público."
    ],
    "contributionsTitle": "Minha atuação",
    "contributions": [
      "Chat em FastAPI e CLI no mesmo loop de ferramentas. Quando o agente consulta um dado, o chat mostra uma linha curta (“Olhei o catálogo”, “Olhei o pedido e o manual da loja”). No terminal, --verbose imprime o nome da ferramenta e os argumentos.",
      "Ferramentas de catálogo e de pedido sobre os CSVs, com preço em Decimal. Filtro pelo preço de venda, PIX só sem promoção ativa, e telefone e e-mail mascarados. Nome ambíguo devolve as pessoas e as cidades, sem os pedidos.",
      "Busca de políticas por seção e BM25, com tópico quando o modelo já sabe o bloco (horário, pagamento, troca, frete, garantia, WhatsApp, privacidade). O índice foi transcrito do PDF porque as tabelas extraem com as colunas quebradas. Um teste falha se uma frase-chave sumir do PDF ou do índice.",
      "Cálculo de pós-venda fora do modelo: arrependimento, troca e garantia legal, com a data limite. Pedido da base é venda à distância, porque há rastreio e previsão e não há marca de balcão. Se o cliente não diz quando recebeu, o agente pergunta.",
      "Trava de acessório e de texto inseguro. Busca só com palavra de acessório volta fora de escopo. Descrição de outra marca, ou spec compartilhada entre SKUs, não entra na resposta. A leitura dos conflitos do manual (telefone, WhatsApp, parcelamento) fica no repositório, e o agente não discute isso com o cliente a menos que perguntem.",
      "Suíte de 30 testes e cinco conversas de exemplo escritas a partir da saída das ferramentas. Os exemplos não são completion capturada de um modelo ao vivo. python -m pytest confere preço, endereço, rastreio e prazo que essas frases ainda citam."
    ],
    "stackTitle": "Stack",
    "stack": [
      "Python",
      "Function calling",
      "FastAPI",
      "BM25",
      "CSV",
      "pytest",
      "OpenAI-compatible API",
      "Gemini"
    ],
    "dw": 1440,
    "dh": 1080,
    "mw": 390,
    "mh": 844,
    "tags": [
      "pessoais"
    ],
    "resultado": "30 testes offline com pytest. Nenhum chama API de modelo."
  }
];
