async function gerarNumeroRRI() {
    const botao = document.querySelector('button');
    botao.disabled = true;
    botao.innerText = "Gerando número exclusivo...";

    try {
        let numeroUnico = false;
        let novoNumero = "";

        // Loop até encontrar um número realmente livre
        while (!numeroUnico) {
            novoNumero = Math.floor(100000 + Math.random() * 900000).toString();
            
            // Consulta no Firebase para garantir unicidade
            const snapshot = await db.collection("usuarios").where("rri", "==", novoNumero).get();
            if (snapshot.empty) {
                numeroUnico = true;
            }
        }

        // Exibe o número na tela
        document.getElementById("numeroExibicao").innerText = novoNumero;
        document.getElementById("containerGeracao").classList.add("hidden");
        document.getElementById("containerResultado").classList.remove("hidden");

    } catch (error) {
        console.error("Erro ao gerar número RRI:", error);
        alert("Erro ao verificar o número no servidor. Tente novamente.");
    } finally {
        botao.disabled = false;
        botao.innerText = "Gerar número RRI";
    }
              }
          
