# 🎮 Bесеница - Guia de Configuração de Arquivos de Mídia

## 📁 Estrutura de Pastas Necessária

```
C:\Users\GOLF\Desktop\Hangman\
├── Hangman.html
├── Hangman.css
├── Hangman.js
├── Pictures/                           👈 CRIAR ESTA PASTA
│   ├── Begin_Picture.png              (Imagem inicial - sem erros)
│   ├── Are_You_Serious_Picture.png    (Aparece após 3º erro)
│   ├── Let_Him_Cook_Picture.png       (Aparece após 2 acertos consecutivos)
│   ├── GigaChad_Picture.png           (Imagem de vitória)
│   └── Dead_Picture.png               (Imagem de derrota)
└── Music/                              👈 CRIAR ESTA PASTA
    ├── Fart with reverb sound effect.mp3    (Som de erro)
    ├── Giga Chad - Can You Feel My Heart.mp3 (Som de vitória)
    └── Old Church Bell Sound Effect (HD) _ How to.mp3 (Som de derrota)
```

---

## 🖼️ Imagens Necessárias

### 1. **Begin_Picture.png** (Imagem Inicial)
- Frequência de exibição: No início da partida
- Aparência sugerida: Imagem neutra/relaxada
- Tamanho recomendado: 400x400px ou 500x500px
- Formato: PNG

### 2. **Are_You_Serious_Picture.png** (Após 3º Erro)
- Frequência de exibição: Após 3 tentativas incorretas
- Aparência sugerida: Expressão de ceticismo/surpresa
- Substitui Begin_Picture
- Formato: PNG

### 3. **Let_Him_Cook_Picture.png** (Após 2 Acertos Consecutivos)
- Frequência de exibição: Após adivinhar 2 letras certas seguidas
- Aparência sugerida: Imagem motivadora/de aprovação
- Prioritária (aparece sobre outras imagens enquanto houver acertos)
- Formato: PNG

### 4. **GigaChad_Picture.png** (Vitória)
- Frequência de exibição: Quando descobrir a palavra inteira
- Aparência sugerida: Celebração/GigaChad meme
- Toca som: "Giga Chad - Can You Feel My Heart"
- Formato: PNG

### 5. **Dead_Picture.png** (Derrota)
- Frequência de exibição: Quando vidas chegarem a 0
- Aparência sugerida: Imagem triste/derrota
- Toca som: "Old Church Bell Sound Effect (HD) _ How to"
- Formato: PNG

---

## 🔊 Arquivos de Áudio Necessários

### 1. **Fart with reverb sound effect.mp3**
- Duração: Recomendado 1-2 segundos
- Frequência: Cada letra errada adivinhada
- Tipo: Som de erro/buzina cômica
- Formato: MP3
- Origem: Procure em sites como:
  - zapsplat.com
  - freesound.org
  - youtube.com (procure "fart with reverb")

### 2. **Giga Chad - Can You Feel My Heart.mp3**
- Duração: Recomendado 3-10 segundos (ou música completa)
- Frequência: Quando ganhar a partida
- Tipo: Música épica/motivadora
- Formato: MP3
- Origem: 
  - YouTube (baixe com yt-dlp ou similar)
  - Procure em: "Giga Chad Can You Feel My Heart"
  - Spotify/Apple Music (se tiver acesso direto)

### 3. **Old Church Bell Sound Effect (HD) _ How to.mp3**
- Duração: Recomendado 2-5 segundos
- Frequência: Quando perder a partida (vidas = 0)
- Tipo: Som de sino/derrota
- Formato: MP3
- Origem: 
  - zapsplat.com (procure "church bell")
  - freesound.org
  - YouTube (procure "old church bell sound effect")

---

## 📥 Como Obter os Arquivos

### Opção 1: Zapsplat (Recomendado - Gratuito)
1. Acesse: https://www.zapsplat.com
2. Procure: "fart reverb", "church bell", etc.
3. Download dos MP3 (gratuito)
4. Renomeie com os nomes exactos acima
5. Coloque na pasta `Music/`

### Opção 2: Freesound.org
1. Acesse: https://freesound.org
2. Procure pelos efeitos sonoros
3. Download (pode precisar criar conta)
4. Coloque na pasta `Music/`

### Opção 3: YouTube
1. Procure no YouTube: "fart sound effect reverb", "church bell sound"
2. Use um downloaded como: yt-dlp (Python)
3. Converta para MP3 se necessário
4. Renomeie e coloque na pasta `Music/`

### Opção 4: Criar Seus Próprios
1. Use Audacity (gratuito): https://www.audacityteam.org
2. Grave seus próprios sons
3. Exporte como MP3
4. Coloque na pasta `Music/`

## Nota sobre "Giga Chad - Can You Feel My Heart"
Este é um áudio específico. Procure no YouTube:
- Título exato: "Giga Chad - Can You Feel My Heart"
- Ou busque por: "Andrew Tate Giga Chad theme"
- Baixe e converta para MP3

---

## ✅ Checklist de Configuração

- [ ] Criar pasta `C:\Users\GOLF\Desktop\Hangman\Pictures\`
- [ ] Criar pasta `C:\Users\GOLF\Desktop\Hangman\Music\`
- [ ] Obter/criar `Begin_Picture.png` e colocar em `Pictures/`
- [ ] Obter/criar `Are_You_Serious_Picture.png` e colocar em `Pictures/`
- [ ] Obter/criar `Let_Him_Cook_Picture.png` e colocar em `Pictures/`
- [ ] Obter/criar `GigaChad_Picture.png` e colocar em `Pictures/`
- [ ] Obter/criar `Dead_Picture.png` e colocar em `Pictures/`
- [ ] Obter áudio `Fart with reverb sound effect.mp3` em `Music/`
- [ ] Obter áudio `Giga Chad - Can You Feel My Heart.mp3` em `Music/`
- [ ] Obter áudio `Old Church Bell Sound Effect (HD) _ How to.mp3` em `Music/`

---

## 🎯 Fluxo de Imagens Durante o Jogo

```
START
  ↓
[Begin_Picture.png]
  ↓ (1º erro)
[Begin_Picture.png] ← sem mudança
  ↓ (2º erro)
[Begin_Picture.png] ← sem mudança
  ↓ (3º erro)
[Are_You_Serious_Picture.png]
  ↓
  ├─→ (2 acertos seguidos) → [Let_Him_Cook_Picture.png]
  │     (mantém até próximo erro)
  │
  ├─→ (4º erro) → [Are_You_Serious_Picture.png]
  │
  ├─→ (5º erro) → [Are_You_Serious_Picture.png]
  │
  └─→ (6º erro / Vidas = 0) → [Dead_Picture.png] + som derrota
      OU
      (Palavra descoberta) → [GigaChad_Picture.png] + som vitória
```

---

## 🔊 Fluxo de Áudio

| Evento | Áudio |
|--------|-------|
| Letra errada adivinhada | `Fart with reverb sound effect.mp3` |
| Palavra completa descoberta | `Giga Chad - Can You Feel My Heart.mp3` |
| Vidas chegam a 0 | `Old Church Bell Sound Effect (HD) _ How to.mp3` |

---

## 🎨 Tema Dark com Elementos Vermelhos

O jogo agora possui:
- ✅ Fundo escuro (preto/cinza)
- ✅ Bordas em vermelho (#cc0000)
- ✅ Botões em gradiente vermelho
- ✅ Texto em vermelho brilhante (#ff3333)
- ✅ Efeitos de brilho vermelho
- ✅ Cards com bordas vermelhas
- ✅ Responsivo para mobile/tablet

---

## ⚠️ Dicas Importantes

1. **Nomes de arquivos são sensíveis a maiúsculas** em sistemas Linux/Mac
   - Use exatamente os nomes especificados
   - Exemplo: `Fart with reverb sound effect.mp3` (exato)

2. **Formato de áudio obrigatório: MP3**
   - Se tiver WAV ou OGG, converta em:
     - VLC (media player)
     - Audacity
     - FFmpeg

3. **Tamanho recomendado de imagens:**
   - 400x400px a 500x500px
   - PNG é ideal mas JPG também funciona

4. **Se áudio não tocar:**
   - Verifique a console do navegador (F12)
   - Certifique-se que o navegador permite áudio
   - Alguns navegadores precisam de interação do usuário primeiro

---

## 🚀 Próximos Passos

1. Criar as 2 pastas (Pictures e Music)
2. Obter os 5 arquivos de imagem
3. Obter os 3 arquivos de áudio
4. Renomear com exatidão
5. Colocar nos locais corretos
6. Abrir `Hangman.html` no navegador
7. Começar a jogar!

---

**Perguntas? O jogo está pronto, apenas precise dos arquivos de mídia!** 🎮
