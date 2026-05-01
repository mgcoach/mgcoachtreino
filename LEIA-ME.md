# 🏋️ TRAIN.FUEL — Sistema de Prescrição de Treinos

Sistema profissional para nutricionistas e profissionais fitness prescreverem treinos personalizados, com banco de **127 exercícios** com animação tipo GIF, instruções traduzidas em PT-BR e geração de PDF profissional.

---

## ⚡ Como começar

### Opção 1 — Uso direto (mais rápido)
Apenas abra o arquivo `index.html` no navegador. Funciona offline em desktop.

### Opção 2 — Instalar como app no iPhone (PWA)

Pra instalar no iPhone como aplicativo, você precisa hospedar os arquivos online. As 3 opções gratuitas mais simples:

#### 🟢 Opção A — Netlify Drop (mais fácil, sem login)
1. Acesse https://app.netlify.com/drop pelo Safari
2. Arraste a pasta inteira `trainfuel/` (ou faça upload do ZIP descompactado)
3. Pronto! Você recebe uma URL como `https://amazing-name-12345.netlify.app`
4. Abra essa URL no Safari do iPhone
5. Toque no botão **Compartilhar** → **Adicionar à Tela de Início**
6. Pronto — agora aparece como app TRAIN.FUEL

#### 🟢 Opção B — GitHub Pages (gratuito permanente)
1. Crie conta em https://github.com (grátis)
2. Crie um novo repositório público chamado `trainfuel`
3. Faça upload de todos os arquivos
4. Vá em **Settings → Pages → Branch: main → Save**
5. Em ~1 minuto a URL será `https://seu-usuario.github.io/trainfuel/`
6. Abra no Safari do iPhone e adicione à tela de início

#### 🟢 Opção C — Vercel (também gratuito)
1. Crie conta em https://vercel.com
2. Faça upload da pasta como projeto
3. URL automática gerada
4. Adicione à tela de início pelo Safari

---

## 📱 Funcionalidades

### Aba **Aluno**
- Nome, idade, telefone, peso, altura
- Objetivo (Hipertrofia, Emagrecimento, Definição, Força, Resistência, Performance, Saúde, Reabilitação)
- Nível (Iniciante / Intermediário / Avançado)
- Profissional responsável (CREF)
- Restrições / lesões / observações

### Aba **Treino**
- 7 dias da semana (Segunda a Domingo)
- "Foco do dia" personalizado por dia (ex: "Peito + Tríceps", "Pernas A")
- Busca de exercícios com 4 filtros:
  - Texto livre (busca em PT e EN)
  - Por músculo
  - Por equipamento
  - Por nível
- **Animação GIF** automática nos cards (alterna 2 frames simulando GIF)
- Modal de detalhes com instruções de execução em português
- Por exercício: **Aquecimento, Feeder Sets, Séries, Reps, Descanso, Observações**
- Reordenar exercícios (↑ ↓)
- Ver GIF do exercício a qualquer momento

### Aba **Exportar**
- 📄 **Baixar PDF** profissional (ficha de treino completa)
- 🖨️ **Imprimir** (mesmo layout do PDF)
- 💾 **Salvar JSON** (backup do treino completo)
- 📂 **Importar JSON** (recuperar treino salvo)
- 🗑️ **Limpar Tudo**

---

## 🎬 Sobre os GIFs dos Exercícios

Os exercícios usam imagens do projeto open source [free-exercise-db](https://github.com/yuhonas/free-exercise-db) (domínio público — Unlicense). Cada exercício tem 2 frames (início e fim do movimento) que alternam a cada 600ms simulando uma animação GIF.

**Atenção:** As imagens são carregadas online. Em uso offline, só os exercícios já visualizados antes (cacheados) terão a animação.

---

## 💪 Banco de Exercícios

127 exercícios cobrindo:
- **Peito**: 12 (supino, crucifixo, paralelas, etc — todas variações)
- **Costas/Dorsais**: 15+ (puxadas, remadas, terra, pullover)
- **Ombros**: 12 (desenvolvimentos, elevações, face pull)
- **Bíceps**: 10 (rosca direta, scott, martelo, concentrada, etc)
- **Tríceps**: 10 (pulley, francês, paralelas, testa, etc)
- **Pernas/Quadríceps**: 15+ (agachamentos, leg press, avanço, búlgaro)
- **Posteriores/Glúteos**: 8 (stiff, mesa flexora, hip thrust, etc)
- **Panturrilha**: 5 variações
- **Abdômen/Core**: 12+ (crunch, prancha, hanging, etc)
- **Antebraço**: 4
- **Cardio**: 3 (polichinelo, burpee, pular corda)

---

## 🎨 Design

- Identidade visual **preto + laranja** estilo "ficha técnica de atleta"
- Tipografia: **Bebas Neue** (display) + **Inter** (body) + **JetBrains Mono** (números)
- Mesma família visual da NUTRI.FUEL — alunos reconhecem como produtos da mesma marca
- 100% responsivo (mobile-first)
- Funciona em modo offline após primeira carga

---

## 📋 Compatibilidade

- ✅ iPhone / iPad (Safari) — PWA completo com splash screens
- ✅ Android (Chrome) — PWA completo
- ✅ Desktop (Chrome, Safari, Firefox, Edge)
- ⚠️ Internet Explorer não é suportado

---

## 🔒 Privacidade

Todos os dados ficam **apenas no seu dispositivo**. Nada é enviado para servidores externos (exceto as imagens dos exercícios, que vêm do GitHub Public Domain).

---

## 📞 Próximos passos sugeridos

1. Hospedar o sistema (Netlify Drop é o mais rápido)
2. Adicionar ao tela de início do iPhone
3. Preencher dados do primeiro aluno teste
4. Montar um treino de exemplo
5. Gerar o PDF e ver o resultado final

**Bons treinos!** 💪⚡
