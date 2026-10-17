<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <meta name="author" content="Gustavo Silvano">
  <!-- DESENVOLVIDO POR GUSTAVO SILVANO -->
  <link rel="stylesheet" href="index.css">

  <title>Cardápio Bar - AFPESP Peruíbe II</title>
</head>
<body>

  <header class="top-bar">
    <div class="logo-container">
      <img src="https://i.ibb.co/R4jn242d/afpesp-2.png" alt="AFPESP" referrerPolicy="no-referrer" />
    </div>
    <span>AFPESP Peruíbe II</span>
  </header>

  <section class="title-bar">
    <h1>Cardápio Bar - AFPESP Peruíbe II</h1>
  </section>

  <div id="root">
    <!-- Adicionado onclick para virar as páginas clicando no livro -->
   <div id="book-container">
      <div id="book" class="book-wrapper"></div>
    </div>

    <div class="controls">
      <button class="btn-nav" onclick="prevPage()" aria-label="Voltar Página">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
      </button>
      <span id="page-indicator" class="page-indicator">1 / 1</span>
      <button class="btn-nav" onclick="nextPage()" aria-label="Próxima Página">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </button>
    </div>
  </div>

  
  <script src="script.js" defer></script>
</body>
</html>
