// src/app/core/domain/usecases/calculate-icms-st.usecase.ts
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CalculateIcmsStUsecase {
  constructor() {}

  executar(product: Product): number {
    const {
      valorOperacao,
      mva,
      aliquotaOrigem,
      aliquotaDestino,
      frete,
      seguro,
      despesasAcessorias,
      desconto
    } = product;

    // Passo 0: Calcular valor do IPI
    const valorIPI = this.calcularIPI(product.valorOperacao, product.aliquotaIpi);

    // Passo 1: Calcular base do ICMS Interestadual
    const baseICMSInter = this.calcularBaseIcmsInter(
      valorOperacao,
      frete,
      seguro,
      despesasAcessorias,
      desconto
    );

    // Passo 2: Calcular valor do ICMS Interestadual
    const valorICMSInter = this.calcularIcmsInter(baseICMSInter, aliquotaOrigem);

    // Passo 3: Calcular base do ICMS-ST
    const baseICMSST = this.calcularBaseIcmsSt(
      valorOperacao,
      valorIPI,
      frete,
      seguro,
      despesasAcessorias,
      desconto,
      mva
    );

    // Passo 4: Calcular valor do ICMS-ST
    const valorICMSST = this.calcularICMSST(baseICMSST, aliquotaDestino, valorICMSInter);

    return valorICMSST;
  }

  calcularIPI(valorOperacao: number, aliquotaIPI: number): number {
    return valorOperacao * (aliquotaIPI / 100);
  }

  calcularBaseIcmsInter(
    valorOperacao: number,
    frete: number,
    seguro: number,
    despesasAcessorias: number,
    descontos: number
  ): number {
    return valorOperacao + frete + seguro + despesasAcessorias - descontos;
  }

  calcularIcmsInter(baseIcmsInter: number, aliquotaIcmsInter: number): number {
    return baseIcmsInter * (aliquotaIcmsInter / 100);
  }

  calcularBaseIcmsSt(
    valorOperacao: number,
    valorIPI: number,
    frete: number,
    seguro: number,
    despesasAcessorias: number,
    descontos: number,
    mva: number
  ): number {
    return (
      (valorOperacao + valorIPI + frete + seguro + despesasAcessorias - descontos) * (1 + mva / 100)
    );
  }

  // Método para calcular o valor do ICMS-ST
  calcularICMSST(
    baseICMSST: number,
    aliquotaICMSInterno: number,
    valorICMSInterestadual: number
  ): number {
    // Calcular o valor do ICMS-ST
    const valorICMSST = baseICMSST * (aliquotaICMSInterno / 100) - valorICMSInterestadual;
    return valorICMSST;
  }
}
