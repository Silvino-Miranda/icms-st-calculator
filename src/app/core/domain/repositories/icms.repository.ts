export interface IcmsRepository {
  obterAliquotaIcmsOrigem(): number;
  obterMva(): number;
  obterAliquotaIcmsDestino(): number;
  haSubstituicaoTributaria(): boolean;
}
