// Gera o código PIX "copia e cola" (BR Code estático, padrão EMV do Banco Central).
(function (raiz) {
  "use strict";

  function campo(id, valor) {
    var tam = String(valor.length).padStart(2, "0");
    return id + tam + valor;
  }

  // CRC16-CCITT (polinômio 0x1021, valor inicial 0xFFFF), exigido no campo 63.
  function crc16(texto) {
    var crc = 0xffff;
    for (var i = 0; i < texto.length; i++) {
      crc ^= texto.charCodeAt(i) << 8;
      for (var b = 0; b < 8; b++) crc = crc & 0x8000 ? ((crc << 1) ^ 0x1021) & 0xffff : (crc << 1) & 0xffff;
    }
    return crc.toString(16).toUpperCase().padStart(4, "0");
  }

  // Nome e cidade: sem acentos, maiúsculas, nos limites do padrão (25 e 15 caracteres).
  function limpar(texto, max) {
    return texto.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^A-Za-z0-9 ]/g, "").toUpperCase().trim().slice(0, max);
  }

  function brCode(op) {
    var conta = campo("00", "br.gov.bcb.pix") + campo("01", op.chave);
    var txid = (op.txid || "***").replace(/[^A-Za-z0-9*]/g, "").slice(0, 25) || "***";
    var corpo =
      campo("00", "01") +
      campo("26", conta) +
      campo("52", "0000") +
      campo("53", "986") +
      (op.valor ? campo("54", Number(op.valor).toFixed(2)) : "") +
      campo("58", "BR") +
      campo("59", limpar(op.nome, 25)) +
      campo("60", limpar(op.cidade, 15)) +
      campo("62", campo("05", txid)) +
      "6304";
    return corpo + crc16(corpo);
  }

  var api = { brCode: brCode, crc16: crc16 };
  if (typeof module === "object" && module.exports) module.exports = api;
  else raiz.PIX = api;
})(this);
