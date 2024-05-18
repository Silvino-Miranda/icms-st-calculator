// calculate-icms-st.usecase.spec.ts
import { TestBed } from '@angular/core/testing';
import { CalculateIcmsStUsecase } from './calculate-icms-st.usecase';
import { IcmsRepositoryImpl } from '../../data/repositories/icms.repository.impl';
import { Product } from '../models/product.model';

describe('CalculateIcmsStUsecase', () => {
  let service: CalculateIcmsStUsecase;
  let mockIcmsRepository: jasmine.SpyObj<IcmsRepositoryImpl>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('IcmsRepositoryImpl', [
      'obterAliquotaIcmsOrigem',
      'obterMva',
      'obterAliquotaIcmsDestino'
    ]);

    TestBed.configureTestingModule({
      providers: [CalculateIcmsStUsecase, { provide: IcmsRepositoryImpl, useValue: spy }]
    });

    service = TestBed.inject(CalculateIcmsStUsecase);
    mockIcmsRepository = TestBed.inject(IcmsRepositoryImpl) as jasmine.SpyObj<IcmsRepositoryImpl>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate IPI correctly', () => {
    const result = service.calcularIPI(1000, 10);
    expect(result).toEqual(100); // The expected result might be different based on your business rules
  });

  it('should calculate ICMS Inter correctly', () => {
    const result = service.calcularBaseIcmsInter(1000, 25, 10, 30, 0);
    expect(result).toEqual(1065); // The expected result might be different based on your business rules
  });

  it('should calculate ICMS Inter correctly', () => {
    const result = service.calcularIcmsInter(1065, 12);
    expect(result).toEqual(127.8); // The expected result might be different based on your business rules
  });

  it('should calculate Base ICMS ST correctly', () => {
    const valorOperacao = 1000;
    const valorIPI = 100;
    const frete = 25;
    const seguro = 10;
    const despesasAcessorias = 30;
    const descontos = 0;
    const mva = 50;

    const expectedTotal = 1747.5;

    const result = service.calcularBaseIcmsSt(
      valorOperacao,
      valorIPI,
      frete,
      seguro,
      despesasAcessorias,
      descontos,
      mva
    );
    expect(result).toBeCloseTo(expectedTotal, 2); // The expected result might be different based on your business rules
  });

  it('should calculate the correct ICMS-ST value', () => {
    const baseICMSST = 1747.5;
    const aliquotaICMSInterno = 18;
    const valorICMSInterestadual = 127.8;

    const expectedICMSST = 186.75;

    const calculatedICMSST = service.calcularICMSST(
      baseICMSST,
      aliquotaICMSInterno,
      valorICMSInterestadual
    );

    expect(calculatedICMSST).toBeCloseTo(expectedICMSST, 2); // Verifica se os valores são iguais até 2 casas decimais
  });

  it('should calculate ICMS ST correctly', () => {
    mockIcmsRepository.obterAliquotaIcmsOrigem.and.returnValue(12);
    mockIcmsRepository.obterMva.and.returnValue(50);
    mockIcmsRepository.obterAliquotaIcmsDestino.and.returnValue(18);

    const product: Product = {
      id: 1,
      name: 'Test Product',
      valorOperacao: 1000,
      mva: 50,
      aliquotaOrigem: 12,
      aliquotaDestino: 18,
      frete: 25,
      seguro: 10,
      despesasAcessorias: 30,
      desconto: 0,
      aliquotaIpi: 10
    };

    const expectedICMSST = 186.75;

    const result = service.executar(product);

    expect(result).toBeCloseTo(expectedICMSST, 2);
  });
});
