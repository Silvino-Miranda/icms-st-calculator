// src/app/core/domain/models/product.model.ts
export interface Product {
  id: number;
  name: string;
  valorOperacao: number;
  aliquotaOrigem: number;
  mva: number;
  aliquotaDestino: number;
  frete: number;
  seguro: number;
  despesasAcessorias: number;
  aliquotaIpi: number;
  desconto: number;
}
