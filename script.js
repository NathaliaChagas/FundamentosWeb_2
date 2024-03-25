document.addEventListener('DOMContentLoaded', function() {
    const servicoSelect = document.getElementById('servico');
    const porteAnimalRadios = document.getElementsByName('porte');
    const telebuscaRadios = document.getElementsByName('telebusca');
    const valorPagamentoDiv = document.getElementById('valorPagamento');
    const calendarioDiv = document.getElementById('calendario'); 

    // Função para calcular e exibir o valor
    function calcularValor() {
        let valorBase = 0;
        let acréscimoTelebusca = 0;

        // Verifica o porte do animal
        for (const radio of porteAnimalRadios) {
            if (radio.checked) {
                if (radio.value === 'pequeno') {
                    valorBase = 40;
                } else if (radio.value === 'grande') {
                    valorBase = 50;
                }
                break; // Sai do loop assim que encontra um radio selecionado
            }
        }

        // Verifica se o serviço de tele busca foi selecionado
        for (const radio of telebuscaRadios) {
            if (radio.checked && radio.value === 'sim') {
                acréscimoTelebusca = (valorBase === 40) ? 10 : 20;
                break; // Sai do loop assim que encontra um radio selecionado
            }
        }

        // Calcula o valor total
        const valorTotal = valorBase + acréscimoTelebusca;

        // Exibe o valor
        if (valorTotal > 0) {
            valorPagamentoDiv.innerHTML = `<p>O valor do serviço é R$${valorTotal.toFixed(2).replace('.', ',')}</p>`;
        } else {
            valorPagamentoDiv.innerHTML = '';
        }
    }

    // Event listeners para cada mudança que pode afetar o valor
    servicoSelect.addEventListener('change', function() {
        document.getElementById('porte').style.display = 'block';
        calendarioDiv.style.display = 'block'; // Adicionado para mostrar o calendário
    });

    for (const radio of porteAnimalRadios) {
        radio.addEventListener('change', function() {
            document.getElementById('telebusca').style.display = 'block';
            calcularValor(); // Recalcula a cada mudança
        });
    }

    for (const radio of telebuscaRadios) {
        radio.addEventListener('change', calcularValor); // Recalcula a cada mudança
    }
});