// src/app/presentation/pages/icms-calculator/icms-calculator.component.ts
import { Component, OnInit } from '@angular/core';
import { Product } from '../../../core/domain/models/product.model';
import { IcmsStService } from '../../services/icms-st.service';

@Component({
  selector: 'app-icms-calculator',
  templateUrl: './icms-calculator.component.html',
  styleUrls: ['./icms-calculator.component.css'],
})
export class IcmsCalculatorComponent implements OnInit {
  products: Product[] = [
    {
      id: 1,
      name: 'Produto A',
      valorOperacao: 1000,
      mva: 50,
      aliquotaOrigem: 12,
      aliquotaDestino: 18,
      aliquotaIpi: 10,
      frete: 25,
      seguro: 10,
      despesasAcessorias: 30,
      desconto: 0,
    },
    {
      id: 2,
      name: 'Produto do Felipe',
      valorOperacao: 61,
      aliquotaOrigem: 7,
      mva: 53.86,
      aliquotaDestino: 7,
      frete: 0,
      seguro: 0,
      despesasAcessorias: 0,
      aliquotaIpi: 0,
      desconto: 0,
    },
    {
      id: 3,
      name: 'Produto C',
      valorOperacao: 3000,
      aliquotaOrigem: 12,
      mva: 40,
      aliquotaDestino: 18,
      frete: 75,
      seguro: 30,
      despesasAcessorias: 90,
      aliquotaIpi: 30,
      desconto: 0,
    },
    {
      id: 4,
      name: 'Produto D',
      valorOperacao: 4000,
      aliquotaOrigem: 12,
      mva: 40,
      aliquotaDestino: 18,
      frete: 100,
      seguro: 40,
      despesasAcessorias: 120,
      aliquotaIpi: 40,
      desconto: 0,
    },
    {
      id: 5,
      name: 'Produto E',
      valorOperacao: 5000,
      aliquotaOrigem: 12,
      mva: 40,
      aliquotaDestino: 18,
      frete: 125,
      seguro: 50,
      despesasAcessorias: 150,
      aliquotaIpi: 50,
      desconto: 0,
    },
  ];

  selectedProduct: Product = this.products[0];
  valorIcmsSt!: number;

  constructor(private icmsStService: IcmsStService) {}

  ngOnInit() {
    this.calcularIcmsSt();
  }

  onProductChange() {
    this.calcularIcmsSt();
  }

  calcularIcmsSt() {
    this.valorIcmsSt = this.icmsStService.calcularValorIcmsStARecolher(
      this.selectedProduct
    );
  }
}
